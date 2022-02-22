let express = require("express");
const { Promise } = require("node-fetch");
const fetch = require("node-fetch");
const {
  hashCode,
  getTotalPages,
  fetchLoop,
  getTimestamp,
  sortJson,
} = require("./helpers/helper");
let DOMParser = require("xmldom").DOMParser;
let parser = new DOMParser({ errorHandler: function () {} });
let app = express();

app.get("/watch/notice", async (req, res, next) => {
  try {
    // Fetching the data
    let promise = fetchLoop("https://tuiost.edu.np/notice");

    // Resolving the promise
    let resolvePromise = await Promise.resolve(promise);

    // Initializing empty array
    let jsonObj = [];

    // Parsing and select the DOM Elements
    let document = parser.parseFromString(resolvePromise, "text/xml");
    let divs = document.getElementsByClassName("mt-3");
    let count = divs.length;

    // Looping through selected DOMS to scrape the data.
    for (let i = 0; i < count; i++) {
      let title = divs[i].childNodes[1].childNodes[3].childNodes[0].data;
      let link = divs[i].childNodes[1].attributes[0].value;
      let date = divs[i].childNodes[3].childNodes[0].data;
      let hash = hashCode(title + link + date);
      let author = "www.tuiost.edu.np";
      let timestamp = new Date(getTimestamp(date));
      let unixTimestamp = getTimestamp(date);

      // Making a object child
      item = {
        title,
        link,
        hash,
        author,
        date,
        timestamp,
        unixTimestamp,
      };

      // Pushing it to the returning object
      jsonObj.push(item);
    }

    // Returning the JSON as response.
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: null,
      serverTime: new Date(),
      data: sortJson(jsonObj, "timestamp"),
    });
  } catch (error) {
    // If any error occurs.
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
      serverTime: new Date(),
      data: null,
    });
  }
});

app.get("/watch/result", async (req, res, next) => {
  try {
    // Fetching the data
    let promise = fetchLoop("https://tuiost.edu.np/result");

    // Resolving the promise
    let resolvePromise = await Promise.resolve(promise);

    // Initializing empty array
    let jsonObj = [];

    // Parsing and select the DOM Elements
    let document = parser.parseFromString(resolvePromise, "text/xml");
    let divs = document.getElementsByClassName("mt-3");
    let count = divs.length;

    // Looping through selected DOMS to scrape the data.
    for (let i = 0; i < count; i++) {
      let title = divs[i].childNodes[1].childNodes[3].childNodes[0].data;
      let link = divs[i].childNodes[1].attributes[0].value;
      let date = divs[i].childNodes[3].childNodes[0].data;
      let hash = hashCode(title + link + date);
      let author = "www.tuiost.edu.np";
      let timestamp = new Date(getTimestamp(date));
      let unixTimestamp = getTimestamp(date);

      // Making a object child
      item = {
        title,
        link,
        hash,
        author,
        date,
        timestamp,
        unixTimestamp,
      };

      // Pushing it to the returning object
      jsonObj.push(item);
    }

    // Returning the JSON as response.
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: null,
      serverTime: new Date(),
      data: sortJson(jsonObj, "timestamp"),
    });
  } catch (error) {
    // If any error occurs.
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
      serverTime: new Date(),
      data: null,
    });
  }
});

app.get("/watch/schedule", async (req, res, next) => {
  try {
    // Fetching the data
    let promise = fetchLoop("https://tuiost.edu.np/schedule");

    // Resolving the promise
    let resolvePromise = await Promise.resolve(promise);

    // Initializing empty array
    let jsonObj = [];

    // Parsing and select the DOM Elements
    let document = parser.parseFromString(resolvePromise, "text/xml");
    let divs = document.getElementsByClassName("mt-3");
    let count = divs.length;

    // Looping through selected DOMS to scrape the data.
    for (let i = 0; i < count; i++) {
      let title = divs[i].childNodes[1].childNodes[3].childNodes[0].data;
      let link = divs[i].childNodes[1].attributes[0].value;
      let date = divs[i].childNodes[3].childNodes[0].data;
      let hash = hashCode(title + link + date);
      let author = "www.tuiost.edu.np";
      let timestamp = new Date(getTimestamp(date));
      let unixTimestamp = getTimestamp(date);

      // Making a object child
      item = {
        title,
        link,
        hash,
        author,
        date,
        timestamp,
        unixTimestamp,
      };

      // Pushing it to the returning object
      jsonObj.push(item);
    }

    // Returning the JSON as response.
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: null,
      serverTime: new Date(),
      data: sortJson(jsonObj, "timestamp"),
    });
  } catch (error) {
    // If any error occurs.
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
      serverTime: new Date(),
      data: null,
    });
  }
});

app.get("/get/notice", async (req, res, next) => {
  try {
    // Fetching the data for total page count
    let length = await getTotalPages("https://tuiost.edu.np/notice");

    // Initialize the empty promise array
    let promiseArray = [];

    // Loop and fetch the data of every page as a promise
    for (let i = 1; i <= length; i++) {
      //Fetch every page as a promise
      let promise = fetchLoop("https://tuiost.edu.np/notice", i);

      // Push it to the promise array
      promiseArray.push(promise);
    }

    //Resolve all the promises in the promise array
    let resolveAll = await Promise.allSettled(promiseArray);

    // Initializing empty array
    let jsonObj = [];

    // Looping through every resolved promise
    resolveAll.forEach((e) => {
      // Parsing and select the DOM Elements
      let document = parser.parseFromString(e.value, "text/xml");
      let divs = document.getElementsByClassName("mt-3");
      let count = divs.length;

      // Looping through selected DOMS to scrape the data.
      for (let i = 0; i < count; i++) {
        let title = divs[i].childNodes[1].childNodes[3].childNodes[0].data;
        let link = divs[i].childNodes[1].attributes[0].value;
        let date = divs[i].childNodes[3].childNodes[0].data;
        let hash = hashCode(title + link + date);
        let author = "www.tuiost.edu.np";
        let timestamp = new Date(getTimestamp(date));
        let unixTimestamp = getTimestamp(date);

        // Making a object child
        item = {
          title,
          link,
          hash,
          author,
          date,
          timestamp,
          unixTimestamp,
        };

        // Pushing it to the returning object
        jsonObj.push(item);
      }
    });

    // Returning the JSON as response.
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: null,
      serverTime: new Date(),
      data: sortJson(jsonObj, "timestamp"),
    });
  } catch (error) {
    // If any error occurs.
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
      serverTime: new Date(),
      data: null,
    });
  }
});

app.get("/get/schedule", async (req, res, next) => {
  try {
    // Fetching the data for total page count
    let length = await getTotalPages("https://tuiost.edu.np/schedule");

    // Initialize the empty promise array
    let promiseArray = [];

    // Loop and fetch the data of every page as a promise
    for (let i = 1; i <= length; i++) {
      //Fetch every page as a promise
      let promise = fetchLoop("https://tuiost.edu.np/schedule", i);

      // Push it to the promise array
      promiseArray.push(promise);
    }

    //Resolve all the promises in the promise array
    let resolveAll = await Promise.allSettled(promiseArray);

    // Initializing empty array
    let jsonObj = [];

    // Looping through every resolved promise
    resolveAll.forEach((e) => {
      // Parsing and select the DOM Elements
      let document = parser.parseFromString(e.value, "text/xml");
      let divs = document.getElementsByClassName("mt-3");
      let count = divs.length;

      // Looping through selected DOMS to scrape the data.
      for (let i = 0; i < count; i++) {
        let title = divs[i].childNodes[1].childNodes[3].childNodes[0].data;
        let link = divs[i].childNodes[1].attributes[0].value;
        let date = divs[i].childNodes[3].childNodes[0].data;
        let hash = hashCode(title + link + date);
        let author = "www.tuiost.edu.np";
        let timestamp = new Date(getTimestamp(date));
        let unixTimestamp = getTimestamp(date);

        // Making a object child
        item = {
          title,
          link,
          hash,
          author,
          date,
          timestamp,
          unixTimestamp,
        };

        // Pushing it to the returning object
        jsonObj.push(item);
      }
    });

    // Returning the JSON as response.
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: null,
      serverTime: new Date(),
      data: sortJson(jsonObj, "timestamp"),
    });
  } catch (error) {
    // If any error occurs.
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
      serverTime: new Date(),
      data: null,
    });
  }
});

app.get("/get/result", async (req, res, next) => {
  try {
    // Fetching the data for total page count
    let length = await getTotalPages("https://tuiost.edu.np/result");

    // Initialize the empty promise array
    let promiseArray = [];

    // Loop and fetch the data of every page as a promise
    for (let i = 1; i <= length; i++) {
      //Fetch every page as a promise
      let promise = fetchLoop("https://tuiost.edu.np/result", i);

      // Push it to the promise array
      promiseArray.push(promise);
    }

    //Resolve all the promises in the promise array
    let resolveAll = await Promise.allSettled(promiseArray);

    // Initializing empty array
    let jsonObj = [];

    // Looping through every resolved promise
    resolveAll.forEach((e) => {
      // Parsing and select the DOM Elements
      let document = parser.parseFromString(e.value, "text/xml");
      let divs = document.getElementsByClassName("mt-3");
      let count = divs.length;

      // Looping through selected DOMS to scrape the data.
      for (let i = 0; i < count; i++) {
        let title = divs[i].childNodes[1].childNodes[3].childNodes[0].data;
        let link = divs[i].childNodes[1].attributes[0].value;
        let date = divs[i].childNodes[3].childNodes[0].data;
        let hash = hashCode(title + link + date);
        let author = "www.tuiost.edu.np";
        let timestamp = new Date(getTimestamp(date));
        let unixTimestamp = getTimestamp(date);

        // Making a object child
        item = {
          title,
          link,
          hash,
          author,
          date,
          timestamp,
          unixTimestamp,
        };

        // Pushing it to the returning object
        jsonObj.push(item);
      }
    });

    // Returning the JSON as response.
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: null,
      serverTime: new Date(),
      data: sortJson(jsonObj, "timestamp"),
    });
  } catch (error) {
    // If any error occurs.
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
      serverTime: new Date(),
      data: null,
    });
  }
});

app.get("/get/notices", async (req, res, next) => {
  try {
    // Fetching the data for total page count
    let length = await getTotalPages("https://tuiost.edu.np/notices");

    // Initialize the empty promise array
    let promiseArray = [];

    // Loop and fetch the data of every page as a promise
    for (let i = 1; i <= length; i++) {
      //Fetch every page as a promise
      let promise = fetchLoop("https://tuiost.edu.np/notices", i);

      // Push it to the promise array
      promiseArray.push(promise);
    }

    //Resolve all the promises in the promise array
    let resolveAll = await Promise.allSettled(promiseArray);

    // Initializing empty array
    let jsonObj = [];

    // Looping through every resolved promise
    resolveAll.forEach((e) => {
      // Parsing and select the DOM Elements
      let document = parser.parseFromString(e.value, "text/xml");
      let divs = document.getElementsByClassName("mt-3");
      let count = divs.length;

      // Looping through selected DOMS to scrape the data.
      for (let i = 0; i < count; i++) {
        let title = divs[i].childNodes[1].childNodes[3].childNodes[0].data;
        let link = divs[i].childNodes[1].attributes[0].value;
        let date = divs[i].childNodes[3].childNodes[0].data;
        let hash = hashCode(title + link + date);
        let author = "www.tuiost.edu.np";
        let timestamp = new Date(getTimestamp(date));
        let unixTimestamp = getTimestamp(date);

        // Making a object child
        item = {
          title,
          link,
          hash,
          author,
          date,
          timestamp,
          unixTimestamp,
        };

        // Pushing it to the returning object
        jsonObj.push(item);
      }
    });

    // Returning the JSON as response.
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: null,
      serverTime: new Date(),
      data: sortJson(jsonObj, "timestamp"),
    });
  } catch (error) {
    // If any error occurs.
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
      serverTime: new Date(),
      data: null,
    });
  }
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
