import React, { PropTypes } from 'react'
import DatePicker from 'react-bootstrap-date-picker';


const styles = {
  calendarColumn: {
    width:165
  },
  locationColumn: {
    width: 'auto'
  },
  actionColumn: {
    width: 50
  },
  noActionColumn: {
    width: 0,
    padding: 0
  },
  locationInput: {
    width: '100%',
    padding: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc'
  }
};

export default class Row extends React.Component {

  state= {
    date : '',
    search : ''
  }


  handleDateChange = (date) => {
    this.setState({
      date
    });
  }

  getLocation(){
    var inputValue = this.refs.location.value;
    var locationMeta = this.refs.location._autocomplete.getPlace();

    if (!inputValue) {
      return;
    }

    if(!locationMeta){

      return {
        address: inputValue,
        location: {
          lat: null,
          lng: null
        }
      };

    } else {

      return {
        address: locationMeta.formatted_address,
        location: {
          lat: locationMeta.geometry.location.lat(),
          lng: locationMeta.geometry.location.lng()
        }
      }

    }

  }

  getData(){
    var location = this.getLocation();
    var date = this.refs.calendar.state.value;
    return location && date ? {location, date} : null;
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

  handleSelectSuggest = (searchTerm, coordinate) => {
    this.setState({ search: suggestName, selectedCoordinate: coordinate })
  }

  renderRemoveBtn = () => {
    return (
        <button className="btn btn-danger remove-row" onClick={this.props.removeRow.bind(this, this.props.index)}>X</button>
    );
  }

  render () {
    let {search} = this.state;
    const actionColumnStyles = this.props.index > 0  ? styles.actionColumn : styles.noActionColumn;
    return(
      <tr className="list-row">
        <td key={0} className="calendar" style={styles.calendarColumn}>
          <i className='icon-spinner icon-spin icon-large'></i>
          <DatePicker ref="calendar" value={this.state.date} onChange={this.handleDateChange} />
        </td>
        <td key={1} className="location" style={styles.locationColumn}>
          <input ref="location" type="text" style={styles.locationInput} className="location" placeholder="Where? (google autocomplete baby)"/>
        </td>
        <td key={2} className="remove" style={actionColumnStyles}>
          {
            this.props.index > 0 ? this.renderRemoveBtn() : null
          }
        </td>

      </tr>
    )
  }
}
