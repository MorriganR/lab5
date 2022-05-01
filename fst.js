class FST {
  constructor(initState, finalStates, transitionFunction) {
    this.initState = initState;
    this.finalStates = finalStates;
    this.transitionFunction = transitionFunction;
    const states = new Set();
    const inAlphabet = new Set();
    for (const element of transitionFunction) {
      states.add(element[0]);
      states.add(element[2]);
      inAlphabet.add(element[1])
    }
    this.states = states;
    this.inAlphabet = inAlphabet;
    console.log("initState " + this.initState);
    console.log(this.finalStates);
    console.log(this.transitionFunction);
    console.log(this.states);
    console.log(this.inAlphabet);
  }

  toDot() {
    let dotStr = "digraph fst { rankdir=LR;\n";
    dotStr += "node [shape=doublecircle]; " + this.finalStates.join(",") + ";\n";
    dotStr += "node [shape=circle];\n";
    dotStr += "start0 [shape=point]; start0 -> \"" + this.initState + "\" [label=start];\n";
    for (const tr of this.transitionFunction) {
      dotStr += "" + tr[0] + " -> " + tr[2] + " [label=" + tr[1] + "];\n";
    }
    dotStr += "}";
    return dotStr;
  }
}