const fs = require('fs');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.error(err);
            process.exit(1);
        }
        console.log(data);
    });
};

function webCat(url){ //equiv to the webCat in solns
    axios.get(url)
    .then((response) => {
        if(response.status === 200) {
            const html = response.data;
                console.log(html);
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
// }

/**tells if str is url or  not */
function isURL(str){
    if(str.includes('https://') || str.includes('http://'))
        return true;
    return false;
}


const path = process.argv[2];

if(isURL(path)){
    webCat(path);
}else{
    cat(path);
}

