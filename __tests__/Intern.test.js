const Intern = require('../lib/Intern');
 
describe('Intern', () => {
  it('should initialize Intern with passed in information and set the role', () => {
    const intern = new Intern("abcd", 1, "xyz@test.com", "UC Berkeley Extension");
    expect(intern.getName()).toEqual("abcd");
    expect(intern.getId()).toEqual(1);
    expect(intern.getEmail()).toEqual("xyz@test.com");
    expect(intern.getRole()).toEqual("Intern");
    expect(intern.getSchool()).toEqual("UC Berkeley Extension");
  });

});