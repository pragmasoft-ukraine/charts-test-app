import React, { Component, Fragment } from 'react'
import * as d3 from 'd3'
import crossfilter from 'crossfilter2'
import { getDateOfISOWeek } from './helpers'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'

class App extends Component {
  state = {}

  selectDimension = (ndx, by) => ndx.dimension(d => d[by])

  async componentDidMount() {
    const data = await d3.csv('data.csv', d => ({
      itemCode: d.Item_code,
      itemCategory: d.item_category,
      date: getDateOfISOWeek(d.week_ref, d.year_ref),
      markdown: +d.markdown,
      revenues: +d.revenues,
      margin: +d.margin
    }))

    console.log(data)

    const ndx = crossfilter(data)
    console.log(ndx)

    const dimension = this.selectDimension(ndx, 'markdown')
    console.log(dimension)

    const group = dimension.group()

    this.setState({ data, ndx, dimension, group })
  }

  render() {
    const { dimension, group } = this.state
    return (
      <Fragment>
        <PieChart dimension={dimension} group={group} />
        <LineChart dimension={dimension} group={group} />
      </Fragment>
    )
  }
}

export default App
