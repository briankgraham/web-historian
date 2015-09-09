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

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
