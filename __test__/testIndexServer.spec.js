import "babel-polyfill";
import { listening } from "../src/server/index"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
describe("Testing the listening functionality from server(index.js)", () => {
    // Testing listening 
    test("Testing the port listening() function", () => {
           expect(listening).toBeUndefined();
})
});