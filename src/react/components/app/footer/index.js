import React from 'react';

import './index.css';
import FooterLinks from './footer-links';

class Footer extends React.Component {
  render() {
    return (
      <footer className='footer' >
        <div className='footer__item' >
          Сделано с любовью
        </div>
        <div className='footer__item' >
          С помощью бандлера
        </div>
        <FooterLinks />
      </footer>
    )
  }
}

export default Footer;