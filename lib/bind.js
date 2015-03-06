'use strict';

var bind = module.exports = {
  bind: function(div, component){
    var tree = component.render.bind(component);
    var dom = this.transform(tree);
    div.appendChild(dom);
  },

  /**
   * Transform a tree of nodes to elements with children accordingly
   * @param  {[type]} tree [description]
   * @return {[type]}      [description]
   */
  transform: function(tree){
    var array = tree.length && tree || Object.keys(tree).reduce(function(a,b){tree[b].tagName = b; a.push(tree[b]); return a; }, []);
    return array.map(function(item){
      var element = bind.createElement(item.tagName);
      if (typeof(item.value) === 'object') {
        var subTree = bind.transform(item.value);
        subTree.map(function(child){
          element.appendChild(child); 
        });
      } else {
        element.value = item.value;
        element.className = item.className;
      }
      return element;
    });
  }
};