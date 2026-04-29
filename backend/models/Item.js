const mongoose = require('mongoose');



const ItemSchema = new mongoose.Schema({

  title: { type: String, required: true },

  description: { type: String, required: true },

  contact: { type: String, required: true },

  date: { type: Date, default: Date.now }

});



module.exports = mongoose.model('Item', ItemSchema);