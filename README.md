# ModThreeFSM - Finite State Machine for Modulo 3 Calculation

## Overview

This project implements a **Finite State Machine (FSM)** in TypeScript to compute the remainder when an unsigned binary integer is divided by 3 (modulo 3). Instead of converting the binary string to a number and using the `%` operator, this solution uses an FSM approach inspired by computer hardware principles, demonstrating efficient and scalable state transition logic.

The FSM processes input bits most significant bit first, transitioning through states to track the modulo 3 remainder, and outputs the remainder based on the final state after processing all bits.

---

## Features

- Modular, reusable FSM implementation designed as a library.
- Strict TypeScript with well-defined interfaces and types.
- Robust input validation and error handling.
- Comprehensive unit tests covering:
  - Basic functionality
  - Edge cases (empty input, invalid characters)
  - FSM internal state transitions
- Easily extensible FSM framework for other use cases.

---

## Installation

1. Clone the repository:

2. npm install

3. npm run build

## API

modThree(input: string): number
Parameters:

input — A binary string (only '0' and '1' characters).

Returns:

The modulo 3 remainder of the binary number.

Throws:

Error if input contains characters other than '0' or '1'.

## Run tests with:

npx jest

### Coverage Includes:

- Valid binary strings of various lengths
- Edge cases (empty string, zeros)
- Invalid input (non-binary characters)

## Design Notes

The FSM is implemented as a generic class configurable via a 5-tuple (Q, Σ, q0, F, δ) pattern.

ModThreeFSM provides a specialized wrapper with the modulo 3 state machine configuration.

Internal FSM state is reset before each computation to ensure independent runs.

Unit tests verify not only outputs but also correct internal state transitions for transparency and correctness.

Designed for extensibility to support other FSM-based problems with minimal changes.

## Extending to Other FSMs

Just provide a new transition table and state set:

```ts
const newFSM = new FiniteAutomaton({
  states: [...],
  alphabet: [...],
  initialState: 'S0',
  acceptingStates: [...],
  transition: (s, symbol) => customTable[s][symbol],
});
```
