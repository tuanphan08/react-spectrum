import autobind from 'autobind-decorator';
import {Menu} from '../../Menu';
import OverlayTrigger from '../../OverlayTrigger';
import React from 'react';
import ReactDOM from 'react-dom';

@autobind
export default class Dropdown extends React.Component {
  onClose() {
    this.overlayTrigger.hide();
  }

  onSelect(...args) {
    this.onClose();
    if (this.props.onSelect) {
      this.props.onSelect(...args);
    }
  }

  render() {
    const {alignRight, onOpen, onClose, ...otherProps} = this.props;
    const children = React.Children.toArray(this.props.children);
    const trigger = children.find(c => c.props.dropdownTrigger) || children[0];
    const menu = children.find(c => c.props.dropdownMenu || c.type === Menu);

    return (
      <div {...otherProps}>
        {children.map((child, index) => {
          if (child === trigger) {
            return (
              <OverlayTrigger
                target={this}
                trigger="click"
                placement={alignRight ? 'bottom right' : 'bottom left'}
                ref={t => this.overlayTrigger = t}
                onShow={onOpen}
                key={index}
                onHide={onClose}>
                {trigger}
                {React.cloneElement(menu, {
                  onClose: this.onClose,
                  onSelect: this.onSelect
                })}
              </OverlayTrigger>
            );
          } else if (child !== menu) {
            return child;
          }
        })}
      </div>
    );
  }
}
