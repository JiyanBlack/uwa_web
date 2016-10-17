const api_key = require("./key.js");
const AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
const alchemy_language = new AlchemyLanguageV1({api_key: api_key});

class Analysis {
  constructor(queue, callback) {
    this.queue = queue;
    // queue:[{target:"something",isText:true,extract:[]}]
    this.callback = callback;
    this.total = queue.length; //total number of results, queue is an object of text or url
    this.current = 0; //already get result number
    this.result = []; //call this result back
    this.canBeCombined = [
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
    this.cannotCombined = ["Text-Extraction", "Language", "Microformats"]
    this.parse();
  }

  isInArray(target, array) {
    for (let i in array) {
      if (target == array[i]) 
        return true;
      }
    return false;
  }

  parse() {
    for (let i = 0; i < this.queue.length; i++) {
      let single_result = {};
      this.microformatsAnalysis(this.queue[i], single_result);
    }
  }

  microformatsAnalysis(one_queue, single_result) {
    if (!this.isInArray("Microformats", one_queue.extract) || one_queue.isText) {
      this.languageAnalysis(one_queue, single_result);
    } else {
      let parameters = {};
      parameters.url = one_queue.target;
      alchemy_language.microformats(parameters, (err, response) => {
        if (err) 
          this.callback(err);
        else {
          single_result.microformats = response;
          this.languageAnalysis(one_queue, single_result);
        }
      });
    }
  }

  languageAnalysis(one_queue, single_result) {
    if (!this.isInArray("Language", one_queue.extract)) {
      this.textExtractionAnalysis(one_queue, single_result);
    } else {
      let parameters = {};
      if (one_queue.isText) {
        parameters.text = one_queue.target;
      } else {
        parameters.url = one_queue.target;
      }
      alchemy_language.language(parameters, (err, response) => {
        if (err) 
          this.callback(err);
        else {
          single_result.languageAnalysis = response;
          this.textExtractionAnalysis(one_queue, single_result);
        }
      });
    }
  }

  textExtractionAnalysis(one_queue, single_result) {
    if (!this.isInArray("Text-Extraction", one_queue.extract) || one_queue.isText) {
      this.combinedAnalysis(one_queue, single_result);
    } else {
      let parameters = {};
      parameters.url = one_queue.target;
      alchemy_language.text(parameters, (err, response) => {
        if (err) 
          this.callback(err);
        else {
          single_result.textExtraction = response;
          this.combinedAnalysis(one_queue, single_result);
        }
      });
    }
  }

  combinedAnalysis(one_queue, single_result) {
    let parameters = {
      extract: one_queue.extract
        .filter(keyword => this.isInArray(keyword, this.canBeCombined))
        .join(',')
    };
    if (one_queue.isText) {
      parameters.text = one_queue.target;
    } else {
      parameters.url = one_queue.target;
    }
    alchemy_language.combined(parameters, (err, response) => {
      if (err) 
        this.callback(err);
      else {
        single_result.combined = response;
        this
          .result
          .push(single_result);
        this.current += 1;
        this.checkIfFinished();
      }
    });
  }

  checkIfFinished() {
    if (this.current == this.total) {
      this.callback(null, this.result);
    }
  }
}

module.exports = Analysis;