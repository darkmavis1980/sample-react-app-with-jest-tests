import {MakeUppercase} from './Utilities';

describe('MakeUppercase', () => {
  it('should transform the passed string', () => {
    const myWord = 'Steve';
    const result = MakeUppercase(myWord);
    expect(result).toBe(myWord.toUpperCase());
  });
});