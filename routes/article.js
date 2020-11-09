const article = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getArticle,
  postArticle,
  deleteArticle,
} = require('../controllers/article');

article.get('/articles', getArticle);
article.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required().min(2),
    source: Joi.string().required().min(2),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
}), postArticle);
article.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
}), deleteArticle);

module.exports = article;
