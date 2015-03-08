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