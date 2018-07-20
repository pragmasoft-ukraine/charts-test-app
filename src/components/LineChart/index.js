import React, { Component, Fragment } from 'react'
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

    if (!ndx || !groupParameter) return

    const dimension = ndx.dimension(d => [d.itemCategory, d.week])
    console.log('LineChart dimension', dimension)

    const group = dimension.group().reduceSum(d => d[groupParameter])

    console.log('LineChart group', group)
    console.log('LineChart group.all()', group.all())

    this.chart = dc.seriesChart(this.chart)
    // this.overviewChart = dc.seriesChart(this.overviewChart)

    this.chart
      .width(768)
      .height(480)
      .chart(c =>
        dc
          .lineChart(c)
          .curve(d3.curveCardinal)
          .filterHandler(filterHandler)
      )
      .x(d3.scaleLinear().domain([27, 38]))
      .brushOn(true)
      .yAxisLabel(groupParameter)
      .yAxisPadding('5%')
      .xAxisLabel('Week')
      .elasticY(true)
      .dimension(dimension)
      .group(group)
      .mouseZoomable(true)
      // .rangeChart(this.overviewChart)
      .seriesAccessor(d => d.key[0])
      .keyAccessor(d => d.key[1])
      .valueAccessor(d => d.value)
      .legend(
        dc
          .legend()
          // .x(350)
          // .y(350)
          .itemHeight(13)
          .gap(5)
          .horizontal(1)
          .legendWidth(140)
          .itemWidth(70)
      )

    this.chart.filterHandler(filterHandler)

    function filterHandler(dimensions, filters) {
      if (filters.length === 0) {
        dimension.filter(null)
      } else {
        var filter = dc.filters.RangedFilter(filters[0][0], filters[0][1])
        dimension.filterFunction(function(k) {
          return filter.isFiltered(k[1])
        })
      }
      return filters
    }

    this.chart.margins().left += 100

    // this.overviewChart
    //   .width(768)
    //   .height(100)
    //   .chart(c => dc.lineChart(c).curve(d3.curveCardinal))
    //   .x(d3.scaleLinear().domain([27, 38]))
    //   .brushOn(true)
    //   .xAxisLabel('Week')
    //   .clipPadding(10)
    //   .dimension(dimension)
    //   .group(group)
    //   .seriesAccessor(d => d.key[0])
    //   .keyAccessor(d => d.key[1])
    //   .valueAccessor(d => d.value)

    this.chart.render()
    // this.overviewChart.render()
  }

  render() {
    return (
      <Fragment>
        <div ref={chart => (this.chart = chart)} />
        {/* <div ref={overviewChart => (this.overviewChart = overviewChart)} /> */}
      </Fragment>
    )
  }
}

export default LineChart
