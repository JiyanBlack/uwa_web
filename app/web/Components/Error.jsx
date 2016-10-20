'use strict';

import React from 'react';

export default class Error extends React.Component {
  render() {
    if (this.props.message != undefined) {
      return (
        <div className='valign-wrapper' id='error' style={{
          border: '1px solid red',
          'border-radius': '5px'
        }}>
        <div className='container' style={{
          fontSize: '1.3em'
        }}><i className='material-icons'>error_outline</i>
        {this.props.message}
      </div>
      </div>
        );
    } else {
      return (<div></div>);
    }
  }
}
