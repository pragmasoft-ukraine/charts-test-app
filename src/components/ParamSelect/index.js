import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

class ParamSelect extends Component {
  state = {
    open: false
  }

  handleChange = event => {
    this.props.changeGropParameter(event.target.value)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render() {
    const { groupParameter } = this.props
    return (
      <FormControl>
        <InputLabel htmlFor="demo-controlled-open-select">Parameter</InputLabel>
        <Select
          open={this.state.open}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          value={groupParameter}
          onChange={this.handleChange}
        >
          <MenuItem value={'markdown'}>markdown</MenuItem>
          <MenuItem value={'revenues'}>revenues</MenuItem>
          <MenuItem value={'margin'}>margin</MenuItem>
        </Select>
      </FormControl>
    )
  }
}

export default ParamSelect
