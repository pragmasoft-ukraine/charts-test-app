import React, { Component } from 'react'
import dc from 'dc'

class PieChart extends Component {
  componentDidMount() {
    this.onUpdate()
  }

  componentDidUpdate() {
    this.onUpdate()
  }

  onUpdate = () => {
    const { ndx, groupParameter } = this.props

    if (!ndx) return

    const dimension = ndx.dimension(d => d.itemCategory)
    console.log('PieChart dimension', dimension)

    const group = dimension.group().reduceSum(d => d[groupParameter])

    console.log('PieChart group', group)
    console.log('PieChart group.all()', group.all())

    this.chart = dc.pieChart(this.chart)

    this.chart
      .width(768)
      .height(480)
      .dimension(dimension)
      .group(group)
      .legend(dc.legend())
    // .on('pretransition', function(chart) {
    //   chart.selectAll('text.pie-slice').text(function(d) {
    //     return d.data.key + ' ' + dc.utils.printSingleValue(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100) + '%'
    //   })
    // })

    this.chart.render()
  }

  render() {
    return <div ref={chart => (this.chart = chart)} />
  }
}

export default PieChart
