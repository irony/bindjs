'use strict';

module.exports = {
  bind: function(div, component){
    var tree = component.render.bind(component);
    div.innerHTML = Object.keys(tree).map(this.transform.bind(div.document));
  },
  transform: function(item){
    return this.createElement(item);
  }
};