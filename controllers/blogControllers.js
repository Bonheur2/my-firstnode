const Blog = require('../models/blogs.js');


// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
}



const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            if (result) {
                res.render('blogs/details', { blog: result, title: 'Blog details' });
            } else {
                res.status(404).render('blogs/404', { title: 'Blog not found' });
            }
        })
        .catch((err) => {
            res.status(500).render('blogs/404', { title: '500 - Internal Server Error' });
        });
}

const blog_create_get = (req, res) => {
    res.status(200).render('blogs/create', { title: 'Create new a blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).render('blogs/404', { title: 'Error' });
        });
}


const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).render('blogs/404', { title: '500 - Internal Server Error' });
        });
}


module.exports = {
    blog_index, blog_details, blog_delete, blog_create_get, blog_create_post
}