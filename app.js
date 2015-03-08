'use strict';
var bind = require('./lib/bind');
var header = require('./partials/header');
var main = require('./partials/main');

module.exports = function(div) {

  bind.init(div, {
    header: header,
    container: main
  });

}(document);