var path = require("path");
var fs = require("fs");
var mime = require("./mime").types;

function router (pathname, request, response) {
    if(pathname == "/"||pathname.substring(0,6) == "/index"){
        pathname = "/index6.html";
    }
    var realPath = pathname; //这里要注意路径一定要正确
    fs.exists(realPath, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type":"text/plain"});
            response.write("404 not found");
            response.end();
        }
        else {
            fs.readFile(realPath, "binary", function(err, file) {
                if(err) {
                    response.writeHead(500, {"Content-Type":"text/plain"});
                    response.end(err);
                }
                else {
                    var ext = path.extname(realPath);
                    ext = ext ? ext.slice(1):'unknown';
                    var contentType = mime[ext]||"text/plain";
                    response.writeHead(200,{"Content-Type":contentType});
                    response.write(file,"binary");
                    response.end();
                }
            })
        }
    })
};
exports.router = router;
