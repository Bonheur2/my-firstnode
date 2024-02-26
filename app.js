const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs.js');
const { result } = require('lodash');

// express app
const app = express();

// connect to mongo db
const dbURI = 'mongodb+srv://bonheurrukwaya:E3c6j8b1s3@cluster0.jh6ddao.mongodb.net/node-tuts';

mongoose.connect(dbURI)
    .then((result) => {
        console.log('Connection to database made successfully');
        // Start listening for requests only after the database connection is successful
        app.listen(3000);
    })
    .catch((error) => {
        console.log(error);
    });

// register view engine
app.set('view engine', 'ejs');

// middleware
// app.use((req, res, next) => {
//     console.log('new request made: ');
//     console.log('host', req.hostname);
//     console.log('path', req.path);
//     console.log('method', req.method);
//     next();
// });

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).send('Error saving blog');
//         });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// // get single blog

// app.get('/single-blog', (req, res) => {
//     Blog.findById('65d7177fcf2b6c9daae62047')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });

// // delete blogs by id
// app.get('/delete-blog', (req, res) => {
//     Blog.findByIdAndDelete('65d71a13cf2b6c9daae62049')
//         .then((result) => {
//             res.send(result)
//             console.log(`Blog for this id: ${id} deleted successfull`);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });


app.get('/', (req, res) => {
    // const blogs = [
    //         { title: 'Bonheur finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //         { title: 'Rukwaya finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //         { title: 'How to defeat browser', snippet: 'Lorem ipsum dolor sit amet consectetur' }
    //     ]
    res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// post

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create new a blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
