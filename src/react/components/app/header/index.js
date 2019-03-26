import React from 'react';
import { HEADER_MENU_ITEMS } from '../../../../common/const';
import HeaderMenuItem from './header-menu-item';

import './index.css';

class Header extends React.Component {
  render() {
    return (
      <header className='header' >
        { HEADER_MENU_ITEMS.map(item => <HeaderMenuItem {...item} key={item.text} />) }
      </header>
    )
  }
}

export default Header;