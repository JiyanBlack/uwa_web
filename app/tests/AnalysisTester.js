const Analysis = require('../Analysis');
const fs = require('fs');

let url = 'http://www.news.uwa.edu.au/201608248962/awards-and-prizes/research-help-prematur' +
        'e-babies-recognised-national-awards'
new Analysis([
    {
        target: url,
        isText: false,
        extract: [
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
            'title',
            "Text-Extraction",
            "Language",
            "Microformats"
        ]
    }
], (err, result) => {
    if (err) 
        console.log(err);
    else 
        fs.writeFileSync('./sample_analysis.json', JSON.stringify(result, null, 2));
    }
);