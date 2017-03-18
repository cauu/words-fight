import React from 'react';
import ReactDOM from 'react-dom';
import ModalPortal from './ModalPortal';
import {unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer} from 'react-dom';
import elementClass from 'element-class';
import './modal.less';

const SafeHTMLElement = window.HTMLElement;


function sanitizeProps(props) {
  delete props.ref;
}

export default class Modal extends React.Component {
  static defaultProps = {
    isOpen: false
  }
  
  static propTypes = {
    isOpen: React.PropTypes.bool.isRequired
  }
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.node = document.createElement('div');
    this.node.className = 'M_Portal';
    document.body.appendChild(this.node);
    this.renderPortal(this.props);
  }
  
  componentWillReceiveProps(newProps) {
    this.renderPortal(newProps);
  }
  
  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  }
  
  renderPortal(props) {
    if (props.isOpen) {
      elementClass(document.body).add('M_body-open');
    } else {
      elementClass(document.body).remove('M_body-open');
    }
    sanitizeProps(props);
    this.portal = renderSubtreeIntoContainer(this, React.createFactory(ModalPortal)(props), this.node);
  }
  
  render() {
    return React.DOM.noscript();
  }
}