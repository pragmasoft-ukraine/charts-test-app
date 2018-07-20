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
        <span class="filter-count" /> selected out of <span class="total-count" /> records |{' '}
        <a
          onClick={() => {
            dc.filterAll()
            dc.renderAll()
          }}
          href="#"
        >
          Reset All
        </a>
      </div>
    )
  }
}

export default DataCount
