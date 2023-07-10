test("atribuição de objeto", () => {
  let data: any = { one: 1 };
  data.two = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
