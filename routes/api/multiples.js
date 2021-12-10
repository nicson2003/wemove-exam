const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const responseData = require('../../model/responseData.json');

const checkMultiples = (number = 0, chk = 0) => {
  return number % chk === 0;
};

const createResponse = (req) => {
  const reqNumber = req.body.number;
  const byThree = checkMultiples(reqNumber, 3);
  const byFive = checkMultiples(reqNumber, 5);
  const retValue = ['FizzBuzz', 'Fizz', 'Buzz'];

  if (byThree && byFive) {
    return { response: retValue[0] };
  } else if (byThree) {
    return { response: retValue[1] };
  } else if (byFive) {
    return { response: retValue[2] };
  } else {
    return { response: reqNumber };
  }
};

router
  .route('/')
  .post(
    //validations
    body('number', 'Please enter a number').notEmpty().isNumeric(),
    body('number', 'Should be 1 to 100 only')
      .notEmpty()
      .isNumeric()
      .custom((value) => value > 1 && value <= 100),
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
      data: responseData.multiples,
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
