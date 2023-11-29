import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useEditModal from "./useEditModal";

// REFERENCES:
// Render and test hooks: https://testing-library.com/docs/react-testing-library/api/#renderhook
// Act: https://testing-library.com/docs/react-testing-library/api/#act

// +++ STEPS +++
// ********* Arrange *********

// - Create relevant objects and data
// - Setup mocks

// *********** Act ***********

// - Render a component
// - Render a hook
// - Call a function
// - Perform some actions on a component
// - ...

// ********** Assert *********

// - expect(...).toBe...
// - ...

describe("useEditModal.ts", () => {
  it("should have initial state with isOpen set to false", () => {
    // ...
  });

  it("should toggle the modal to open and close again", () => {
    // ...
  });
});
