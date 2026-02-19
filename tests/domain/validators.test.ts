import { describe, expect, it } from "vitest";
import {
  validateDescription,
  validateStatus,
  validateTitle
} from "../../src/domain/validators.js";

describe("domain validators", () => {
  it("trims and validates title", () => {
    expect(validateTitle("  Task title  ")).toBe("Task title");
    expect(() => validateTitle("  ")).toThrow("Title is required.");
  });

  it("validates description length", () => {
    expect(validateDescription("  short  ")).toBe("short");
    expect(() => validateDescription("x".repeat(501))).toThrow(
      "Description must be 500 characters or fewer."
    );
  });

  it("validates status", () => {
    expect(validateStatus("todo")).toBe("todo");
    expect(() => validateStatus("blocked")).toThrow("Status must be one of");
  });
});
