var M = {
    v : 'v',
    f : function(){
        console.log(this.v);
    },
};

// mPart 안에 있는 기능들, M이 가르키는 객체를 이 모듈 바깥에서 사용할 수 있도록 해주는 것
module.exports = M;