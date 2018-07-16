import React, { Component } from 'react'
import dc from 'dc'

class LineChart extends Component {
  componentDidMount() {
    this.chart = dc.lineChart(this.chart)
    // this.chart.render()
  }

  render() {
    return <div ref={chart => (this.chart = chart)} />
  }
}

export default LineChart
