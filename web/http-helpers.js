var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, fileName, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fileName = 'web/public'+fileName; // web/public/www.google.com

  var filename = path.join(process.cwd(), fileName);

  fs.exists(filename, function(exists) {
    if(!exists) {
        console.log("not exists: " + filename);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end();
    }
    else{
      // var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
      res.writeHead(200);
      var fileStream = fs.createReadStream(filename);
      fileStream.pipe(res);

    }
   }); //end path.exists
};

exports.ValidURL = function (str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
};

exports.serveArchives = function (res, uri, callback) {
  archive.isUrlArchived(uri, function(isArchived) {
    var filename;
    if (isArchived){
      filename = path.join(archive.paths.archivedSites, uri);
    } else {
      filename = path.join(archive.paths.siteAssets, 'loading.html'); 
    }
    fs.readFile(filename, callback);
  });
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
