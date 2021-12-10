const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const responseData = require('../../model/responseData.json');

const checkPalindrome = (number) => {
  return number.toString() === number.toString().split('').reverse().join('');
};

const createResponse = (req) => {
  const reqNumber = req.body.number;

  if (checkPalindrome(reqNumber)) {
    return { response: `${reqNumber} is Palindrome` };
  } else {
    return { response: `${reqNumber} is Not Palindrome` };
  }
};

router
  .route('/')
  .post(
    //validations
    body('number', 'Please enter a number').notEmpty().isNumeric(),
    body('number', 'Should be 1000 to 9999 only')
      .notEmpty()
      .isNumeric()
      .custom((value) => value > 1000 && value <= 9999),
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
      data: responseData.palindrome,
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
