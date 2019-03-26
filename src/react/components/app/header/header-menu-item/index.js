import React from 'react';

import './index.css';

class HeaderMenuItemContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = { open: false };
    this.onClick = this.onClick.bind(this);
    this.openParents = this.openParents.bind(this);
    this.addCloseChildFunc = this.addCloseChildFunc.bind(this);
    this.closeChilds = this.closeChilds.bind(this);
    this.closeChildFuncs = [];
    if (props.registerChild)
      props.registerChild(text => {
        if (this.props.text !== text)
          this.setState({ open: false })
      });
  }

  onClick(event) {
    event.stopPropagation();
    if (this.props.path)
      window.location.pathname = this.props.path;
    if (this.props.link)
      window.location.hash = this.props.link;
    if (this.props.children) {
      const nextOpen = !this.state.open;
      if (nextOpen) {
        this.openParents();
        this.parentCloseChild(this.props.text);
      } else {
        this.setState({ open: false });
        this.closeChilds();
      }
        
    }
      
  }

  addCloseChildFunc(func) {
    this.closeChildFuncs.push(func);
  }

  openParents() {
    this.setState({ open: true });
    if (this.props.openParents)
      this.props.openParents();
  }

  parentCloseChild(text) {
    if (this.props.parentCloseChild)
      this.props.parentCloseChild(text);
  }

  closeChilds(text) {
    this.closeChildFuncs.forEach(func => func(text));
  }

  render() {
    return (
      <HeaderMenuItem
        {...this.props}
        {...this.state}
        onClick={this.onClick}
        openParents={this.openParents}
        parentCloseChild={this.closeChilds}
        registerChild={this.addCloseChildFunc}
      />
    );
  }
}

const HeaderMenuItem = props => (
  <div className={`header-menu-item${props.open ? ' header-menu-item--open' : ''}`} onClick={props.onClick}>
    {props.text}
    {props.children ? (
      <div className={`header-menu-item__list${props.open ? ' header-menu-item__list--open' : ''}`} >
        {props.children.map(child => (
          <HeaderMenuItemContainer
            {...child} 
            key={child.text}
            openParents={props.openParents}
            parentCloseChild={props.parentCloseChild}
            registerChild={props.registerChild}
          />
        ))}
      </div>
    ) : null}
  </div>
);

export default HeaderMenuItemContainer;