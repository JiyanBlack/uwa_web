'use strict';

const api_key = require('./key.js');
const AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
const alchemy_language = new AlchemyLanguageV1({
  api_key: api_key
});

function analysis(queue, callback) {
  // queue:{target:"something",isText:true,extract:[]}
  const canBeCombined = [
    'authors',
    'concepts',
    'dates',
    'doc-emotion',
    'entities',
    'feeds',
    'keywords',
    'pub-date',
    'relations',
    'typed-rels',
    'doc-sentiment',
    'taxonomy',
    'title'
  ];
  const cannotCombined = ['Text-Extraction', 'Language', 'Microformats'];
  parse();

  function isInArray(target, array) {
    for (let i in array) {
      if (target == array[i]) {
        return true;
      }
    }
    return false;
  }

  function parse() {
    let single_result = { originSource: queue.target };
    microformatsAnalysis(single_result);
  }

  function microformatsAnalysis(single_result) {
    if (!isInArray('Microformats', queue.extract) || queue.isText) {
      languageAnalysis(single_result);
    } else {
      let parameters = {};
      parameters.url = queue.target;
      alchemy_language.microformats(parameters, (err, response) => {
        if (err != null) {
          callback(err);
        } else {
          single_result.microformats = response;
          languageAnalysis(single_result);
        }
      });
    }
  }

  function languageAnalysis(single_result) {
    if (!isInArray('Language', queue.extract)) {
      textExtractionAnalysis(single_result);
    } else {
      let parameters = {};
      if (queue.isText) {
        parameters.text = queue.target;
      } else {
        parameters.url = queue.target;
      }
      alchemy_language.language(parameters, (err, response) => {
        if (err != null) {
          callback(err);
        } else {
          single_result.languageAnalysis = response;
          textExtractionAnalysis(single_result);
        }
      });
    }
  }

  function textExtractionAnalysis(single_result) {
    if (!isInArray('Text-Extraction', queue.extract) || queue.isText) {
      combinedAnalysis(single_result);
    } else {
      let parameters = {};
      parameters.url = queue.target;
      alchemy_language.text(parameters, (err, response) => {
        if (err != null) {
          callback(err);
        } else {
          single_result.textExtraction = response;
          combinedAnalysis(single_result);
        }
      });
    }
  }

  function combinedAnalysis(single_result) {
    const thisCombinedPara = queue.extract
      .filter(keyword => isInArray(keyword, canBeCombined));
    if (thisCombinedPara[0] == undefined) {
      callback(null, single_result);
    }
    const parameters = {
      extract: thisCombinedPara.join(',')
    };
    if (queue.isText) {
      parameters.text = queue.target;
    } else {
      parameters.url = queue.target;
    }
    alchemy_language.combined(parameters, (err, response) => {
      if (err != null) {
        callback(err, null);
      } else {
        single_result.combined = response;
        callback(undefined, single_result);
      }
    });
  }
}

module.exports = analysis;


// analysis({
//   target: 'HI4PI data will be freely available to scientists around the world through the Strasbourg astronomical data centre',
//   isText: true,
//   extract: ['doc-sentiment', 'keywords']
// }, (err, res) => {
//   console.log(res);
// });
