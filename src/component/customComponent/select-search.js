import React from 'react'
import { Select } from "antd"

export default class SelectSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  _onChangeSelect(e) {
    //console.log("this.props.value>>", this.props.value);

    // if (this.props.onChange !== undefined) {
    //   this.props.onChange(e)
    // }
    // if (this.props.onChangeObject !== undefined) {
    if (this.props.mode === 'multiple' || this.props.mode === 'tags') {
      var arr = []
      e.forEach(item => {
        arr.push(this.props.options.find(val => val.value === item))
      });
      this.props.onChange(arr)
    } else {
      this.props.onChange(this.props.options.find(val => val.value === e))
    }
    // }
  }

  render() {
    let { setProps } = this.props
    return (
      <Select
        {...setProps}
        mode={(this.props.mode === undefined ? '' : this.props.mode)}
        className={(this.props.className === undefined ? 'ant-select-full-width' : this.props.className)}
        options={(this.props.options === undefined ? [] : this.props.options)}
        value={(this.props.value === undefined ? '' : (typeof this.props.value === [] ? this.props.value.map(val => val.value) : this.props.value.value))}
        placeholder={(this.props.placeholder === undefined ? 'select..' : this.props.placeholder)}
        showSearch={(this.props.showSearch === undefined ? true : this.props.showSearch)}
        disabled={(this.props.disabled === undefined ? false : this.props.disabled)}
        filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(e) => this._onChangeSelect(e)}
        style={(this.props.style === undefined ? {} : this.props.style)}
        {...setProps}
      />
    )
  }
}