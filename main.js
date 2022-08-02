var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
 
function templateHTML(title, list, body) {
    return `<!doctype html>
    <html>
    <head>
        <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        <a href="/create">create</a>
        ${body}
    </body>
    </html>
    `;
}

function templateList(filelist) {
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length) {
        list += `<li><a href ="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i++;
    }
    list += '</ul>';

    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    if(pathName === '/') {
        if(queryData.id === undefined){
            fs.readdir('data', function(error, filelist){

            var title = 'Welcome';
            var description = 'Hello, Node.js';
            
            var list = templateList(filelist);

            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
               
            response.writeHead(200);
            response.end(template);
            })
        } else {

            fs.readdir('data', function(error, filelist){

            fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
               
            response.writeHead(200);
            response.end(template);
            });
        });
    }
    } else if(pathName === '/create'){
        fs.readdir('data', function(error, filelist){

            var title = 'WEB - create';
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
            <form action = "http://localhost:3000/create_process" method="post">
            <p><input type="text" name ="title" placeholder="title"></p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
            `);
               
            response.writeHead(200);
            response.end(template);
            });
    } else if(pathName === '/create_process'){
        var body = '';
        // web browser로부터 post 방식으로 전송된 데이터를 가져옴
        request.on('data', function(data){
            body += data;
        });
        // querystring module qs를 이용해서 정보를 객체화 할 수 있음
        request.on('end',function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
        
            fs.writeFile(`data/${title}`, description, 'utf8', 
            function(err){
                // 리다이렉션
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            })
        });
    } 
    else {
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(3000); 