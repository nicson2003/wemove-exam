const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const responseData = require('../../model/responseData.json');

const getPermutation = (str) => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          getPermutation(str.slice(0, i) + str.slice(i + 1)).map(
            (val) => letter + val
          )
        ),
      []
    );
};

const createResponse = (req) => {
  const reqWord = req.body.word;
  const permutationWords = getPermutation(reqWord);

  return {
    response: `[${permutationWords}] are possible permutations of ${reqWord}`,
  };
};

router
  .route('/')
  .post(
    //validations
    body('word', 'Please enter a word').notEmpty(),
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        res.json({
          data: createResponse(req),
          message: 'success',
        });
      }
    }
  )
  .get(function (req, res) {
    res.json({
      data: responseData.permutation,
      message: 'success',
    });
  });

router
  .route('/:id')
  .get(function (req, res) {
    res.json({
      data: 'sample get by ID',
      message: 'success',
    });
  })
  .put(function (req, res) {
    res.json({
      data: 'sample put',
      message: 'success',
    });
  })
  .patch(function (req, res) {
    res.json({
      data: 'sample patch',
      message: 'success',
    });
  })
  .delete(function (req, res) {
    res.json({
      data: 'sample delete',
      message: 'success',
    });
  });

module.exports = router;
