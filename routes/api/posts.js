const express = require('express');
const router = express.Router();
const {
  check,
  validationResult,
} = require('express-validator');

const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//TODO @route   POST api/posts
//TODO @desc    Create the post
//TODO @access  Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').notEmpty()]],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select(
        '-password'
      );
      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      const post = new Post(newPost);
      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//TODO @route   GET api/posts
//TODO @desc    Get all posts
//TODO @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//TODO @route   GET api/posts/:post_id
//TODO @desc    Get post by id
//TODO @access  Private
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res
        .status(404)
        .json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'Post not found!' });
    }
    res.status(500).send('Server Error');
  }
});

//TODO @route   DELETE api/posts/:post_id
//TODO @desc    Delete post by id
//TODO @access  Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //? Check if post not exist?
    if (!post) {
      return res
        .status(404)
        .json({ msg: 'Post not found' });
    }

    //? Check if post not belong user?
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'Post not found!' });
    }
    res.res.status(500).send('Server Error');
  }
});

//TODO @route   PUT api/posts/like/:post_id
//TODO @desc    Like to post
//TODO @access  Private
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //? Check if post not exist?
    if (!post) {
      return res
        .status(404)
        .json({ msg: 'Post not found' });
    }

    //? Check if the post has already been liked
    if (
      post.likes.filter(
        (like) => like.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: 'Post already like' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'Post not found!' });
    }
    res.status(500).send('Server Error');
  }
});

//TODO @route   PUT api/posts/unlike/:post_id
//TODO @desc    Unlike to post
//TODO @access  Private
router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //? Check if post not exist?
    if (!post) {
      return res
        .status(404)
        .json({ msg: 'Post not found' });
    }

    //? Check if the post has yet been liked
    if (
      post.likes.filter(
        (like) => like.user.toString() === req.user.id
      ).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'Post has not yet been liked' });
    }

    const removeIndex = post.likes.findIndex(
      (like) => like.user.toString() === req.user.id
    );

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'Post not found!' });
    }
    res.status(500).send('Server Error');
  }
});

//TODO @route   POST api/posts/comment/:post_id
//TODO @desc    Add the comment
//TODO @access  Private
router.post(
  '/comment/:post_id',
  [auth, [check('text', 'Text is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select(
        '-password'
      );
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//TODO @route   DELETE api/posts/comment/:post_id/:comment_id
//TODO @desc    Delete comment by id
//TODO @access  Private
router.delete(
  '/comment/:post_id/:comment_id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);

      //? Check if post not exist?
      if (!post) {
        return res
          .status(404)
          .json({ msg: 'Post not found' });
      }

      //* Pull out comment
      const comment = post.comments.find(
        (com) => com.id.toString() === req.params.comment_id
      );

      //? Check if comment not exist?
      if (!comment) {
        return res
          .status(404)
          .json({ msg: 'Comment not found' });
      }

      //? Check if comment not belong user?
      if (comment.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'User not authorized' });
      }

      const removeIndex = post.comments.findIndex(
        (com) => com.id.toString() === comment.id.toString()
      );

      post.comments.splice(removeIndex, 1)

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ msg: 'Post or comment not found!' });
      }
      res.res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
