if (typeof d3 === 'undefined') {
  throw new Error('missing d3');
}

d3.llist = function module() {

  // But it could be, for example 'd.name'
  var defaultUpdateLi = function(_selection) {
    _selection.text(function(d) { return d.toString() })
  }

  var config = {
    key: function(d) { return d.toString() }, // But it could be, for example 'd.id'
    updateLi: defaultUpdateLi,
    onClick: function(d) { console.log('onClick not defined', d) },
    effectDuration: 200
  }

  var ul // Initialise the root ul as undefined

  var exports = function(_selection) {

    // This is because we could have more than one selection?
    _selection.each(function(_data) {

      function updateLis(_selection) {
        _selection.each(function(_data) {

          var li = d3.select(this).selectAll('li')
              .data(_data, config.key)

          li.enter().append('li')
              .style('opacity', 1e-6)
              .call(config.updateLi)
            .transition().duration(config.effectDuration)
              .style('opacity', 1)
              .style('opacity', null)

          // exit old lis, mark them as exiting and transition out
          li.exit()
              .classed('exiting', true)
            .transition().duration(config.effectDuration)
              .style('opacity', 1e-6)
              .remove()

          // lis with exiting class started to exit, but then re-entered
          // They won't show up in the enter selection because they already exist
          li.filter('.exiting')
              .classed('exiting', false)
              .call(config.updateLi)
            .transition().duration(config.effectDuration)
              .style('opacity', 1)
              .style('opacity', null)

          // Re-inserts elements into the document such that
          // the document order matches the selection order
          li.order()
        })
      }

      if (!ul) // Create the root ul if it's not there yet
        ul = d3.select(this)
          .append('ul').classed('llist', true)

      // Update elements
      var theul = d3.select(this).select('ul')
          .call(updateLis)
    })
  }

  // Updates the key function, used to tell apart list elements
  exports.key = function(_) {
    config.key = _
    return exports
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