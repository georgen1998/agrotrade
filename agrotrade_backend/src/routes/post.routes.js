const router = require('express-promise-router')();
const postController = require('../controllers/post.controller');

router.post('/posts', postController.createPost);

router.get('/posts', postController.listAllPosts);

router.get('/posts/:id', postController.findPostById);

router.put('/posts/:id', postController.updatePostById);

router.delete('/posts/:id', postController.deletePostById);

module.exports = router;
