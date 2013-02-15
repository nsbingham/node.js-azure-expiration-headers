/*global require: false, console: false*/
(function () {

   "use strict";
    var azure = require('azure');
    var blobService = azure.createBlobService("DefaultEndpointsProtocol=http;AccountName={account_name};AccountKey={account_key}");
    var containerName = "{container_name}";
    var cacheControlLength = "604800"; // 7 days in seconds

    function setCacheControlHeader(blobName){
        blobService.setBlobProperties(containerName, blobName, {cacheControlHeader:"public, max-age=" + cacheControlLength}, function(){
            console.log("Header set for: " + blobName);
        });
    }

    blobService.listBlobs(containerName, function(error, blobs){
        if(!error){
            for(var index in blobs){
                console.log("Found: " + blobs[index].name);
                setCacheControlHeader(blobs[index].name);
            }
        }

    });

}());
