const fs = require("fs");
var OpenCC = require("opencc");
var opencc = new OpenCC("t2s.json");

const getSentences = function(paragraphs) {
  let results = [];
  for (let i = 0, length = paragraphs.length; i < length; i++) {
    let sentences = paragraphs[i].split("，");
    results = results.concat(sentences);
  }

  return results;
};

const clearSentence = function(sentences) {
  let results = [];
  for (let i = 0, length = sentences.length; i < length; i++) {
    let sen = sentences[i];
    sen = sen.replace("。", "");
    results.push(sen);
  }
  return results;
};

const genFile = function(str) {
  let final = {};

  let converted = opencc.convertSync(str);
  let results = JSON.parse(converted);
  for (let i = 0, length = results.length; i < length; i++) {
    let sentences = getSentences(results[i].paragraphs);
    let clearSens = clearSentence(sentences);
    let item = {
      id: num,
      title: results[i].title,
      author: results[i].author,
      content: clearSens
    };

    final[num] = item;
    num++;
    //break;
  }

  return JSON.stringify(final);
};

let num = 1;

let results = fs.readdirSync("./data");

for (let i = 0, length = results.length; i < length; i++) {
  let currentFilename = results[i];
  let dataFile = fs.readFileSync("./data/" + currentFilename).toString();

  let final = genFile(dataFile);
  console.log(final);
  fs.writeFileSync("./new/" + currentFilename, final);
}
