var proxyAddress = "https://api.codetabs.com/v1/proxy/?quest=";
const fetch = require("node-fetch");
var DOMParser = require("xmldom").DOMParser;
var parser = new DOMParser();

module.exports = {
  hashCode: (val) => {
    return require("crypto").createHash("sha256").update(val).digest("hex");
  },
  getTotalPages: async (url) => {
    try {
      let response = await fetch(`${proxyAddress}${url}`);
      let responseText = await response.text();
      var document = parser.parseFromString(responseText, "text/xml");
      var divs = document.getElementsByClassName("page-link");
      return divs[divs.length - 2].childNodes[0].data;
    } catch (err) {
      console.log(err);
    }
  },
  fetchLoop: async (url, page = 1) => {
    try {
      let response = await fetch(`${proxyAddress}${url}?page=${page}`);
      let responseText = await response.text();
      return responseText;
    } catch (error) {
      return "";
    }
  },
  getTimestamp: (dateStr) => {
    // dataStr = "16th Feb, 2022"
    let find = ["st", "nd", "rd", "th"];
    for (var i = 0; i < find.length; i++) {
      dateStr = dateStr.replace(find[i], "");
    }
    return new Date(dateStr).getTime();
  },
  sortJson: (json, key) => {
    return json.sort(function (obj1, obj2) {
      return obj1[key] + obj2[key];
    });
  },
};
