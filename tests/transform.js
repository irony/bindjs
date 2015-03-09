'use strict';

var bind = require('../lib/bind');
var expect = require('chai').expect;
var vdocument = require('../lib/virtualDocument');

describe('transformer', function() {
  var tree, component, body;

  before(function() {
    tree = {
      ul: {
        value: [
          {
            tagName: 'li',
            value: '1',
            className: 'item'
          },
          {
            tagName: 'li',
            value: '2',
            className: 'item'
          },
          {
            tagName: 'li',
            value: '3',
            className: 'item'
          }
        ]
      }
    };

    component = {
      render: function(){
        return tree;
      }
    };

    body = vdocument.createElement('body');
    bind.init(vdocument);

    
  });

  it('should transform a simple node to a element', function() {
    var html = bind.transform({
      li: {
        value: '1'
      }
    });
    expect(html[0].innerHTML).to.eql('<li>1</li>');
  });

  it('should transform two nested nodes to one element', function() {
    var html = bind.transform({
      li: {
        value: {
          li: {
            value: 1
          }
        }
      }
    });
    expect(html[0].innerHTML).to.eql('<li><li>1</li></li>');
  });

  it('should transform a tree to html', function() {
    var html = bind.transform(tree);
    expect(html[0].innerHTML).to.eql('<ul><li class="item">1</li><li class="item">2</li><li class="item">3</li></ul>');
  });

  it('should handle render function not as a tag', function () {
    var anon = { render: function(){
      return { ul : {tagName:'li', value:'1'} };
    }};
    var dom = bind.transform(anon);
    console.log('dom', dom);
    expect(dom[0]).to.have.property('tagName');
    expect(dom[0].tagName).to.eql('ul');
    expect(dom[0].value).to.eql('1');
  });

  it('should render a component to elements', function () {
    var anon = { render: function(){
      return {li:{className: 'test', value:'1'}};
    }};
    var dom = bind.transform(anon);
    expect(dom[0]).to.have.property('tagName');
    expect(dom[0].tagName).to.eql('li');
    expect(dom[0]).to.have.property('className');
    expect(dom[0].className).to.eql('test');
    expect(dom[0].value).to.eql('1');
    
  });

  it('should render and transform a component to html', function() {
    var html = bind.transform(component);
    expect(html[0].innerHTML).to.eql('<ul><li class="item">1</li><li class="item">2</li><li class="item">3</li></ul>');
  });


  it('should render a subcomponent to elements', function () {
    var anon = { render: function(){
      return {li:{className: 'test', value:'1'}};
    }};
    var newTree = { list: anon };
    var dom = bind.transform(newTree);
    expect(dom[0]).to.have.property('children');
    expect(dom[0].children).to.have.length(1);
    expect(dom[0].children[0].className).to.eql('test');
    expect(dom[0].children[0].  value).to.eql('1');
    
  });


});