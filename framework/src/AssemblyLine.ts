import InternalAssemblyStep from "./InternalAssemblyStep";


class AssemblyLine {

  steps: Array<InternalAssemblyStep>;

  constructor(steps: Array<InternalAssemblyStep>) {
    this.steps = steps;
    // finalize the assembly line
    Object.freeze(this);
  }
}

export default AssemblyLine;