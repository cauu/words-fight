import React from 'react';
import {Decorator as FormsyElement} from 'formsy-react';
import './input.less';

@FormsyElement()
class FormsyInput extends React.Component {
  static propTypes = {
    showError: React.PropTypes.func,
    showRequired: React.PropTypes.func,
    className: React.PropTypes.string.isRequired,
    getErrorMessage: React.PropTypes.func,
    getValue: React.PropTypes.func,
    setValue: React.PropTypes.func,
  };

  render() {
    let error = this.props.showError() ? ' error' : '';
    let require = this.props.showRequired() ? ' required' : error;

    const className = (this.props.className || ' ') + require;
    const errorMessage = this.props.getErrorMessage();
    return (
      <div className="formsy-input">
        <input className={className} value={this.props.getValue()} onChange={(e) => this.props.setValue(e.target.value)} />
        <span className="validation-error">{errorMessage}</span>
      </div>
    );
  }
}

export default FormsyInput;
