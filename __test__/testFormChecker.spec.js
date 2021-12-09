import { checkForText } from '../src/client/js/formChecker'


describe("Testing the checker functionality", () => {
    // Testing checkForText with an empty input
    test("Testing the checkForText() function with empty input", () => {
           expect(checkForText("")).toBe(false);
    });
    //Testing checkForText with a sample input
    test("Testing the checkForText() function with proper input", () => {
           expect(checkForText("This is a test input")).toBe(true);
    });
});