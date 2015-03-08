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
        var props = '';
        if (element.className) {
          props += ' class="' + element.className + '"';
        }
        return '<' + element.tagName + props + '>' + (inner) + '</' + element.tagName + '>';
      }
    };
    return element;
  }
};