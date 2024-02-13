const fs = require('fs');

// reading files

// fs.readFile('./docs/blog1.txt', (err, data)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(data.toString());
// });

// console.log("last line");




// writing files

// fs.writeFile('./docs/blog1.txt', "Hello, Bonheur", ()=>{
//     console.log("File was written");
// });

fs.writeFile('./docs/ .txt', "Hello, Again", ()=>{
    console.log("File was written");
});



// direcytories

if(!fs.existsSync('./assets')){
fs.mkdir('./assets', (err)=>{
    if(err){
    console.log(err);
    }
    console.log('Folder Created Sucessfull');
});

}else{
    fs.rmdir('./assets', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('Folder deleted sucessfull');
    });
}



// deleting files


if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('File deleted');
    });
}