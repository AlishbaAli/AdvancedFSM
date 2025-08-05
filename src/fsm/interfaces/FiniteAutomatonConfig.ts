export type State = string;
export type Symbol = string;

export interface FiniteAutomatonConfig {
  states: State[];
  alphabet: Symbol[];
  initialState: State;
  finalStates: State[];
  transition: Record<State, Record<Symbol, State>>;
}
