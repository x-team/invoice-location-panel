import React from 'react';
import classNames from 'classnames';
import GoogleLogin from 'react-google-login';
import {graphqlServerURL, googleClientID}  from '../../config';
import _ from 'lodash';
import Row from '../row';

const styles = {
  wrapper: {
    margin:'25px 0'
  },
  actionBtn: {
    marginRight: 8
  },
  actionBtnsWrapper: {
    overflow: 'hidden'
  }
};

export default class Panel extends React.Component {

  static defaultProps = {
  }

  state = {
    authorised: true,
    saved: false,
    rowNum: 1,
    processing: false
  }

  onAuthSuccess = googleUser => {
    this.setState({
      'authIDToken': googleUser.getAuthResponse().id_token,
      'authorised': true
    });
  }

  addRow = () => {
    this.setState({rowNum: this.state.rowNum + 1 });
  }


  getParsedData = () => {
    var data = [];
    var rowData;
    for(var i = 0; i < this.state.rowNum; i++){
      rowData = this.refs['row-'+i].getData();
      if (rowData) {
        data.push(rowData);
      }
    }
    return data;
  }

   saveToXmap = () => {

    var data = this.getParsedData();
    if(data.length){

      var opts = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'post'
      };

      this.setState({processing: true});


      setTimeout(()=>{

        fetch(graphqlServerURL+'/auth?auth_token='+this.state.authIDToken, opts)
          .then(() => {
            this.setState({saved: true});
          })
          .catch(() => {
            this.setState({saved: true});

          //  alert('sth went wrong :/')
          })

      }, 2000)
      //save here instead of auth


    } else {
      alert('add at least one full row ;)')
    }

  }

  renderRows() {
    var rows = [];
    for (var i = 0; i < this.state.rowNum; i++) {
      rows.push(<Row ref={'row-' + i} key={i} index={i}  removeRow={this.removeRow}/>);
    }
    return rows;
  }


  removeRow = index => {
    this.setState({rowNum: this.state.rowNum - 1});
  }

  renderLocationsTable() {


    const saveBtnContent = this.state.processing ? 'Doing stuff ...' : 'Save to X-Map'
    return (
      <div>
        <table className="list-wrapper table">
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <div style={styles.actionBtnsWrapper}>
          <div className="add-row pull-right">
            <button disabled={this.state.processing} style={styles.actionBtn} className="add-row-trigger btn  btn-default btn-xs btn-primary " onClick={this.addRow}>
              Add another location
            </button>
            <button disabled={this.state.processing} style={styles.actionBtn} className="save-to-xmap-trigger btn btn-xs btn-success" onClick={this.saveToXmap}>
              {saveBtnContent}
            </button>
          </div>
        </div>
      </div>
    );
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
      <div style={styles.wrapper}>
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
