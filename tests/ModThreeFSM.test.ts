import { ModThreeFSM } from "../src/fsm/ModThreeFSM.ts";

describe("ModThreeFSM - Basic Functionality", () => {
  const fsm = new ModThreeFSM();

  test("should return 1 for '1101' (13)", () => {
    expect(fsm.modThree("1101")).toBe(1); // 13 % 3 = 1
  });

  test("should return 2 for '1110' (14)", () => {
    expect(fsm.modThree("1110")).toBe(2); // 14 % 3 = 2
  });

  test("should return 0 for '1111' (15)", () => {
    expect(fsm.modThree("1111")).toBe(0); // 15 % 3 = 0
  });

  test("should return 0 for '0'", () => {
    expect(fsm.modThree("0")).toBe(0);
  });

  test("should return 1 for '1'", () => {
    expect(fsm.modThree("1")).toBe(1);
  });

  test("should return 2 for '10' (2)", () => {
    expect(fsm.modThree("10")).toBe(2); // 2 % 3 = 2
  });

  test("should return 1 for '1010' (10)", () => {
    expect(fsm.modThree("1010")).toBe(1); // 10 % 3 = 1
  });

  test("should return 0 for '1001' (9)", () => {
    expect(fsm.modThree("1001")).toBe(0); // 9 % 3 = 0
  });
});

describe("ModThreeFSM - Edge & Error Cases", () => {
  const fsm = new ModThreeFSM();

  test("should throw error for invalid input", () => {
    expect(() => fsm.modThree("10a1")).toThrow("Input must be a binary string");
  });

  test("should handle empty input", () => {
    expect(fsm.modThree("")).toBe(0); // empty input treated as 0
  });

  test("should reset FSM between runs", () => {
    expect(fsm.modThree("111")).toBe(1); // 7 % 3 = 1
    expect(fsm.modThree("1")).toBe(1); // new run, also 1
  });

  test("should handle long binary input", () => {
    const longBinary = "1".repeat(1000);
    expect(() => fsm.modThree(longBinary)).not.toThrow();
  });
});

describe("ModThreeFSM - FSM State Transitions", () => {
  let fsmInstance: ModThreeFSM;
  let internalFSM: any;

  beforeEach(() => {
    fsmInstance = new ModThreeFSM();
    // Access the internal FSM instance (bypass TS for testing)
    internalFSM = fsmInstance["fsm"];
    internalFSM.reset();
  });

  test("FSM transitions correctly for input '110'", () => {
    expect(internalFSM.getCurrentState()).toBe("S0");

    internalFSM.processBit("1");
    expect(internalFSM.getCurrentState()).toBe("S1");

    internalFSM.processBit("1");
    expect(internalFSM.getCurrentState()).toBe("S0");

    internalFSM.processBit("0");
    expect(internalFSM.getCurrentState()).toBe("S0");
  });

  test("FSM transitions correctly for input '10'", () => {
    internalFSM.processBit("1");
    expect(internalFSM.getCurrentState()).toBe("S1");

    internalFSM.processBit("0");
    expect(internalFSM.getCurrentState()).toBe("S2");
  });

  test("FSM ends in expected state for input '101'", () => {
    const finalState = internalFSM.run(["1", "0", "1"]);
    expect(finalState).toBe("S2");
  });
});
