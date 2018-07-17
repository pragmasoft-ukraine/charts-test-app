import React, { Component } from 'react'
import dc from 'dc'
import * as d3 from 'd3'

class LineChart extends Component {
  componentDidMount() {
    this.onUpdate()
  }

  componentDidUpdate() {
    this.onUpdate()
  }

  onUpdate = () => {
    const { ndx, groupParameter } = this.props

    if (!ndx) return

    const dimension = ndx.dimension(d => [d.itemCategory, d.week])
    console.log('LineChart dimension', dimension)

    const group = dimension.group().reduceSum(d => d[groupParameter])

    console.log('LineChart group', group)
    console.log('LineChart group.all()', group.all())

    this.chart = dc.seriesChart(this.chart)

    this.chart
      .width(768)
      .height(480)
      .chart(c =>
        dc
          .lineChart(c)
          .curve(d3.curveCardinal)
          // .evadeDomainFilter(true)
      )
      .x(d3.scaleLinear().domain([27, 38]))
      .brushOn(true) // false
      .yAxisLabel(groupParameter)
      // .yAxisPadding('5%')
      .xAxisLabel('Week')
      .clipPadding(10)
      // .elasticY(true)
      .dimension(dimension)
      .group(group)
      .mouseZoomable(true)
      // .rangeChart(overviewChart)
      .seriesAccessor(d => d.key[0])
      .keyAccessor(d => d.key[1])
      .valueAccessor(d => d.value)
      .legend(
        dc
          .legend()
          // .x(350)
          // .y(350)
          .itemHeight(13)
          // .gap(5)
          .horizontal(1)
          .legendWidth(140)
          .itemWidth(70)
      )

    this.chart.margins().left += 180
    console.log("append", this.chart)
    this.chart.render()
  }

  render() {
    return <div ref={chart => (this.chart = chart)} />
  }
}

export default LineChart
