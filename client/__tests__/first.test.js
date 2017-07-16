describe('test Add func', () => {
  const add = (a, b) => (a + b);
  it('add(1,2) should be 3', () => {
    expect(add(1,2)).toEqual(3);
  });
});