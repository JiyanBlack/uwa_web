const api_key = require("../key.js");
const AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
const alchemy_language = new AlchemyLanguageV1({ api_key: api_key });

class analysis {
  constructor(queue, callback) {
    this.queue=queue;
    // queue:[{target:"something",isText:true,extract},{target:"url",isText:false,extract}]
    this.callback = callback;
    this.total = queue.length; //total number of results, queue is an object of text or url
    this.current = 0; //already get result number
    this.result = []; //call this result back
    this.parse();
  }

  parse() {
    for (let i = 0; i < this.queue.length; i++) {
      this.analysis(this.queue[i]);
    }
  }

  analysis(content) {
    let parameters;
    if (content.isText) {
      parameters = {
        extract: content.extract,
        text: content.target
      }
    } else {
      parameters = {
        extract: content.extract,
        url: content.target
      }
    }

    alchemy_language.combined(parameters, (err, response) => {
      if (err) {
        console.log('error:', err);
        if (this.callback !== undefined)
          this.callback(err);
      }
      else {
        this
          .result
          .push({});
        this.current += 1;
        console.log(JSON.stringify(response, null, 2));
        if (this.callback !== undefined) {
          if (this.current == this.total) {
            this.callback(null, this.result);
          }
        }
      }
    });
  }
}

const ana = new analysis([
  {
    target: "http://www.news.uwa.edu.au/201608248962/awards-and-prizes/research-help-prematur" +
    "e-babies-recognised-national-awards",
    isText: false,
    extract: 'keywords'
  }, {
    target: "http://www.news.uwa.edu.au/201608248962/awards-and-prizes/research-help-prematur" +
    "e-babies-recognised-national-awards",
    isText: false,
    extract: 'entities'
  }
], (err, response) => {
  console.log("Get result number: " + response.length);
});
