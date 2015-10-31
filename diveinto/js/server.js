var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bookId = 3;



function findBook(id){
    for(var i=0; i<books.length; i++){
        if(books[i].id === id){
            return books[i];
        }
    }
    return null;
}

function removeBook(id){
    var bookIndex = 0;
    for(var i=0; i<books.length; i++){
        if(books[i].id === id){
            bookIndex = i;
            break;
        }
    }
    books.splice(bookIndex, 1);
}

app.use(bodyParser.json());   

var books = [
    {id: 1, author: 'Ukio Misima', title: 'Golden Temple', year: 1956},
    {id: 2, author: 'Charles Bukowski', title: "Women"},
]

app.get('/books', function(request, response){
    response.header('Access-Control-Allow-Origin', '*');
    console.log('In GET function ');
    response.json(books);
});

app.get('/books/:id', function(request, response){

    response.header('Access-Control-Allow-Origin', '*');
    searchId = request.params.id;
    console.log('Getting book with id ' + searchId);
    var book = findBook(parseInt(searchId), 10);
    if(book == null){
        response.send(404);
    }
    else{
        response.json(book);
    }

});

app.post('/books/', function(request, response){
    response.header('Access-Control-Allow-Origin', '*');
    
    var book = request.body;
    console.log('Saving book ' + JSON.stringify(book));
    book.id = bookId++;
    books.push(book);
    response.send(book);    
});

app.put('/books/:id', function(request, response){
    response.header('Access-Control-Allow-Origin', '*');
    var book = request.body;
    console.log('Updating Book ' + JSON.stringify(book));
    var currentBook = findBook(parseInt(request.params.id,10));
    if(currentBook === null){
        response.send(404);
    } else {
        currentBook.title = book.title;
        currentBook.year = book.year;
        currentBook.author = book.author;

        response.send(book);
    }   
});

app.delete('/books/:id', function(request, response){
    response.header('Access-Control-Allow-Origin', '*');
    var searchId = parseInt(request.params.id, 10);
    var book = findBook(searchId);

    if(book == null){
        console.log("Couldn't find book with id " + searchId);
        response.send(404);
    } else {
        console.log('Deleting book with id ' + searchId);
        removeBook(searchId);
        response.send(200);
    }
    response.send(200);
});

// Here we allow CORS requests
var allowCrossDomain = function(request, response, next){
    response.header('Access-Control-Allow-Origin', "http://localhost");
    response.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');

    if ('OPTIONS' == request.method) {
        response.send(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);

app.listen(8080);