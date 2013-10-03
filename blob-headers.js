/*global require: false, console: false*/
(function () {

   "use strict";
 
    var azure = require('azure');
    var blobService = azure.createBlobService("modernievirt","PHahBCdmHiS34IeXOF9RWCGz8Urk9SZmSGe2bRRCFbYfj74R7CG5GH+4FYEJll/xiyr4UOjWZcGsYwUMSW8INA==");
    var containerName = "vhd";
    var cacheControlLength = "604800"; // 7 days in seconds

    function setHeaders(blobName){
        var headers = {
            cacheControlHeader:"public, max-age=" + cacheControlLength,
            contentType:"application/octet-stream",
            'x-ms-version': '2013-03-01'};

        blobService.setBlobProperties(containerName, blobName, headers, function(){
            console.log("Header set for: " + blobName);
        });

        blobService.getBlobProperties(containerName, blobName, function (error, blob) {
            console.log(blob);
        });

    }

    function isVM(name){

        if(name.indexOf('.sfx') > -1 || name.indexOf('.rar') > -1 || name.indexOf('.zip') > -1){
            return true;
        } else {
            return false;
        }

    }

    blobService.listBlobs(containerName, function(error, blobs){
        if(!error){

            for(var index in blobs){

                /*if(isVM(blobs[index].name)){
                    console.log(blobs[index].name);
                    //setHeaders(blobs[index].name);
                }*/
                if(blobs[index].name.indexOf('test/test') > -1){
                    console.log(blobs[index].name);
                    setHeaders(blobs[index].name);
                }

            }

        } else {
            console.log(error);
        }

    });

}());
