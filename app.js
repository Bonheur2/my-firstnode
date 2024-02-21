const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs.js');
const { result } = require('lodash');

// express app
const app = express();

// connect to mongo db
const dbURI = 'mongodb+srv://bonheurrukwaya:E3c6j8b1s3@cluster0.jh6ddao.mongodb.net/node-tuts'
mongoose.connect(dbURI);
try {
    then((result))
        console.log('Connection to database made successfull');
} catch (error) {
   console.log(error); 
}


// register view engine
app.set('view engine', 'ejs');

// listening for requests
app.listen(3000);

// middleware
// app.use((req, res, next) => {
//     console.log('new request made: ');
//     console.log('host', req.hostname);
//     console.log('path', req.path);
//     console.log('method', req.method);
//     next();
// });

// middleware and static files
app.use(express.static('public'))
app.use(morgan('dev'));

app.get('/add-blog', (req, res)=>{
    
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    blog.save();

    try {
        .then((result) => {
            res.send(result)
        })
            .catch((err) => {
                console.log(err)
            });
    } catch (error) {
        
    }
})
})

app.get('/', (req, res) => {
    const blogs = [
        { title: 'Bonheur finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Rukwaya finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat browser', snippet: 'Lorem ipsum dolor sit amet consectetur' }
    ]
    res.render('index', { title: 'Home', blogs });
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
})

//    404 pages
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})