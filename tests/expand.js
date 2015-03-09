'use strict';

var bind = require('../lib/bind');
var expect = require('chai').expect;

describe('expand', function() {

  it('should expand a render function to a tree', function () {
    var anon = { render: function(){
      return {li: {value:'1'}};
    }};
    var tree = bind.expand(anon);
    expect(tree[0]).to.have.property('tagName');
    expect(tree[0].tagName).to.eql('li');
    expect(tree[0].value).to.eql('1');
  });

  it('should expand a nested component to tree', function () {
    var anon = { render: function(){
      return {li:{className: 'test', value:'1'}};
    }};
    var tree = bind.expand(anon);
    expect(tree[0], JSON.stringify(tree[0])).to.have.property('tagName');
    expect(tree[0].tagName, JSON.stringify(tree[0])).to.eql('li');
    expect(tree[0]).to.have.property('className');
    expect(tree[0].className).to.eql('test');
    expect(tree[0].value).to.eql('1');
    
  });

  it('should render a subcomponent to elements', function () {
    var anon = { render: function(){
      return {li:{className: 'test', value:'1'}};
    }};
    var newTree = { ul: anon };
    var tree = bind.expand(newTree);
    expect(tree[0], JSON.stringify(tree)).to.have.property('value');
    expect(tree[0].value).to.have.length(1);
    expect(tree[0].value[0].className).to.eql('test');
    expect(tree[0].value[0].  value).to.eql('1');
    
  });


});