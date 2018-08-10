import {MakeUppercase, ConsoleStuff} from './Utilities';

describe('MakeUppercase', () => {
  it('should transform the passed string', () => {
    const myWord = 'Steve';
    const result = MakeUppercase(myWord);
    expect(result).toBe(myWord.toUpperCase());
  });
});

describe('ConsoleStuff', () => {
  it('should call the console.log', () => {
    const spy = jest.spyOn(global.console, 'log');
    const logMessage = 'Hello world';
    ConsoleStuff(logMessage);
    expect(spy).toHaveBeenCalled();
  });
});