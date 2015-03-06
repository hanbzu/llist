var d3 = require('d3'),
    llist = require('../src/llist')

function key(d) {
  return d.place
}

function sortList(a, b) {
  if (a.place > b.place) return 1
  if (a.place < b.place) return -1
  return 0
}

var theList = llist()
      .updateItem(function(selection) {
        selection.selectAll("*").remove()
        selection.append('h1').text((function(d) { return d.place }))
        selection.append('p').text((function(d) { return 'Now selling at ' + d.price + ' cents!' }))
      })
      .mouseoverCallback(function(e, d) { })
      .mouseoutCallback(function(e, d) { })
      .clickCallback(function(e, d) {
        console.log('CALLBACK! ', d)
        e.classed('pepito', true)
      })
      .key(function(d) { return d.place })

var example_data = [
  { place: "Apple", price: 29.32 },
  { place: "Watermelon", price: 9.45 },
  { place: "Banana", price: 51.63 },
  { place: "Grape", price: 41.75 },
  { place: "Peach", price: 12.10 },
  { place: "Kiwi", price: 73 }
].sort(sortList)

d3.select('#list').datum(example_data).call(theList)

function modify() {
  
  console.log("Auch!")

  var example_data2 = [
    { place: "Ananas", price: 29.32 },
    { place: "Strawberry", price: 65.4 },
    { place: "Avocado", price: 12.10 },
    { place: "Banana", price: 26.10 },
    { place: "Grape", price: 41.75 },
    { place: "Kiwi", price: 73 },
    { place: "Pine", price: 45.5 }
  ].sort(sortList)

  d3.select('#list').datum(example_data2).call(theList)
}

setTimeout(modify, 3000)

module.exports = {
  modify: modify
}