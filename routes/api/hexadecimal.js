const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const responseData = require('../../model/responseData.json');

const decToHex = (number) => {
  let hexNumber = parseInt(number, 10)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase();

  return hexNumber;
};

const createResponse = (req) => {
  const reqNumber = req.body.number;
  const hexNumber = decToHex(reqNumber);

  return { response: `${hexNumber} is the hexadecimal of ${reqNumber}` };
};

router
  .route('/')
  .post(
    //validations
    body('number', 'Please enter a number').notEmpty().isNumeric(),
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
      data: responseData.hexadecimal,
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
