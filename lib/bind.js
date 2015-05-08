'use strict';

var viewcontext = require('./virtualDocument');

module.exports = {
  /**
   * starting point of the lib - gives a starting point in the DOM tree
   * @param  {[type]} div       - a DOM node, for example document.body
   * @param  {[type]} component - a tree or component to start render 
   */
  init: function(document, component){
    this.context = document;
    if (component){
      var dom = this.transform(component);
      document.body.appendChild(dom[0]);
    }
  },

  context: viewcontext,

  expand: function(component){
    if (component.render) {
      component.render.bind(component);
      component = component.render();
      if (Object.keys(component).length !== 1){
        throw new Error('Root node is required');
      }
      return this.expand(component);
    }


    return component.length && component || Object.keys(component).reduce(function(a,b){

      if (typeof(component[b]) === 'string') {
        var value = component[b];
        component[b] = { value : value };
      }
      component[b].tagName = b;
      a.push(component[b]);
      return a; 
    }.bind(this), []).map(function(node){
      if (node.render) { 
        node.value = this.expand(node);
      }
      return node;
    }.bind(this));
  },

  /**
   * Transform a tree of nodes to DOM-elements with children accordingly using methods createElement on context and appendChild
   * @param  {[type]} tree [description]
   * @return {[type]}      [description]
   */
  transform: function(component){
    var tree = this.expand(component);
    var transformNode = function(node){
      var element = this.context.createElement(node.tagName);
      if (typeof(node.value) === 'object') {
        var subTree = this.transform(node.value || node);
        subTree.map(function(child){
          element.appendChild(child); 
        });
      } else {
        element.value = node.value;
        element.innerText = node.value;
        element.className = node.className;
      }
      return element;
    }.bind(this);

    if (!tree.map) {
      console.log(JSON.stringify(tree), 'tree');
    }
    return tree.map(transformNode);
  }
};