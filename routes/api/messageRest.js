const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
//const Model = require('../../model/SAMPLE_REST.js'); use static response only

const responseData = require('../../model/data.json');

/*
const createResponse = (req) => {
  const reqKeys = req && req?.message?.split(',')[0]?.toLowerCase();
  const resKeys = responseData?.response;

  const responseMessage =
    resKeys?.find((rec, index) => {
      return rec['key']?.some((i) => i === reqKeys) ? rec : null;
    }, []) || resKeys[2];

  return {
    response_id: req.conversation_id,
    response: responseMessage?.message,
  };
};
*/

router
  .route('/')
  /*
  .post(
    //validations
    body('conversation_id').not().isEmpty(),
    body('conversation_id').isAlphanumeric(),
    body('message').not().isEmpty(),
    body('message').custom((value) => value.includes(',')),

    function (req, res) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        res.json({
          data: 'test response', //createResponse(req.body),
          message: 'success',
        });
      }
    }
  )
  */
  .get(function (req, res) {
    res.json({
      data: responseData,
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
