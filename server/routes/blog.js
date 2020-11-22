const express = require('express');
const router = express.Router();
const fetchGet = require('../utils/fetch');
const { WP_BLOG_POSTS } = process.env;

router.get('/blog', async (req, res) => {
  const data = await fetchGet(WP_BLOG_POSTS);
  const formatedPosts = async () => {
    return await Promise.all(data.map(async item => {
      let post = {
        title: item.title.rendered,
        content: item.content.rendered,
        excerpt: item.excerpt.rendered,
        slug: item.slug,
        featuredMediaUrl: item._links['wp:featuredmedia'][0].href,
      };

      const featuredMediaData = await fetchGet(post.featuredMediaUrl);
      post.assets = featuredMediaData.media_details.sizes;

      return post;
    }));
  };

  return formatedPosts().then(p => res.json(p));
});

module.exports = router;
