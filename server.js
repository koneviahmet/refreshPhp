var express     = require('express');
var http        = require('http');
var path        = require('path');
var reload      = require('reload');
const execPHP   = require('./execphp.js')();
var app = express();
var phpDir = path.join(__dirname, 'php');
app.set('port', process.env.PORT || 3000);

app.get('/index.php', function (req, res) {
  url = req.url;
  execPHP.getODBCdata(phpDir , url , function (phpResult) {
    res.send(phpResult);
  });
});

var server = http.createServer(app);
reload(app).then(function (reloadReturned) {
  server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'));
  });
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err);
})
