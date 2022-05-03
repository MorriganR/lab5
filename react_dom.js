const e = React.createElement;

class InitStates extends React.Component {
  constructor(props) {
    super(props);
    this.handleInitStatesChange = this.handleInitStatesChange.bind(this);
    this.handleFinalStatesChange = this.handleFinalStatesChange.bind(this);
  }

  handleInitStatesChange(e) {
    this.props.onInitStatesChange(e.target.value);
  }

  handleFinalStatesChange(e) {
    this.props.onFinalStatesChange(e.target.value);
  }

  render() {
    return (
      <div>
        <form>
          <label>Пчатковий стан:&nbsp;&nbsp;</label>
          <input
            type="text"
            placeholder="q0,qi ..."
            value={this.props.initStatesText}
            onChange={this.handleInitStatesChange}
          />
        </form>
        <form>
          <label>Кінцеві стани:&nbsp;&nbsp;</label>
          <input
            type="text"
            placeholder="q5,qj ..."
            value={this.props.finalStatesText}
            onChange={this.handleFinalStatesChange}
          />
        </form>
      </div>
  );}
}

class Transition extends React.Component {
  constructor(props) {
    super(props);
    this.handleTransitionChange = this.handleTransitionChange.bind(this);
  }

  handleTransitionChange(e) {
    const initState = e.target.parentElement.elements[0].value
    const inSimbol = e.target.parentElement.elements[1].value
    const nextState = e.target.parentElement.elements[2].value
    this.props.onTransitionChange(this.props.transitionId, [initState,inSimbol,nextState]);
  }

  render() {
    return (
      <div>
        <form id={this.props.transitionId}>
          &delta;(&nbsp;
          <input
            name="initState"
            type="text"
            value={this.props.transition[0]}
            onChange={this.handleTransitionChange} />
          &nbsp;,&nbsp;
          <input
            name="inSimbol"
            type="text"
            value={this.props.transition[1]}
            placeholder="&epsilon;"
            onChange={this.handleTransitionChange} />
          &nbsp;)&nbsp;=&nbsp;
          <input
            name="nextState"
            type="text"
            value={this.props.transition[2]}
            onChange={this.handleTransitionChange} />
        </form>
      </div>
    );
  }
}

class SimpleButon extends React.Component {
  render() {
    return (
      <button
        type="button"
        onClick={() => this.props.onClick()}
      >{this.props.bottonName}
      </button>
    );
  }
}

class FstInit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initStatesText: 'q0',
      finalStatesText: 'q1',
      transitionArray: [['q0','1','q1'],]
    };
    this.handleInitStatesChange = this.handleInitStatesChange.bind(this);
    this.handleFinalStatesChange = this.handleFinalStatesChange.bind(this);
    this.handleTransitionChange = this.handleTransitionChange.bind(this);
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

  handleTransitionChange(id, inValue) {
    //console.log(id);
    const tempTr = this.state.transitionArray.slice();
    tempTr[id] = inValue;
    this.setState({
      transitionArray: tempTr
    });
  }

  handleClickAddTransition() {
    const tempTr = this.state.transitionArray.slice();
    tempTr[tempTr.length] = ['','',''];
    this.setState({
      transitionArray: tempTr
    });
  }

  handleClickClean() {
    this.setState({initStatesText: ''});
    this.setState({finalStatesText: ''});
    this.setState({transitionArray: [['','',''],]});
  }

  handleClickExamle() {
    this.setState({initStatesText: 'q0'});
    this.setState({finalStatesText: 'q1,q3'});
    this.setState({transitionArray: [
      ['q0','0','q0'],
      ['q0','1','q0'],
      ['q0','1','q1'],
      ['q1','0','q2'],
      ['q1','1','q2'],
      ['q2','0','q3'],
      ['q2','1','q3'],
    ]});
  }

  render() {
    var transitionRows = [];
    var transitionCount = this.state.transitionArray.length;
    for (var i = 0; i < transitionCount; i++) {
      transitionRows.push(
          <Transition key={i}
            transitionId={i}
            transition={this.state.transitionArray[i]}
            onTransitionChange={this.handleTransitionChange}
          />);
    };
    const nfa = new FST(
      this.state.initStatesText,
      this.state.finalStatesText.split(","),
      this.state.transitionArray);
    const dotStr = nfa.toDot()
    console.log(dotStr)
    d3.select("#input_fst_dot").graphviz().zoom(false).renderDot(dotStr);
    return (
      <div>
        <SimpleButon
          bottonName="Очистити"
          onClick={() => this.handleClickClean()}
        />
        <SimpleButon
          bottonName="Приклад"
          onClick={() => this.handleClickExamle()}
        />
        <InitStates
          initStatesText={this.state.initStatesText}
          finalStatesText={this.state.finalStatesText}
          onInitStatesChange={this.handleInitStatesChange}
          onFinalStatesChange={this.handleFinalStatesChange}
        />
        Функція переходів:
        {transitionRows}
        <SimpleButon
          bottonName="Додати перехід"
          onClick={() => this.handleClickAddTransition()}
        />
      </div>
    );
  }
}

const domContainer = document.querySelector('#react_dom_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(FstInit));