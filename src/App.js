import React from 'react';
import Keypad from './Components/Keypad'
import Result from './Components/Result'
import './Components/components.css'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      positive: true,
      result: 0,
      operator: false,
    }
  }

  //updates to make
  //clear state if I press a number after doing an equation
  //going from NUM - to x gives me an error ()

  onClick = button => {
    switch(this.state.result){
      case (this.state.result.length > 6):
        this.catchError()
        break;

      case 0:
        this.caseZero(button)
        break;

      case 'ERROR':
        this.caseError(button)
        break;

      default:
        this.caseDefault(button)
        break;
    }
  }

  //switch functions
  caseZero(button){
    switch(button){
      case "AC":
      case "=":
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        this.clearResult()
        break;

      case 'negative':
        this.plusMinusPressed()
        break;

      default:
        this.setState({
          result: '' + button
        })
      }
    }

    caseError(button){
      switch(button){
        case "AC":
        case "+":
        case "-":
        case "*":
        case "/":
          this.clearResult()
          break;

        default:
          this.setState({
            positive: true,
            result: button + ''
          })
          break;

        case 'negative':
          this.setState({
            positive: false,
            result: '-'
          })
          break;
      }
    }

    caseDefault(button){
      switch(button){
        case "AC":
          this.clearResult();
          break;

        case "+":
        case "-":
        case "*":
        case "/":
          if (this.state.operator) {
            if(this.state.operator[this.state.operator.length-1] === "+" || "-" || "*" || "/"){
              this.setState({
                operator: this.state.operator.slice(0,-1) + button
              })
            } else {
              this.setState({
                operator: this.state.operator + this.state.result + button,
                result: ''
              })
            }
          } else {
            this.setState({
              operator: this.state.result + button,
              result: ''
            })
          }
          break;

        case 'negative':
          this.plusMinusPressed()
          break;

        case '=':
          this.equalButtonPressed()
          break;

        case '%':
          this.pressPercentButton()
          break;

        default:
          this.setState({
            result: this.state.result + button
          })
        break;
      }
  }

  //helper functions
  equalButtonPressed(){
    try{
      this.setState({
        result: (eval(this.state.operator + this.state.result)) + '',
        operator: ''
      })   
    } catch {
      this.catchError()
    }
  }

  plusMinusPressed(){
    //should remove zero
    if(this.state.positive === true) {
      if(this.state.result === 0){
        this.setState({
          positive: false,
          result: '-'
        })
      } else {
        this.setState({
          positive: false,
          result: '-' + this.state.result
        })
      }
    } else {
        if(this.state.result === '-'){
          this.clearResult()
        } else {
          this.setState({
            positive: true,
            result: this.state.result.substr(1)
          })
        }
    }      
  }

  pressPercentButton(){
      this.setState({
        result: eval(this.state.result / 100) + ''
      })
  }


  clearResult() {
    this.setState({
      positive: true,
      result: 0
    })
  }

   catchError() {
     this.setState({
          result: 'ERROR'
      })
   }


  render(){
    return (
      <div className='calculator-wrapper'>
        <div className='calculator'>
          <Result result={this.state.result} />
          <Keypad onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

export default App;

