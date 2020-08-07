import React from 'react';

const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
  
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Physical Sciences, University of Nairobi 2020</em>
        <br />
        <em>@jim_4067</em>
      </div> 
    )
  }

  export default Footer;
