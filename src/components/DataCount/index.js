import React, { Component } from 'react'
import dc from 'dc'

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
        <span className="filter-count" /> selected out of <span className="total-count" />
        {' records | '}
        <button
          onClick={() => {
            dc.filterAll()
            dc.renderAll()
          }}
        >
          Reset All
        </button>
      </div>
    )
  }
}

export default DataCount
