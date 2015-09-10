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
    if (httpHelpers.ValidURL(uri.slice(1))) { // if request is for archived website
      httpHelpers.serveArchives(res, uri, function(err, data){
        res.end(data);
      });

    } else { // if request is for static file
      var fileName;
      if (uri === '/') {
        fileName = '/index.html';
      } else {
        fileName = uri;
      }
      httpHelpers.serveAssets(res, fileName);  
    }

  } else if (req.method === 'POST') { // if request is a form post
    var str = '';
    req.on('data', function (data) {
      str+=data.toString();
    });
    req.on('end', function () {
      var url = str.substr(4);
      archive.isUrlInList(url, function (isInList) {
        if (!isInList) {
          archive.addUrlToList(url, function (err) {
            if (err) {
              console.log(('error writing to file!!').toUpperCase());
            }
          });
        }
      });
      res.writeHead(302);
      res.end();
    });

  } else if (req.method === 'OPTIONS') {

  }
      // res.end(archive.paths.list);
};
    // 
