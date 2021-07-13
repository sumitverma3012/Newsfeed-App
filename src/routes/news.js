const express = require("express");
const newsRouter = express.Router();
const axios = require("axios");

const API_URL = "https://raddy.co.uk/wp-json/wp/v2/posts";

newsRouter.get("", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.render("news", {
      articles: response.data,
    });
  } catch (err) {
    if (err.response) {
      const { data, status, headers } = err.response;
      console.log(`${data} - ${status} - ${headers}`);
    } else {
      console.log("Error", err);
    }
    res.render("news", { articles: null });
  }
});

newsRouter.get('/:id', async(req, res) => {
    let articleId = req.params.id;
    console.log('=====>', articleId)
    try {
        const response = await axios.get(API_URL + `/${articleId}`);
        res.render("newsSingle", {
          article: response.data,
        });
      } catch (err) {
        if (err.response) {
          const { data, status, headers } = err.response;
          console.log(`${data} - ${status} - ${headers}`);
        } else {
          console.log("Error", err);
        }
        res.render("newsSingle", { article: null });
      }

})

newsRouter.post('', async(req, res) => {
    let search = req.body.search;

    try {
        const response = await axios.get(API_URL + `?search=${search}`);
        res.render("newsSearch", {
          articles: response.data,
        });
      } catch (err) {
        if (err.response) {
          const { data, status, headers } = err.response;
          console.log(`${data} - ${status} - ${headers}`);
        } else {
          console.log("Error", err);
        }
        res.render("newsSearch", { articles: null });
      }

})

module.exports = newsRouter;
