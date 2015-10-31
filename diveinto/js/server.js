var express = require('express');
var app = express();
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

app.configure(function(){
    app.use(express.bodyParser());
});

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