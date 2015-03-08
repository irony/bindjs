'use strict';

var viewTransformer = require('./virtualDocument');

module.exports = {
  /**
   * starting point of the lib - gives a starting point in the DOM tree
   * @param  {[type]} div       - a DOM node, for example document.body
   * @param  {[type]} component - a tree or component to start render 
   */
  init: function(document, component){
    this.transformer = document;
    if (component){
      var dom = this.transform(component);
      document.body.appendChild(dom);
    }
  },

  transformer: viewTransformer,

  /**
   * Transform a tree of nodes to elements with children accordingly
   * @param  {[type]} tree [description]
   * @return {[type]}      [description]
   */
  transform: function(component){
    var tree = component;
    if (tree.render) {
      tree = component.render();
    }

    var array = tree.length && tree || Object.keys(tree).reduce(function(a,b){
      tree[b].tagName = b; a.push(tree[b]); return a; 
    }, []);

    return array.map(function(item){
      var element = this.transformer.createElement(item.tagName);
      if (typeof(item.value) === 'object') {
        var subTree = this.transform(item.value);
        subTree.map(function(child){
          element.appendChild(child); 
        });
      } else {
        element.value = item.value;
        element.className = item.className;
      }
      return element;
    }.bind(this));
  }
};