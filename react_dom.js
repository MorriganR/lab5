'use strict';

const e = React.createElement;

class InitStates extends React.Component {
  constructor(props) {
    super(props);
    this.handleInitStatesChange = this.handleInitStatesChange.bind(this);
  }
  
  handleInitStatesChange(e) {
    this.props.onInitStatesChange(e.target.value);
  }
  
  render() {
    return (
      <form>
        <label>Initial State:&nbsp;&nbsp;</label>
        <input
          type="text"
          placeholder="q0,qi ..."
          value={this.props.initStatesText}
          onChange={this.handleInitStatesChange}
        />
      </form>
    );
  }
}

class FinalStates extends React.Component {
  constructor(props) {
    super(props);
    this.handleFinalStatesChange = this.handleFinalStatesChange.bind(this);
  }
  
  handleFinalStatesChange(e) {
    this.props.onFinalStatesChange(e.target.value);
  }
  
  render() {
    return (
      <form>
        <label>Final States:&nbsp;&nbsp;</label>
        <input
          type="text"
          placeholder="q5,qj ..."
          value={this.props.finalStatesText}
          onChange={this.handleFinalStatesChange}
        />
      </form>
    );
  }
}

class FstInit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initStatesText: '',
      finalStatesText: ''
    };
    this.handleInitStatesChange = this.handleInitStatesChange.bind(this);
    this.handleFinalStatesChange = this.handleFinalStatesChange.bind(this);
  }
  handleInitStatesChange(initStatesText) {
    this.setState({
      initStatesText: initStatesText
    });
  }
  handleFinalStatesChange(finalStatesText) {
    this.setState({
      finalStatesText: finalStatesText
    });
  }
  render() {
    return (
      <div>
        <InitStates
          initStatesText={this.state.initStatesText}
          onInitStatesChange={this.handleInitStatesChange}
        />
        <FinalStates
          finalStatesText={this.state.finalStatesText}
          onFinalStatesChange={this.handleFinalStatesChange}
        />
      </div>
    );
  }
}

const domContainer = document.querySelector('#react_dom_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(FstInit));