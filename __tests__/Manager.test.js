const Manager = require('../lib/Manager');
 
describe('Manager', () => {
  it('should initialize Manager with passed in information and set the role', () => {
    const manager = new Manager("abcd", 1, "xyz@test.com", 101);
    expect(manager.getName()).toEqual("abcd");
    expect(manager.getId()).toEqual(1);
    expect(manager.getEmail()).toEqual("xyz@test.com");
    expect(manager.getRole()).toEqual("Manager");
    expect(manager.officeNumber).toEqual(101);
  });

});