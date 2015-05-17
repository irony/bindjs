'use strict';
var bind = require('../');
var header = require('./partials/header');
var main = require('./partials/main');

module.exports = function(div) {

  bind.init(div, { 
    app: {
      value : [
        header,
        main
      ]
    }
  });

}(document.body);