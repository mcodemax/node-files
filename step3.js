const fs = require('fs');
const axios = require('axios');

function cat(path, mode){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        outputMode(data, mode, outputPath);
    });
};


function outputMode(data, mode, outputPath){
    
    if(mode === 'write'){
        fs.writeFile(outputPath, data, "utf8", function(err) {
            if (err) {
                console.error(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
        });
    }else if(mode === 'print'){
        console.log(data);
    }
};

function webCat(url, mode){
    axios.get(url)
    .then((response) => {
        if(response.status === 200) {
            const html = response.data;
            outputMode(html, mode, outputPath);
        }
    }, (err) => {
        console.log(`Error fetching ${url}:`) 
        console.log(`   Error: Request failed with status code ${err}`);
        process.exit(1);
    });
};

// async function webCat(url) { //solutions uses this
//     try {
//       let resp = await axios.get(url);
//       console.log(resp.data);
//     } catch (err) {
//       console.error(`Error fetching ${url}: ${err}`);
//       process.exit(1);
//     }
//   }

/**tells if str is url or  not */
function isURL(str){
    if(str.includes('https://') || str.includes('http://'))
        return true;
    return false;
}


const path = (process.argv[2] === '--out') ? process.argv[3] : process.argv[2];
const mode = (process.argv[2] === '--out') ? 'write' : 'print';
const outputPath = (process.argv[2] === '--out') ? process.argv[4] : null;


if(isURL(path)){ //do diff things if mode = write vs print
    webCat(path, mode);
}else{
    cat(path, mode);
}

