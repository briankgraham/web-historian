var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var http = require('http-request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function (err, data) {
    var array = data ? data.toString().split('\n') : [];
    array = _.filter(array, function(string) {
      return string !== '';
    });
    callback(array);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(array) {
    callback(_.contains(array, url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url+'\n', callback);
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    callback(_.contains(files, url));
  });
};

exports.downloadUrls = function(array) {
  _.each(array, function (item) {
    http.get({
      url: item,
      progress: function (cur, tots) {
        console.log('downloaded %d bytes of %d', cur, tots);
      }
    }, path.join(exports.paths.archivedSites, item), function (err, res) {
      if (err) {
        console.log(err);
        return;
      }
    });
    //request.get('http://'+item).pipe(fs.createWriteStream(path.join(exports.paths.archivedSites, item)));
  });
};
