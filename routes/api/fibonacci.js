const { areIntervalsOverlapping } = require('date-fns');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const responseData = require('../../model/responseData.json');

const findFib = (limit = 1, opt = 0) => {
  //opt = 0 for even numbers, opt = 1 for odd numbers
  let prevNumber = 0,
    currentNumber = 1,
    evenSum = 0,
    oddSum = 0,
    nextNumber;

  while (currentNumber <= limit) {
    nextNumber = currentNumber + prevNumber;
    prevNumber = currentNumber;

    if (currentNumber % 2 === 0) {
      evenSum += currentNumber;
    } else {
      oddSum += currentNumber;
    }

    currentNumber = nextNumber;
  }

  return opt ? oddSum : evenSum;
};

const createResponse = (req) => {
  const reqNumber = req.body.number;
  const fibNumber = findFib(reqNumber);

  return {
    response: `${fibNumber} is the sum of the even-valued fibonacci terms below ${reqNumber}`,
  };
};

router
  .route('/')
  .post(
    //validations
    body('number', 'Please enter a number from 1 - 100 only')
      .notEmpty()
      .isNumeric()
      .custom((value) => value >= 1 && value <= 100),
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
      data: responseData.fibonacci,
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
