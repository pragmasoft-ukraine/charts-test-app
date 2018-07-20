import React, { Component } from 'react'
import * as d3 from 'd3'
import dc from 'dc'
import crossfilter from 'crossfilter2'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { getDateOfISOWeek } from './helpers'
import SeriesLineChart from './components/SeriesLineChart'
import PieChart from './components/PieChart'
import DataCount from './components/DataCount'
import ParamSelect from './components/ParamSelect'
import Header from './components/Header'

dc.config.defaultColors(d3.schemeCategory10)

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  main: {
    marginTop: 0,
    padding: `0 ${theme.spacing.unit * 3}px`
  }
})

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

    console.log('data', data)

    const ndx = crossfilter(data)
    console.log('ndx.all()', ndx.all())

    this.setState({ ndx })
  }

  changeGropParameter = groupParameter => {
    if (this.state.groupParameter !== groupParameter) this.setState({ groupParameter })
  }

  render() {
    const { classes } = this.props
    const { ndx, groupParameter } = this.state

    return (
      <div className={classes.root}>
        <Header />
        <Grid className={classes.main} container direction="column" spacing={24}>
          <Grid item>
            <DataCount ndx={ndx} />
          </Grid>
          <Grid item>
            <ParamSelect groupParameter={groupParameter} changeGropParameter={this.changeGropParameter} />
          </Grid>
          <Grid item>
            <PieChart ndx={ndx} groupParameter={groupParameter} />
          </Grid>
          <Grid item>
            <SeriesLineChart ndx={ndx} groupParameter={groupParameter} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(App)
