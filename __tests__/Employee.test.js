const Employee = require('../lib/Employee');
 
describe('Employee', () => {
  it('should initialize Employee with passed in information and set the role', () => {
    const emp = new Employee("abcd", 1, "xyz@test.com");
    expect(emp.getName()).toEqual("abcd");
    expect(emp.getId()).toEqual(1);
    expect(emp.getEmail()).toEqual("xyz@test.com");
    expect(emp.getRole()).toEqual("Employee");
  });

});