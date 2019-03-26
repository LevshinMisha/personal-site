import React from 'react';

import './index.css';
import { FOOTER_LINKS } from '../../../../../common/const';

class FooterLinks extends React.Component {
  render() {
    return (
      <div className='footer__links' >
        { FOOTER_LINKS.map(item => <a className='footer__link' href={item.link} key={item.text} >{item.text}</a>) }
      </div>
    )
  }
}

export default FooterLinks;