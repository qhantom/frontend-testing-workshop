import { describe, expect, it, vi } from "vitest";
import fetcher from "./fetcher";
import axios from "axios";

// set of related tests or benchmarks and other nested suites
describe("code snippet", () => {
  // alias 'test': defines a set of related expectations
  it("should fetch data from a given URL and return it", async () => {
    const url = "https://frachtwerk.de";
    const expectedData = { name: "Timo Test" };

    // Mock axios.get to return a resolved promise with the expected data
    vi.spyOn(axios, "get").mockResolvedValue({ data: expectedData });

    const result = await fetcher(url);

    expect(result).toEqual(expectedData);
    expect(axios.get).toHaveBeenCalledWith(url);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("should handle 404 response with error status codes", async () => {
    const url = "https://frachtwerk.de";
    const expectedError = new Error("Request failed with status code 404");

    // Mock axios.get to return a rejected promise with the expected error
    vi.spyOn(axios, "get").mockRejectedValue(expectedError);

    await expect(fetcher(url)).rejects.toThrow(expectedError);
    expect(axios.get).toHaveBeenCalledWith(url);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
