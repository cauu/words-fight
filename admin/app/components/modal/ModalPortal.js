import React from 'react';

const CLASSNAMES = {
  overlay:{
    base: 'M_Overlay',
    afterOpen: 'M_Overlay-after-open',
    beforeClose: 'M_Overlay-before-close'
  },
  content:{
    base: 'M_Content',
    afterOpen: 'M_Content-after-open',
    beforeClose: 'M_Content-before-close'
  }
};

const defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
};

function stopPropagation(event) {
  event.stopPropagation();
}

export default class ModalPortal extends React.Component {
  static defaultProps = {
    style: {
      overlay: {},
      content: {}
    }
  }
  
  constructor(props) {
    super(props);
    
    this.ownerHandlesClose = this.ownerHandlesClose.bind(this);
    this.focusContent = this.focusContent.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    
    this.state = {
      afterOpen: false,
      beforeClose: false
    }
  }
  
  componentDidMount() {
    if (this.props.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    }
  }
  
  componentWillReceiveProps(newProps) {
    if (!this.props.isOpen && newProps.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    } else if (this.props.isOpen && !newProps.isOpen) {
      this.close();
    }
  }
  
  componentDidUpdate() {
    if (this.focusAfterRender) {
      this.focusContent();
      this.setFocusAfterRender(false);
    }
  }
  
  setFocusAfterRender(focus) {
    this.focusAfterRender = focus;
  }
  
  open() {
    //focusManager.setupScopedFocus(this.node);
    //focusManager.markForFocusLater();
    this.setState({isOpen: true}, () => {
      this.setState({afterOpen: true});
    })
  }
  
  close() {
    if (!this.ownerHandlesClose()) {
      return;
    }
    this.setState({
      afterOpen: false,
      beforeClose: false
    }, this.afterClose);
  }
  
  afterClose() {
    //focusManager.returnFocus();
    //focusManager.teardownScopedFocus();
  }
  
  handleKeyDown(event) {
    if (event.keyCode === 9) {
      //tab
      //scopeTab(this.refs.content, event);
    }
    if (event.keyCode === 27) {
      //esc
      this.requestClose();
    }
  }
  
  handleOverlayClick() {
    if (this.ownerHandlesClose()) {
      this.requestClose();
    } else {
      this.focusContent();
    }
  }
  
  requestClose() {
    if (this.ownerHandlesClose()) {
      this.props.onRequestClose();
    }
  }
  
  ownerHandlesClose() {
    return this.props.onRequestClose;
  }
  
  shouldBeClosed() {
    return !this.props.isOpen && !this.state.beforeClose;
  }
  
  focusContent() {
    this.refs.content.focus();
  }
  
  buildClassName(which, additional) {
    let className = CLASSNAMES[which].base;
    if (this.state.afterOpen) {
      className += ' ' + CLASSNAMES[which].afterOpen;
    }
    if (this.state.beforeClose) {
      className += ' ' + CLASSNAMES[which].beforeClose;
    }
    return additional ? className + ' ' + additional : className;
  }
  
  render() {
    return this.shouldBeClosed() ? 
      <div></div> : 
      <div ref="overlay"
           className={this.buildClassName('overlay', this.props.overlayClassName)}
           onClick={this.handleOverlayClick}>
        <div ref="content"
             className={ this.buildClassName('content', this.props.className)}
             tabIndex= '-1'
             onClick={stopPropagation}
             onKeyDown={this.handleKeyDown}>
          {this.props.children}
        </div>
      </div>
  }
}