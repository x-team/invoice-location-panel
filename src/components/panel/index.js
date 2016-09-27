import React from 'react';
import styles from './styles';
import classNames from 'classnames';
import GoogleLogin from 'react-google-login';
import config from '../../config';
import _ from 'lodash';
import Immutable from 'immutable';

//import {query} from 'x-query-client';

class Location {
  date = ''
  location = ''
};

export default class Panel extends React.Component {

  static defaultProps = {
  }

  state = {
    authorised: true,
    saved: false,
    locations: Immutable.List.of(new Location())
  }

  onAuthSuccess = googleUser => {
    this.setState({
      'authIDToken': googleUser.getAuthResponse().id_token,
      'authorised': true
    });
  }

  addLocation = () => {
    var locations = this.state.locations;
    this.setState({locations: this.state.locations.push(new Location())});
  }

   saveToXmap(){

    var data = getParsedData();

    if(data.length){

      var opts = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'post'
      };

      //save here instead of auth
      fetch(graphqlServerURL+'/auth?auth_token='+this.state.authIDToken, opts)
        .then(() => {
          this.setState('locations', []);
          this.setState('saved', true);
        })
        .catch(function(){ alert('sth went wrong :/')})

    } else {
      alert('add at least one full row ;)')
    }

  }


  removeRow = index => {
    this.setState({locations: this.state.locations.splice(index, 1)});
  }

  renderLocationsTable() {
    return (
      <div>
        <table className="list-wrapper table">
          <tbody>
          { this.state.locations.map(this.renderTableRow)}
          </tbody>
        </table>
        <div className="add-row pull-right">
          <button className="add-row-trigger btn btn-xs btn-primary " onClick={this.addLocation}>Add another location</button>
          <button className="save-to-xmap-trigger btn btn-xs btn-success" onClick={this.saveToXmap}>Save to X-Map</button>
        </div>
      </div>
    );
  }


  renderTableRow = (item, index=0) => {
    return(
    <tr className="list-row" key={index}>
      <td key={0} className="calendar" style={{width:105}}>
        <i className='icon-spinner icon-spin icon-large'></i>
        <input type="text" className="calendar" placeholder="When?" />
      </td>
      <td key={1} className="location" style={{width:'auto'}}>
        <input type="text" style={{width:'100%'}} className="location" placeholder="Where? (google autocomplete baby)"/>
      </td>
      <td key={2} className="remove" style={{width:175}}>
        <button className="btn btn-danger btn-xs remove-row" onClick={this.removeRow.bind(this, index)}>remove</button>
      </td>
    </tr>
    )
  }

  renderGoogleAuth(){
    return(
      <div>
        <GoogleLogin
        clientId={config.googleClientID}
        buttonText="Login"
        onSuccess={this.onAuthSuccess}
        onFailure={_.noop}
        />
      </div>
    );
  }

  renderSuccessNotification() {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Awesome!</strong> thank you for making the X-Map a better app.
      </div>
    );
  }

  render() {
    return (
      <div className={styles.geolocationPanelWrapper}>
        <h3>Have you traveled to a new place?<br/><small>Update your travels to X-Map. We will do some cool stuff with it!</small></h3>
        <div className="content">
          {
            this.state.authorised
              ? this.state.saved
                ? this.renderSuccessNotification()
                : this.renderLocationsTable()
              : this.renderGoogleAuth()
          }
        </div>
      </div>
    );
  }
};
