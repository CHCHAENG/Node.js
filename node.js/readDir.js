var testFolder = 'data';
var fs = require('fs');

// 배열의 형태로 출력됨
fs.readdir(testFolder, function(error, filelist) {
    console.log(filelist);
})