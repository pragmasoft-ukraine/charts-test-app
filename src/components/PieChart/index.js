import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dc from 'dc'
import * as d3 from 'd3'

class PieChart extends Component {
  componentDidMount() {
    this.onUpdate()
  }

  componentDidUpdate() {
    console.log('PieChart did update')
    this.onUpdate()
  }

  pretransitionHandler = chart => {
    chart.selectAll('text.pie-slice').text(function(d) {
      const percent = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
      return percent >= 7 ? d.data.key + ' ' + dc.utils.printSingleValue(percent) + '%' : percent < 2 ? '' : d.data.key
    })
  }

  onUpdate = () => {
    const { ndx, groupParameter } = this.props

    if (!ndx) return

    const dimension = ndx.dimension(d => d.itemCategory)
    const group = dimension.group().reduceSum(d => d[groupParameter])

    console.log('PieChart group.all()', group.all())

    this.chart = dc.pieChart(this.chart)

    this.chart
      .width(768)
      .height(480)
      // .useViewBoxResizing(true)
      .dimension(dimension)
      .group(group)
      .colors(d3.interpolateRainbow)
      .colorAccessor((d, i) => i / 18) // eslint-disable-line no-unused-vars

      .legend(dc.legend())
      .on('pretransition', this.pretransitionHandler)

    this.chart.render()
  }

  render() {
    return <div ref={chart => (this.chart = chart)} />
  }
}

PieChart.propTypes = {
  ndx: PropTypes.object,
  groupParameter: PropTypes.string.isRequired
}

export default PieChart
