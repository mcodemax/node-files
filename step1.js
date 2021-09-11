const fs = require('fs');

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => { //this fs.readFile is async
        if(err){
            console.error(err);
            process.exit(1);
        }
        console.log(data);
    });
};

cat(process.argv[2]);


// process.on('exit', function(code){//reading files doesn't work on an exit event?????, cat has unexpected behavoir
//     //call cat and read the file
//     cat(process.argv[2]);

//     // for(let i = 0; i < process.argv.length; i++){
//     //     console.log(process.argv[i]);
//     // }//we still have access to all these args
// });

//https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/

//https://nodejs.org/api/process.html#process_event_exit
//in abv:Listener functions must only perform synchronous operations.