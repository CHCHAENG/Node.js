var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var template = {
    html : function (title, list, body, control) {
        return `<!doctype html>
        <html>
        <head>
            <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${control}
            ${body}
        </body>
        </html>
        `;
    },
    list : function (filelist) {
        var list = '<ul>';
        var i = 0;
        while (i < filelist.length) {
            list += `<li><a href ="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i++;
        }
        list += '</ul>';
    
        return list;
    }
};

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url
        .parse(_url, true)
        .query;
    var pathName = url
        .parse(_url, true)
        .pathname;

    if (pathName === '/') {
        if (queryData.id === undefined) {
            fs.readdir('data', function (error, filelist) {

                var title = 'Welcome';
                var description = 'Hello, Node.js';

                var list = template.list(filelist);
                var html = template.html(
                    title,
                    list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`
                );

                response.writeHead(200);
                response.end(html);
            })
        } else {

            fs.readdir('data', function (error, filelist) {

                fs.readFile(`data/${queryData.id}`, 'utf-8', function (err, description) {
                    var title = queryData.id;
                    var list = template.list(filelist);
                    var html = template.html(
                        title,
                        list,
                        `<h2>${title}</h2>${description}`,
                        `<a href="/create">create</a> 
                        <a href="/update?id=${title}">update</a>
                        <form action="/delete_process" method="post">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                        </form>`
                    );

                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if (pathName === '/create') {
        fs.readdir('data', function (error, filelist) {

            var title = 'WEB - create';
            var list = template.list(filelist);
            var html = template.html(
                title,
                list,
                `
            <form action = "/create_process" method="post">
            <p><input type="text" name ="title" placeholder="title"></p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
            `,
                ''
            );

            response.writeHead(200);
            response.end(html);
        });
    } else if (pathName === '/create_process') {
        var body = '';
        // web browser로부터 post 방식으로 전송된 데이터를 가져옴
        request.on('data', function (data) {
            body += data;
        });
        // querystring module qs를 이용해서 정보를 객체화 할 수 있음
        request.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;

            fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
                // 리다이렉션
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            });
        });
    } else if (pathName === '/update') {
        fs.readdir('data', function (error, filelist) {

            fs.readFile(`data/${queryData.id}`, 'utf-8', function (err, description) {
                var title = queryData.id;
                var list = template.list(filelist);
                var html = template.html(
                    title,
                    list,
                    `
            <form action = "/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name ="title" placeholder="title" value="${title}"></p>
            <p>
                <textarea name="description" placeholder="description" value="${description}></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
            </form>
                `,
                    `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                );

                response.writeHead(200);
                response.end(html);
            });
        });
    } else if (pathName === '/update_process'){
        var body = '';
        // web browser로부터 post 방식으로 전송된 데이터를 가져옴
        request.on('data', function (data) {
            body += data;
        });
        // querystring module qs를 이용해서 정보를 객체화 할 수 있음
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;

            fs.rename(`data/${id}`, `data/${title}`, function(err){
                fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
                    // 리다이렉션
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                });
            });
        });
    } 
    else if (pathName === '/delete_process'){
        var body = '';
        // web browser로부터 post 방식으로 전송된 데이터를 가져옴
        request.on('data', function (data) {
            body += data;
        });
        // querystring module qs를 이용해서 정보를 객체화 할 수 있음
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            
            fs.unlink(`data/${id}`, function(err){
                response.writeHead(302, {Location: '/'});
                response.end();
            });
        });
    } 
    else {
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(3000);