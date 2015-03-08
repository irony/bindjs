'use strict';

var bind = require('../lib/bind');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

describe('init', function () {
  var tree;

  beforeEach(function () {
    tree = {
      header : { nav : { className : 'navbar' } },
      main : { value: 'hello world!' }
    };
  });

  it('binds a component to a tree', function () {
    var div = { createElement: sinon.stub().returns({}), body : { appendChild: sinon.stub().returns({}) }};
    bind.init(div, tree);
    expect(div.createElement).have.been.calledTwice;
    expect(div.body.appendChild).have.been.calledOnce;
  });
});