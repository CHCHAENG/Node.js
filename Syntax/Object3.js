// 폴더로 파일을 정리하는 개념
var q = {
    v1 : 'v1',
    v2 : 'v2',
    f1 : function f1(){
        console.log(this.v1);
    },
    f2 : function f2(){
        console.log(this.v2);
    }
}

q.f1();
q.f2();
