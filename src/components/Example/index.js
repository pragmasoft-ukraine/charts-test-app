import React, { Component, Fragment } from 'react'
import * as d3 from 'd3'
import crossfilter from 'crossfilter2'
import * as dc from 'dc'

class ExampleChart extends Component {
  componentDidMount() {
    this.onUpdate()
  }

  componentDidUpdate() {
    this.onUpdate()
  }

  onUpdate = async () => {
    this.focusChart =  dc.seriesChart(this.focusChart)
    this.overviewChart =  dc.seriesChart(this.overviewChart)
    const focusChart = this.focusChart
    const overviewChart = this.overviewChart

    var ndx, runDimension, runGroup, overviewRunDimension, overviewRunGroup
    const experiments = await d3.csv('morley.csv')
    ndx = crossfilter(experiments)
    runDimension = ndx.dimension(function(d) {
      return [+d.Expt, +d.Run]
    })
    overviewRunDimension = ndx.dimension(function(d) {
      return [+d.Expt, +d.Run]
    })
    runGroup = runDimension.group().reduceSum(function(d) {
      return +d.Speed
    })
    overviewRunGroup = overviewRunDimension.group().reduceSum(function(d) {
      return +d.Speed
    })

    focusChart
      .width(768)
      .height(480)
      .chart(function(c) {
        return dc
          .lineChart(c)
          .curve(d3.curveCardinal)
          .evadeDomainFilter(true)
      })
      .x(d3.scaleLinear().domain([0, 20]))
      .brushOn(false)
      .yAxisLabel('Measured Speed km/s')
      .yAxisPadding('5%')
      .xAxisLabel('Run')
      .elasticY(true)
      .dimension(runDimension)
      .group(runGroup)
      .mouseZoomable(true)
      .rangeChart(overviewChart)
      .seriesAccessor(function(d) {
        return 'Expt: ' + d.key[0]
      })
      .keyAccessor(function(d) {
        return +d.key[1]
      })
      .valueAccessor(function(d) {
        return +d.value - 500
      })
      .legend(
        dc
          .legend()
          .x(350)
          .y(350)
          .itemHeight(13)
          .gap(5)
          .horizontal(1)
          .legendWidth(140)
          .itemWidth(70)
      )
    focusChart.yAxis().tickFormat(function(d) {
      return d3.format(',d')(d + 299500)
    })
    focusChart.margins().left += 40

    overviewChart
      .width(768)
      .height(100)
      .chart(function(c) {
        return dc.lineChart(c).curve(d3.curveCardinal)
      })
      .x(d3.scaleLinear().domain([0, 20]))
      .brushOn(true)
      .xAxisLabel('Run')
      .clipPadding(10)
      .dimension(runDimension)
      .group(runGroup)
      .seriesAccessor(function(d) {
        return 'Expt: ' + d.key[0]
      })
      .keyAccessor(function(d) {
        return +d.key[1]
      })
      .valueAccessor(function(d) {
        return +d.value - 500
      })
    dc.renderAll()
  }

  render() {
    return (
      <Fragment>
        <div ref={focusChart => (this.focusChart = focusChart)} />
        <div ref={overviewChart => (this.overviewChart = overviewChart)} />
      </Fragment>
    )
  }
}

export default ExampleChart
