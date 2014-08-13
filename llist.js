if (typeof d3 === 'undefined') {
  throw new Error('missing d3');
}

d3.llist = function module() {

  var defaultUpdateLi = function(_selection) {
    _selection.text(function(d) { return d.toString() })
  }

  var config = {
    updateLi: defaultUpdateLi,
    onClick: function(d) { console.log("onClick not defined") },
    effectDuration: 500
  }

  var exports = function(_selection) {

    // This is because we could have more than one selection?
    _selection.each(function(_data) {

      function updateLis(_selection) {
        _selection.each(function(_data) {
          var li = d3.select(this).selectAll("li")
              .data(_data, function key(d) { return d.place; })
              
          //li.transition().duration(config.effectDuration)
          //    .call(config.updateLi)
          //    .style("opacity", 1)

          li.enter().append("li")
              .style("opacity", 1e-6)
              .call(config.updateLi)
            .transition().duration(config.effectDuration)
              .style("opacity", 1)

          // exit old lis, mark them as exiting and transition out
          li.exit()
              .classed('exiting', true)
            .transition().duration(config.effectDuration)
              .style("opacity", 1e-6)
              .remove()

          // lis with exiting class started to exit, but then re-entered
          // They won't show up in the enter selection because they already exist
          li.filter('.exiting')
              .classed('exiting', false)
              .call(config.updateLi)
            .transition().duration(config.effectDuration)
              .style("opacity", 1)

          li.order()
        })
      }

      // Select the ul element, if it exists.
      var ul = d3.select(this).selectAll("ul").data([_data])

      // Otherwise, create the empty.
      var ulEnter = ul.enter().append("ul")

      // Update elements
      var theul = d3.select(this).select("ul")
          .call(updateLis)
    })
  }


  exports.updateLi = function(_) {
    config.updateLi = _
    return exports
  }

  exports.onClick = function(_) {
    config.onClick = _
    return exports
  }

  exports.effectDuration = function(_) {
    if (!arguments.length) return config.effectDuration
    config.effectDuration = _
    return this
  }

  return exports
}