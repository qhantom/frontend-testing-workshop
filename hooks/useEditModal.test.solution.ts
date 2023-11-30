import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useEditModal from "./useEditModal";

describe("useEditModal.ts", () => {
  it("should have initial state with isOpen set to false", () => {
    const { result } = renderHook(() => useEditModal());

    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle the modal to open and close again", () => {
    const { result } = renderHook(() => useEditModal());

    expect(result.current.isOpen).toBe(false);

    act(() => result.current.onOpen());

    expect(result.current.isOpen).toBe(true);

    act(() => result.current.onClose());

    expect(result.current.isOpen).toBe(false);
  });
});
