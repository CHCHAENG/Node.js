/*
function a(){
    console.log('A');
}
*/

// 이름이 없는 익명함수, 호출이 불가능함
// 함수가 a 의 값으로 사용 가능
var a = function (){
    console.log('A');
}

function slowFunc(callback){
    callback();
}

slowFunc(a);