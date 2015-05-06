'use strict';
var items = require('./items');

module.exports = {
  render: function(){
    return { 
      div : { className: 'jumbotron', value: {
        h1: { value: 'Welcome to bind.js' },
        ul: items
      }}
    };
  }
};