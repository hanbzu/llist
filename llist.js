function llist(params) {

  var updateLi = function(selection) {
        selection
          .text(function(d) { return d.place + ' ' + d.price + '€' })
        return selection
      },
      onclick = function(_) { console.log("onUpdate not defined") },
      effectDuration = 500

  function list(selection) {

    // This is because we could have more than one selection?
    selection.each(function(data) {

      // Select the ul element, if it exists.
      var ul = d3.select(this).selectAll("ul").data([data])

      // Otherwise, create the empty.
      var ulEnter = ul.enter().append("ul")

      // Update elements
      var theul = d3.select(this).select("ul")
          .call(updateLis)
    })
  }

  function updateLis(selection) {
    selection.each(function(data) {
      var li = d3.select(this).selectAll("li")
          .data(data, function key(d) { return d.place; })
          
      li.transition().delay(1000)
          .duration(effectDuration)
          .call(updateLi)

      li.enter().append("li")
          .style("opacity", 1e-6)
          .call(updateLi)
        .transition()
          .duration(effectDuration)
          .style("opacity", 1)

      li.exit()
        .transition()
          .duration(effectDuration)
          .style("opacity", 1e-6)
          .remove()

      li.order()
    })
  }

  list.onUpdate = function(_) {
    if (!arguments.length) return trim
    onUpdate = _
    return list
  }

  return list
}