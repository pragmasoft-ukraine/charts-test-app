import React, { Component } from 'react'
import dc from 'dc'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class DataCount extends Component {
  componentDidMount() {
    this.onUpdate()
  }

  componentDidUpdate() {
    this.onUpdate()
  }

  onUpdate = () => {
    const { ndx } = this.props

    if (!ndx) return

    const all = ndx.groupAll()

    this.dataCount = dc.dataCount(this.dataCount)
    this.dataCount.dimension(ndx).group(all)

    this.dataCount.render()
  }

  render() {
    return (
      <div ref={dataCount => (this.dataCount = dataCount)}>
        <Typography variant="title" gutterBottom>
          <span className="filter-count" /> selected out of <span className="total-count" />
          {' records'}
        </Typography>
        <Button
          color="primary"
          onClick={() => {
            dc.filterAll()
            dc.refocusAll()
            dc.renderAll()
          }}
        >
          Reset All
        </Button>
      </div>
    )
  }
}

export default DataCount
