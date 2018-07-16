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
    const { dimension, group } = this.props

    this.chart = dc.pieChart(this.chart)

    if (!dimension || !group) return

    this.chart
      .radius(80)
      .dimension(dimension)
      .group(group)

    this.chart.render()
  }

  render() {
    return <div ref={chart => (this.chart = chart)} />
  }
}

export default PieChart
