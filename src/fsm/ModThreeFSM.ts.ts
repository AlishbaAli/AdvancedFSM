import { FiniteStateMachine } from "./FiniteStateMachine";
import { FiniteAutomatonConfig } from "./interfaces/FiniteAutomatonConfig";

const config: FiniteAutomatonConfig = {
  states: ["S0", "S1", "S2"],
  alphabet: ["0", "1"],
  initialState: "S0",
  finalStates: ["S0", "S1", "S2"],
  transition: {
    S0: { "0": "S0", "1": "S1" },
    S1: { "0": "S2", "1": "S0" },
    S2: { "0": "S1", "1": "S2" },
  },
};

const stateToRemainder: Record<string, number> = {
  S0: 0,
  S1: 1,
  S2: 2,
};

export class ModThreeFSM {
  private fsm: FiniteStateMachine;

  constructor() {
    this.fsm = new FiniteStateMachine(config);
  }

  public modThree(input: string): number {
    if (!/^[01]*$/.test(input)) {
      throw new Error("Input must be a binary string (only 0s and 1s).");
    }

    const finalState = this.fsm.run(input.split(""));
    return stateToRemainder[finalState];
  }
}
