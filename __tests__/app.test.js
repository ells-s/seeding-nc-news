const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");
const jestSorted = require('jest-sorted');


/* Set up your beforeEach & afterAll functions here */
beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: responds with all requested topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.topics)).toBe(true);
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic) => {
          expect(typeof topic.description).toBe("string");
          expect(typeof topic.slug).toBe("string");
          expect(topic.img_url).toBe("");
        });
      });
  });
  test("404: responds when URL doesn't exist", () => {
    return request(app)
      .get("/api/topicz")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: responds with the requested article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("article");
        expect(body.article[0].article_id).toBe(1);
        expect(body.article[0].title).toBe("Living in the shadow of a great man");
        expect(body.article[0].topic).toBe("mitch");
        expect(body.article[0].author).toBe("butter_bridge");
        expect(body.article[0].body).toBe("I find this existence challenging");
        expect(body.article[0].created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(body.article[0].votes).toBe(100);
        expect(body.article[0].article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
      });
  });
  test("404: responds with 404 when passed with a number not assigned to article_id", () => {
    return request(app)
      .get("/api/articles/10000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article with id 10000 Not Found");
      });
  });
  test("400: responds with 400 when passed a bad request of an invalid article_id", () => {
    return request(app)
      .get("/api/articles/string")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("GET /api/articles", () => {
  test("200: responds with all requested articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);
        expect(body.articles.length).toBe(13);
        const datesArray = [];
        body.articles.forEach((article) => {
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
          expect(article).not.toHaveProperty("body")
          datesArray.push(article.created_at)
        });
        expect(datesArray.length).toBeGreaterThan(0)
        expect(datesArray).toBeSorted({ descending: true });
      });
  });
  test("404: reponds when URL doesn't exist", () => {
    return request(app)
      .get("/api/articlez")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: responds with array of comments for the requested article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.comments)).toBe(true);
        expect(body.comments.length).toBe(11);
        const datesArray = [];
        body.comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
          datesArray.push(comment.created_at)
        });
        expect(datesArray.length).toBeGreaterThan(0)
        expect(datesArray).toBeSorted({ descending: true });
      });
  });
  test("200: responds with empty array for the requested article if it contains no comments but it a valid article id", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.comments)).toBe(true);
        expect(body.comments.length).toBe(0);
        expect(body.comments).toEqual([])
      });
  });
  test("404: responds with 404 when passed with a number not assigned to article_id", () => {
    return request(app)
      .get("/api/articles/10000/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article with id 10000 Not Found");
      });
  });
  test("400: responds with 400 when passed a bad request of an invalid article_id", () => {
    return request(app)
      .get("/api/articles/string/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201 responds with a 201 status and responds with the newly posted comment", () => {
    const commentObj = {
      username: "butter_bridge",
      body: "butter_bridge writing a comment on article with the id 1"
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(commentObj)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment.comment_id).toBe(19);
        expect(body.comment.article_id).toBe(1);
        expect(body.comment.body).toBe("butter_bridge writing a comment on article with the id 1");
        expect(body.comment.votes).toBe(0);
        expect(body.comment.author).toBe("butter_bridge");
        expect(typeof body.comment.created_at).toBe("string");
      });
  });
  test("400 responds with 400 when assigned an invalid data type", () => {
    const commentObj = {
      username: "butter_bridge",
      body: 44
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(commentObj)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("400 responds with 400 when a required key is missing", () => {
    const commentObj = {
      username: "butter_bridge"
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(commentObj)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("400: responds with 400 when passed a bad request of an invalid article_id", () => {
    const commentObj = {
      username: "butter_bridge",
      body: "butter_bridge writing a comment on article with the id string"
    };
    return request(app)
      .post("/api/articles/string/comments")
      .send(commentObj)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("404 responds with 404 when passed with a number not assigned to article_id", () => {
    const commentObj = {
      username: "butter_bridge",
      body: "butter_bridge writing a comment on article with the id 1000"
    };
    return request(app)
      .post("/api/articles/1000/comments")
      .send(commentObj)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article with id 1000 Not Found");
      });
  });
  test("404 responds with 404 when the username does not exist", () => {
    const commentObj = {
      username: "invalid_username",
      body: "writing a comment on article with the id 1"
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(commentObj)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User with username invalid_username Not Found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200 updates an articles votes and responds with the updated article when passed a positive number", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: 100 })
      .expect(200)
      .then(({ body }) => {
        expect(body.updatedArticle).toMatchObject({
          article_id: 2,
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: 100,
          article_img_url: expect.any(String)
        });
      });
  });
  test("200 updates an articles votes and responds with the updated article when passed a negative number", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: -100 })
      .expect(200)
      .then(({ body }) => {
        expect(body.updatedArticle).toMatchObject({
          article_id: 2,
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: -100,
          article_img_url: expect.any(String)
        });
      });
  });
  test("400 responds with 400 when inc_votes is assigned an invalid data type", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: "not valid" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("400 responds with 400 when patch is missing required data", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("400 responds with 400 when article_id is assigned an invalid data type", () => {
    return request(app)
      .patch("/api/articles/string")
      .send({ inc_votes: 100 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("404 responds with 404 when passed with a number not assigned to article_id", () => {
    return request(app)
      .patch("/api/articles/1000")
      .send({ inc_votes: 100 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article with id 1000 Not Found");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: deletes comment when provided with valid comment_id", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      })
      .then(() => {
        return db.query(`SELECT * FROM comments`)
      })
      .then(({ rows }) => {
        expect(rows.length).toBe(17)
      });
  });
  test("400 responds with 400 when comment_id is an invalid data type", () => {
    return request(app)
      .delete("/api/comments/string")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      })
  });
  test("404 responds with 404 when passed with a number not assigned to comment_id", () => {
    return request(app)
      .delete("/api/comments/1000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comment with id 1000 Not Found");
      })
  });
});