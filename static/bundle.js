(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/cln/src/pet/bind/app.js":[function(require,module,exports){
'use strict';
var bind = require('./lib/bind');
var header = require('./partials/header');
var main = require('./partials/main');

module.exports = function(div) {

  bind.init(div, {
    header: header,
    container: main
  });

}(document);
},{"./lib/bind":"/Users/cln/src/pet/bind/lib/bind.js","./partials/header":"/Users/cln/src/pet/bind/partials/header.js","./partials/main":"/Users/cln/src/pet/bind/partials/main.js"}],"/Users/cln/src/pet/bind/lib/bind.js":[function(require,module,exports){
'use strict';

var bind = module.exports = {
  /**
   * starting point of the lib - gives a starting point in the DOM tree
   * @param  {[type]} div       - a DOM node, for example document.body
   * @param  {[type]} component - a tree or component to start render 
   */
  init: function(document, component){
    this.document = document;
    var dom = this.transform(component);
    document.body.appendChild(dom);
  },

  document: null,

  /**
   * Transform a tree of nodes to elements with children accordingly
   * @param  {[type]} tree [description]
   * @return {[type]}      [description]
   */
  transform: function(component){
    var tree = component;
    if (tree.render) {
      tree = component.render();
    }

    var array = tree.length && tree || Object.keys(tree).reduce(function(a,b){
      tree[b].tagName = b; a.push(tree[b]); return a; 
    }, []);

    return array.map(function(item){
      var element = bind.document.createElement(item.tagName);
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
},{}],"/Users/cln/src/pet/bind/partials/header.js":[function(require,module,exports){
'use strict';

module.exports = {
  render: function(){
    return { 
      nav : { className: 'navbar' }
    };
  }
};
},{}],"/Users/cln/src/pet/bind/partials/items.js":[function(require,module,exports){
'use strict';

var data = [
  {
    id: 1,
    due: '2014-03-02',
    done: true,
    name: 'Buy milk',
    responsible: 'Christian'
  },
  {
    id: 2,
    due: '2014-03-02',
    done: false,
    name: 'Set the table',
    responsible: 'Christian'
  }
];

module.exports = {
  state: data,
  handleClick: function(e){
    e.target.data.done = !e.target.data.done;
  },
  render: function(){
    return data.map(function(item){
      return {
        li: {className: 'item', data: item, onClick: this.handleClick, value: item.name}
      };
    });
  }
};
},{}],"/Users/cln/src/pet/bind/partials/main.js":[function(require,module,exports){
'use strict';
var items = require('./items');

module.exports = {
  render: function(){
    return { 
      div : { className: 'jumbotron', value: {
        h1: { value: 'Welcome to bind.js' },
        ul: items
      }}
    };
  }
};
},{"./items":"/Users/cln/src/pet/bind/partials/items.js"}]},{},["/Users/cln/src/pet/bind/app.js"]);