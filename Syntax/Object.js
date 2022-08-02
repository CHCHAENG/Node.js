var members = ['chaeng', 'taeng', 'jji'];
console.log(members[1]);

var i = 0;

while(i < members.length){
    console.log('array loop' , members[i]);
    i++;
}

// 각각의 data마다 고유한 이름을 부여하는 것
var roles = {
    'programmer' : 'chaeng',
    'desinger' : 'taeng',
    'manager' : 'jji'
};
// key값을 배열의 문자열로 줘서 value에 접근 가능
console.log(roles.desinger);
console.log(roles['desinger']);

// name 에는 객체의 key가 들어옴
for(var name in roles){
    console.log('object ', name);
}

// value를 얻는 법
for(var name in roles){
    console.log('value ', roles[name]);
}