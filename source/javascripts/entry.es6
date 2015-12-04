import React from 'react'
import ReactDom from 'react-dom'
import App from './flux/components/app'

var run = function(){
  var mountnode = document.getElementById('app');
  ReactDom.render(
    <App /> , mountnode
  )
}

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
