'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var fiddleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  private: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    trim: true,
    default:'Needs A Name'
  },
  content: {
    type: String,
    trim: true,
    default:'Needs a Good Description'
  },
  keywords: {
    type: Array
  },
  frameworks: {
    type: String,
    default:'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">\n<script src="http://code.jquery.com/jquery-1.11.3.min.js"><\/script>\n<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"><\/script>'
  },
  js: {
    type: String,
    trim: true
  },
  css: {
    type: String,
    trim: true
  },
  html: {
    type: String,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  usereditrights: {
    type: Array
  }
});



/**
 * Statics
 */
fiddleSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username _id').exec(cb);
};

mongoose.model('fiddle', fiddleSchema);
