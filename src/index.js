import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';


window.addEventListener('load',function(){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src =  'https://maps.googleapis.com/maps/api/js?key=AIzaSyCPXoawrjAdZ6HBYtMVVjfWR96_pYwYr3A&libraries=places';
  script.onload = init;
  document.head.appendChild(script);
});

function init() {
  var element = document.getElementById(window.mightyEl) || document.body;
  ReactDOM.render(<App/>, element);
}
