const Post = require('../models/Post');

const ERROR_MESSAGE = 'An error occurred';

exports.createPost = async (req, res) => {
    const { body } = req;
    try {
        const newPost = await Post.create(body);
        res.status(201).send({
            message: 'Post added successfully!',
            body: { post: newPost },
        });
    } catch (error) {
        console.error('createPost', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
        });
    }
};

exports.listAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        //console.log('Posts:', posts); // Log the posts
        res.status(200).send(posts);
    } catch (error) {
        console.error('listAllPosts', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
            error: error.message,
            code: error.parent.code,
            stack: error.stack,
        });
    }
};

exports.findPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            throw 'post_not_found';
        }
        res.status(200).send(post);
    } catch (error) {
        console.error('findPostById', error);
        if (error === 'post_not_found') {
            res.status(404).send({
                message: 'Post not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.updatePostById = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const [updatedRowsCount] = await Post.update(body, { where: { id: id } });
        if (updatedRowsCount === 0) {
            throw 'post_not_found';
        }
        res.status(200).send({ message: 'Post Updated Successfully!' });
    } catch (error) {
        console.error('updatePostById', error);
        if (error === 'post_not_found') {
            res.status(404).send({
                message: 'Post not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.deletePostById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Post.destroy({ where: { id: id } });
        if (deletedRowCount === 0) {
            throw 'post_not_found';
        }
        res.status(200).send({ message: 'Post deleted successfully!' });
    } catch (error) {
        console.error('deletePostById', error);
        if (error === 'post_not_found') {
            res.status(404).send({
                message: 'Post not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};
