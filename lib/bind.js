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
      component[b].tagName = b;
      if (component[b].render) { 
        component[b].children = this.expand(component[b]);
      }
      a.push(component[b]);
      return a; 
    }.bind(this), []);
  },

  /**
   * Transform a tree of nodes to elements with children accordingly
   * @param  {[type]} tree [description]
   * @return {[type]}      [description]
   */
  transform: function(component){
    var tree = this.expand(component);

    return tree.map(function(item){
      
      var element = this.context.createElement(item.tagName);
      if (typeof(item.value) !== 'string') {
        var subTree = this.transform(item.value || item);
        subTree.map(function(child){
          element.appendChild(child); 
        });
      } else {
        element.value = item.value;
        element.innerText = item.value;
        element.className = item.className;
      }
      return element;
    }.bind(this));
  }
};