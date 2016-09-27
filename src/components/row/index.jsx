import React, { PropTypes } from 'react'
import DatePicker from 'react-bootstrap-date-picker';

export default class Row extends React.Component {

  state = {
    search: ''
  }

  componentDidMount() {
    this.bindAutocompleteSinceThereIsNoGoodLibOutThere();
  }

  bindAutocompleteSinceThereIsNoGoodLibOutThere(){
    const input = this.refs.location;
    input._autocomplete = new window.google.maps.places.Autocomplete(input);
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value })
  }

  handleSelectSuggest = (suggestName, coordinate) => {
    this.setState({ search: suggestName, selectedCoordinate: coordinate })
  }

  render () {
    let {search} = this.state;
    return(
      <tr className="list-row" key={this.props.index}>
        <td key={0} className="calendar" style={{width:105}}>
          <i className='icon-spinner icon-spin icon-large'></i>
          <DatePicker value={this.state.value} onChange={this.handleChange} />
        </td>
        <td key={1} className="location" style={{width:'auto'}}>
          <input ref="location" type="text" style={{width:'100%'}} className="location" placeholder="Where? (google autocomplete baby)"/>
        </td>
        <td key={2} className="remove" style={{width:175}}>
          <button className="btn btn-danger btn-xs remove-row" onClick={this.props.removeRow.bind(this, this.props.index)}>remove</button>
        </td>
      </tr>
    )
  }
}
