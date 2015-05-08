'use strict';

module.exports = {
  body: {},
  createElement: function(tagName) {
    var element = {
      tagName: tagName,
      appendChild: function(childElement) {
        element.children = (element.children || []);
        element.children.push(childElement);
      },
      value: '',
      get innerHTML() {
        var inner = element.value;
        if (element.children && element.children.length) {
          var childElements = element.children.map(function(childElement) {
            return childElement.innerHTML;
          });
          inner += childElements.join('');
        }
        var props = Object.keys(element).map(function(prop){
          console.log('prop', prop)
          tagName = prop;
          switch(prop){
            case 'className': tagName = 'class';
          }
          return tagName + '="' + element[prop] + '"';
        }).filter(function(a){ return a}).join(' ');
        return '<' + element.tagName + (props && ' ' + props ||  '') + '>' + (inner) + '</' + element.tagName + '>';
      }
    };
    return element;
  }
};