const express = require('express');
const postsRouter = express.Router();
const { getAllPosts } = require('../db');

// postsRouter.use((req, res, next) => {
//     console.log("A request is being made to /posts");
  
//     next(); 
//   });

postsRouter.get('/', (req, res) => {
    const posts = getAllPosts();
  
    res.send({
      posts: []
    });
  });

module.exports = postsRouter;