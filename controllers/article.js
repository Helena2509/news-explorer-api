const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getArticle = (req, res, next) => {
  const datatArticles = Article.find({})
    .then((articles) => {
      const articlesRevers = articles.reverse();
      res.status(200).send(articlesRevers);
    })
    .catch(next);
  return datatArticles;
};

const postArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then((article) => {
      res.send({ article });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const articleDelete = Article.findById(req.params.articleId)
    .orFail(new NotFoundError('Такая статья не найдена'))
    .then((article) => {
      if (`${article.owner}` === `${req.user._id}`) {
        article.remove();
        res.send({ data: article });
      } else {
        throw new ForbiddenError('Вы можете удалять только карточки созданные вами!');
      }
    })
    .catch(next);
  return articleDelete;
};

module.exports = {
  getArticle,
  postArticle,
  deleteArticle,
};
