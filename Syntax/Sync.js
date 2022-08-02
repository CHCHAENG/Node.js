var fs = require('fs');

/*
// readFileSync -> return 값이 존재
// Output: A B C
console.log('A');
var result = fs.readFileSync('Syntax/sample.txt','utf8');
console.log(result);
console.log('C');
*/


// readFile (async) -> return 값이 존재하지 않음.
// Output: A C B
console.log('A');
fs.readFile('Syntax/sample.txt','utf8', function(err, result){
    console.log(result);
});
console.log('C');