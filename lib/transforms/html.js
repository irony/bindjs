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

        // get all children's html
        if (element.children && element.children.length) {
          var childElements = element.children.map(function(childElement) {
            return childElement.innerHTML;
          });
          inner += childElements.join('');
        }

        // render all properties
        var props = Object.keys(element).map(function(prop){
          switch(prop){
            case 'innerHTML': return;
            case 'innerText': return;
            case 'value': return; // Bug, change spec to use children instead
            case 'tagName': return;
            case 'className':
              return 'class="' + element.className + '"';
          }
          var value = element[prop];
          if (typeof value !== 'string' || !value) { return; }
          return prop + '="' + value + '"';
        }).filter(function(a){ return a; }).join(' ');
        return '<' + element.tagName + (props && ' ' + props ||  '') + '>' + (inner) + '</' + element.tagName + '>';
      }
    };
    return element;
  }
};