import React, { Component } from 'react';
import InputGeneral from '../../components/Input';
import { calculateSalaryFrom } from '../../utils/salary';

export default class ProjetoBase extends Component {
  constructor() {
    super();

    this.state = {
      inputSalario: '',
      baseINSS: '',
      baseIRPF: '',
      discountINSS: '',
      discountIRPF: '',
      netSalary: '',
      taxaINSS: '',
      taxaIRPF: '',
    };
  }

  handleChangeInput = (newValue) => {
    const result = calculateSalaryFrom(newValue);
    this.setState({
      inputSalario: newValue,
    });
    this.setState({
      baseINSS: result.baseINSS,
      baseIRPF: result.baseIRPF,
      discountINSS: result.discountINSS,
      discountIRPF: result.discountIRPF,
      netSalary: result.netSalary,
      taxaINSS: ((result.discountINSS * 100) / newValue).toFixed(2),
      taxaIRPF: ((result.discountIRPF * 100) / newValue).toFixed(2),
    });

    console.log(result);
  };

  render() {
    const {
      inputSalario,
      baseINSS,
      baseIRPF,
      discountINSS,
      discountIRPF,
      netSalary,
      taxaINSS,
      taxaIRPF,
    } = this.state;
    return (
      <div>
        <div className="center-align">
          <h1>React INSS</h1>
        </div>
        <div className="padding default-flex-row">
          <InputGeneral
            label="Salário Bruto"
            value={inputSalario}
            onChangeInput={this.handleChangeInput}
            readOnly={false}
          />
        </div>

        <div className="padding default-flex-row">
          <InputGeneral
            label="Base INSS"
            value={baseINSS}
            focus={false}
            readOnly={true}
          />

          <InputGeneral
            label="Desconto INSS"
            value={discountINSS}
            taxa={taxaINSS}
            readOnly={true}
          />
          <InputGeneral
            label="Base IRPF"
            value={baseIRPF > 1903.98 ? baseIRPF : ''}
            readOnly={true}
            focus={false}
          />
          <InputGeneral
            label="Desconto IRPF"
            value={baseIRPF > 1903.98 ? discountIRPF : ''}
            taxa={baseIRPF > 1903.98 ? taxaIRPF : ''}
            readOnly={true}
          />
        </div>
        <div>
          <InputGeneral
            label="Salário Líquido"
            value={netSalary}
            taxa={((netSalary * 100) / inputSalario).toFixed(2)}
            readOnly={true}
          />
        </div>
      </div>
    );
  }
}
