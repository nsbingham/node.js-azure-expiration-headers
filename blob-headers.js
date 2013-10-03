/*global require: false, console: false*/
(function () {

   "use strict";
 
    var azure = require('azure');
    var blobService = azure.createBlobService("winstoreprod","o8ZpcpuqZogcuAW7pKf7CLF9NcWs0Yus4m9FMLWQBPnq6eZC9l4AwCimP2/J5TlnC8/Rs2NkwhbXrgFv0xhS1Q==");
    var containerName = "vhd";
    var cacheControlLength = "604800"; // 7 days in seconds

    blobService.getServiceProperties(function(error, properties) {

        console.log('Get service callback.', properties);

        if(error) throw error;

        properties['DefaultServiceVersion'] = '2013-03-01';

        console.log('modified properties', properties);

        blobService.setServiceProperties(properties,function(error) {
        console.log('Set service callback.');

        if(error) throw error;
            console.log('done');
        });
    });

    /*function setHeaders(blobName){
        var headers = {
            cacheControlHeader:"public, max-age=" + cacheControlLength,
            contentType:"application/octet-stream",
            'x-ms-version': '2013-03-01'};

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
                    //setHeaders(blobs[index].name);
                }
                if(blobs[index].name.indexOf('test/test') > -1){
                    console.log(blobs[index].name);
                    setHeaders(blobs[index].name);
                }

            }

        } else {
            console.log(error);
        }

    });*/

}());
