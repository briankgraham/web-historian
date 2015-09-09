var path = require('path');
var url = require('url');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

exports.handleRequest = function (req, res) {

  var uri = url.parse(req.url).pathname;
  if (req.method === 'GET') {
    if (uri.slice(0, 4) === '/www') { // if request is for API
      

    } else { // if request is for file
      var fileName;
      if (uri === '/') {
        fileName = '/index.html';
      } else {
        fileName = uri; // www.google.com
      }
      httpHelpers.serveAssets(res, fileName);  
    }


  } else if (req.method === 'POST') {
    

  } else if (req.method === 'OPTIONS') {

  }
  
  // res.end(archive.paths.list);
};
