const {
  convertTimestampToDate,
  getArticleIdByTitle
} = require("../db/seeds/utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("getArticleIdByTitle", () => {
  test("returns null if title is not found", () => {
    const title = "UNCOVERED: catspiracy to bring down democracy"
    const lookUpArr = [[1, "Living in the shadow of a great man"], [2, "Sony Vaio; or, The Laptop"], [3, "Eight pug gifs that remind me of mitch"], [4, "Student SUES Mitch!"]]
    const expectedOutcome = null
    const actualOutcome = getArticleIdByTitle(title, lookUpArr)
    expect(actualOutcome).toBe(expectedOutcome)
  })
  test("returns a number (article id) if title is found", () => {
    const title = "Student SUES Mitch!"
    const lookUpArr = [[1, "Living in the shadow of a great man"], [2, "Sony Vaio; or, The Laptop"], [3, "Eight pug gifs that remind me of mitch"], [4, "Student SUES Mitch!"]]
    const expectedOutcome = 4
    const actualOutcome = getArticleIdByTitle(title, lookUpArr)
    expect(actualOutcome).toBe(expectedOutcome)
  })
  test("does not mutate title", () => {
    const title = "Student SUES Mitch!"
    const titleCopy = "Student SUES Mitch!"
    const lookUpArr = [[1, "Living in the shadow of a great man"], [2, "Sony Vaio; or, The Laptop"], [3, "Eight pug gifs that remind me of mitch"], [4, "Student SUES Mitch!"]]
    getArticleIdByTitle(title, lookUpArr)
    expect(title).toBe(titleCopy)
  })
  test("does not mutate lookupArray", () => {
    const title = "Student SUES Mitch!"
    const lookUpArr = [[1, "Living in the shadow of a great man"], [2, "Sony Vaio; or, The Laptop"], [3, "Eight pug gifs that remind me of mitch"], [4, "Student SUES Mitch!"]]
    const lookUpArrCopy = [[1, "Living in the shadow of a great man"], [2, "Sony Vaio; or, The Laptop"], [3, "Eight pug gifs that remind me of mitch"], [4, "Student SUES Mitch!"]]
    getArticleIdByTitle(title, lookUpArr)
    expect(lookUpArr).toEqual(lookUpArrCopy)
  })
})