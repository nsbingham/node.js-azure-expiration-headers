/*global require: false, console: false*/
(function () {

   "use strict";
    var azure = require('azure');
    var blobService = azure.createBlobService("{AzureCredentialsGoHere}");
    var containerName = "";
    var cacheControlLength = "604800"; // 7 days in seconds

    function setHeaders(blobName){
        var headers = {cacheControlHeader:"public, max-age=" + cacheControlLength, contentType:"application/octet-stream"};

        blobService.setBlobProperties(containerName, blobName, headers, function(){
            console.log("Header set for: " + blobName);
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

                if(isVM(blobs[index].name)){
                    console.log(blobs[index].name);
                    setHeaders(blobs[index].name);
                }

            }

        }

    });

}());
