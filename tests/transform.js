'use strict';

var bind = require('../lib/bind');
var expect = require('chai').expect;

describe('transformer', function () {
  var tree;

  before(function () {
    tree = {
      ul: {
        value : [
          { tagName: 'li', value: '1', className: 'item' },
          { tagName: 'li', value: '2', className: 'item' },
          { tagName: 'li', value: '3', className: 'item' }
        ]
      }
    };
    bind.createElement = function(tagName){
      var element = {
        tagName: tagName,
        appendChild: function(childElement){
          element.children = (element.children || []);
          element.children.push(childElement);
        },
        value: '',
        get innerHTML() {
          var inner = element.value;
          if (element.children && element.children.length) {
            var childElements = element.children.map(function(childElement){ return childElement.innerHTML; });
            console.log('children', JSON.stringify(childElements, null, 2));
            inner += childElements.join('');
          }
          var props = '';
          if (element.className) {
            props+= ' class="' + element.className + '"';
          }
          return '<' + element.tagName + props + '>' + (inner) + '</' + element.tagName + '>'; 
        }
      };
      return element;
    };
  });

  it('should transform a simple node to a element', function () {
    var html = bind.transform({li:{value:'1'}});
    expect(html[0].innerHTML).to.eql('<li>1</li>');
  });

 it('should transform two nested nodes to one element', function () {
    var html = bind.transform({li:{value:{li:{value:1}}}});
    expect(html[0].innerHTML).to.eql('<li><li>1</li></li>');
  });

  it('should transform a tree to html', function () {
    var html = bind.transform(tree);
    expect(html[0].innerHTML).to.eql('<ul><li class="item">1</li><li class="item">2</li><li class="item">3</li></ul>');
  });

});