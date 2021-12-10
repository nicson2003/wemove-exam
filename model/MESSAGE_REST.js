const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageRestSchema = new Schema({
  CONVERSATION_ID: {
    type: String,
    required: true,
  },
  MESSAGE: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('messageRest', messageRestSchema);
