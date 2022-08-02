// 조건문, 반복문의 구문은 값이 될 수 없다. (if, for, while)
//var i = if(true) {console.log(1)}
//var w = while(true) {console.log(1)}

// 함수는 값으로 사용할 수 있다 (배열, 객체)
var f = function(){
    console.log(1+1);
    console.log(1+2);
}

// 배열의 원소로서 존재 가늗
var a = [f];
a[0]();

// 객체로도 존재 가능
var o = {
    func : f
};
o.func();