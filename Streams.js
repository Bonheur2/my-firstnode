const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chuck) => {
// console.log('------------ NEW CHUNK ----------------');
// console.log(chuck);
// writeStream.write('\n NEW CHUNK \n')
// writeStream.write(chuck);
// })


// piping

readStream.pipe(writeStream);