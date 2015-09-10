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
    if (uri.slice(0, 4) === '/www') { // if request is for archived website
      uri = uri.slice(1);
      archive.isUrlArchived(uri, function(isArchived) {
        var filename;
        if (isArchived){
          filename = path.join(archive.paths.archivedSites, uri);
        } else {
          filename = path.join(archive.siteAssets, 'loading.html'); 
        }
        fs.createReadStream(filename).pipe(res);
      });

    } else { // if request is for static file
      var fileName;
      if (uri === '/') {
        fileName = '/index.html';
      } else {
        fileName = uri; // www.google.com
      }
      httpHelpers.serveAssets(res, fileName);  
    }
  } else if (req.method === 'POST') {
    var str = '';
    req.on('data', function (data) {
      str+=data;
    });
    req.on('end', function () {
      var url = str.slice(4);
      archive.isUrlInList(url, function (isInList) {
        if (!isInList) {
          archive.addUrlToList(url, function (err) {
            if (err) {
              return err;
            }
          });
        }
      });
      // res.status(302);
      // res.end();
    });

  } else if (req.method === 'OPTIONS') {

  }
  
  // res.end(archive.paths.list);
};
