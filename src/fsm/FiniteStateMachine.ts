import {
  State,
  Symbol,
  FiniteAutomatonConfig,
} from "./interfaces/FiniteAutomatonConfig";

export class FiniteStateMachine {
  private states: Set<State>;
  private alphabet: Set<Symbol>;
  private initialState: State;
  private finalStates: Set<State>;
  private transition: Record<State, Record<Symbol, State>>;
  private currentState: State;

  constructor(config: FiniteAutomatonConfig) {
    this.states = new Set(config.states);
    this.alphabet = new Set(config.alphabet);
    this.initialState = config.initialState;
    this.finalStates = new Set(config.finalStates);
    this.transition = config.transition;
    this.currentState = config.initialState;

    this.validateConfig();
  }

  private validateConfig() {
    if (!this.states.has(this.initialState)) {
      throw new Error(`Invalid initial state: ${this.initialState}`);
    }
    for (const state of this.finalStates) {
      if (!this.states.has(state)) {
        throw new Error(`Invalid final state: ${state}`);
      }
    }
    for (const state in this.transition) {
      for (const symbol in this.transition[state]) {
        const nextState = this.transition[state][symbol];
        if (!this.states.has(nextState)) {
          throw new Error(`Transition to invalid state: ${nextState}`);
        }
        if (!this.alphabet.has(symbol)) {
          throw new Error(`Invalid symbol in transition: ${symbol}`);
        }
      }
    }
  }

  public reset() {
    this.currentState = this.initialState;
  }

  public consume(symbol: Symbol): void {
    if (!this.alphabet.has(symbol)) {
      throw new Error(`Symbol "${symbol}" not in alphabet`);
    }

    const transitionsForCurrent = this.transition[this.currentState];

    if (!transitionsForCurrent) {
      throw new Error(
        `No transitions defined for state "${this.currentState}"`
      );
    }

    const nextState = transitionsForCurrent[symbol];

    if (nextState === undefined) {
      throw new Error(
        `No transition defined for symbol "${symbol}" from state "${this.currentState}"`
      );
    }

    this.currentState = nextState;
  }

  public run(input: Symbol[]): State {
    this.reset();
    for (const symbol of input) {
      this.consume(symbol);
    }
    return this.currentState;
  }
  public processBit(symbol: string): void {
    if (!this.alphabet.has(symbol)) {
      throw new Error(`Invalid symbol: ${symbol}`);
    }
    this.currentState = this.transition[this.currentState][symbol];
  }

  public isAccepted(): boolean {
    return this.finalStates.has(this.currentState);
  }

  public getCurrentState(): State {
    return this.currentState;
  }
}
