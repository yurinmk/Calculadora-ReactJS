import "./Calculator.css";
import React, { Component } from "react";

import Button from "../components/Button";
import Display from "../components/Display";
import { render } from "@testing-library/react";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);

    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      //caso o valor de current for 0, o estado inicial vai receber a
      //operação digitada, vai mudar o current para 1 e a variavel
      //clearDisplay vai vater true para que possa ser digitado o prócimo numero
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      //caso o valor de current não for 0, a variável equals vai receber
      // true ou false caso a operação atual for um =
      const equals = operation === "=";
      //a variável currentOperation vai receber a operação que foi digitada antes
      const currentOperation = this.state.operation;
      //values vai valer a cópia do values do estado inicial
      const values = [...this.state.values];
      try {
        //values na posição 0 precisa receber a operação dos valores ateriores armazenado
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }
      values[1] = 0;
      //atribuir os valores analisados para o estado inicial
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    //se o digito que for inserido for um . e dentro do displayValue
    //já existir um, o valor digitado vai ser ignorado
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }
    //clearDisplay só vai ser verdadeiro se o displayValue for igual a 0
    // ou se clearDisplay for true
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    //se clearDisplay for true, currentValue vai valer vazio, se não for
    //vai valer o valor que foi digitado
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    //displayValue vai valer o digito que foi clicado mais o próximo digito
    const displayValue = currentValue + n;
    //atribuir os valores analisados para o estado inicial
    this.setState({ displayValue, clearDisplay: false });

    //se o valor digitado for diferente de .
    if (n != ".") {
      //a variável i vai valer a posição atual que o current está
      const i = this.state.current;
      //newValue vai valer o valor digitado convertido pra float
      const newValue = parseFloat(displayValue);
      //a variável values vai ser a uma cópia do values do estado inicial
      const values = [...this.state.values];
      //values na posição atual vai valer o numero digitado
      values[i] = newValue;
      //atribuir os valores analisados para o estado inicial
      this.setState({ values });
    }
  }
  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />

        <Button label="/" click={this.setOperation} operation />

        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />

        <Button label="*" click={this.setOperation} operation />

        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />

        <Button label="-" click={this.setOperation} operation />

        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />

        <Button label="+" click={this.setOperation} operation />

        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />

        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
