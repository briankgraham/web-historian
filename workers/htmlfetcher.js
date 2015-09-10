// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var CronJob = require('cron').CronJob;
var _ = require('underscore');
var helpers = require('../helpers/archive-helpers.js');
var job = new CronJob('* * * * * *', function () {
  helpers.readListOfUrls(function (data) {
    _.each(data, function(url) {
      helpers.isUrlArchived(url, function(isArchived) {
        if(!isArchived){
          helpers.downloadUrls([url]);
        }
      });
    });
  });
}, function () {

},
true,
'America/Los_Angeles');

module.exports = job;