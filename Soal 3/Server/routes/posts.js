const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const connection = require("../config/database");

router.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM posts ORDER BY id desc",
    function (err, posts) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "OK",
          data: posts,
        });
      }
    }
  );
});

router.post(
  "/store",
  [body("title").notEmpty(), body("content").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    connection.query(
      "INSERT INTO posts SET ?",
      formData,
      function (err, posts) {
        console.log(err);
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server Error",
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Insert Success",
            data: posts[0],
          });
        }
      }
    );
  }
);

router.get("/(:id)", function (req, res) {
  let id = req.params.id;

  connection.query(
    `SELECT * FROM posts WHERE id =  + ${id}`,
    function (err, posts) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      }

      if (posts.length <= 0) {
        return res.status(404).json({
          status: false,
          message: "Data Not Found",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Detail",
          data: posts[0],
        });
      }
    }
  );
});

router.patch(
  "/update/:id",
  [body("title").notEmpty(), body("content").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    let id = req.params.id;

    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    connection.query(
      `UPDATE posts SET ? WHERE id = ${id}`,
      formData,
      function (err, posts) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server Error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Updated Successfully",
          });
        }
      }
    );
  }
);

router.delete("/delete/(:id)", function (req, res) {
  let id = req.params.id;

  connection.query(`DELETE FROM posts WHERE id = ${id}`, function (err, posts) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Delete Success",
      });
    }
  });
});

module.exports = router;
