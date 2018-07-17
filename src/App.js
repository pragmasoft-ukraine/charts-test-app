import React, { Component, Fragment } from 'react'
import * as d3 from 'd3'
import crossfilter from 'crossfilter2'
import { getDateOfISOWeek } from './helpers'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'

class App extends Component {
  state = {
    groupParameter: 'markdown' // markdown || revenues || margin
  }

  async componentDidMount() {
    const data = await d3.csv('data.csv', d => ({
      itemCode: d.Item_code,
      itemCategory: d.item_category,
      date: getDateOfISOWeek(d.week_ref, d.year_ref),
      week: +d.week_ref,
      markdown: +d.markdown,
      revenues: +d.revenues,
      margin: +d.margin
    }))

    console.log(data)

    const ndx = crossfilter(data)
    console.log('ndx', ndx)
    console.log('ndx.all()', ndx.all())

    this.setState({ data, ndx })
  }

  render() {
    const { ndx, groupParameter } = this.state
    return (
      <Fragment>
        <PieChart ndx={ndx} groupParameter={groupParameter}/>
        <LineChart ndx={ndx} groupParameter={groupParameter} />
      </Fragment>
    )
  }
}

export default App
