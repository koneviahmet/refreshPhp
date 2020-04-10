const { exec } = require('child_process');
const browser = require("browser");
class ExecPHP {
  getODBCdata (dir,url,callback) {
    let parseDir     = dir.split("\\");
    let homeDir = parseDir[parseDir.length - 2];
    let subDir  = parseDir[parseDir.length - 1];
    browser.browse("http://localhost/"+homeDir+"/"+subDir+"/"+url, function(err, out) {
      let dom = out.result;
      dom = dom.split("localhost/"+homeDir+"/"+subDir+"/index.php").join("localhost:3000/index.php");
      callback(dom + '<script src="/reload/reload.js"></script>');
    });
  }
}

module.exports = function() {
  return new ExecPHP();
};
