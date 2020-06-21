import React, { Component } from 'react';
import { formatNumber } from '../../utils/formatReal';

export default class InputGeneral extends Component {
  handleInputChange = (event) => {
    const value = event.target.value;
    this.props.onChangeInput(value);
  };

  render() {
    const { readOnly, value, label, taxa, discount } = this.props;
    return (
      <div>
        <label>{label}</label>
        {!!this.props.readOnly ? (
          <input
            placeholder="R$: 0,00 "
            type="text"
            autoFocus={false}
            value={
              value
                ? value < 0
                  ? 0
                  : value && taxa && taxa !== 0
                  ? `${formatNumber(value)} ( ${taxa}% ) `
                  : formatNumber(value)
                : ''
            }
            readOnly={readOnly}
          />
        ) : (
          <input
            placeholder="R$: 0,00 "
            type="Number"
            autoFocus={true}
            value={value < 0 ? 0 : value}
            onChange={this.handleInputChange}
          />
        )}
      </div>
    );
  }
}
