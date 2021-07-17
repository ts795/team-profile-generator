const Engineer = require('../lib/Engineer');
 
describe('Engineer', () => {
  it('should initialize Engineer with passed in information and set the role', () => {
    const engineer = new Engineer("abcd", 1, "xyz@test.com", "ts795");
    expect(engineer.getName()).toEqual("abcd");
    expect(engineer.getId()).toEqual(1);
    expect(engineer.getEmail()).toEqual("xyz@test.com");
    expect(engineer.getRole()).toEqual("Engineer");
    expect(engineer.getGithub()).toEqual("ts795");
  });

});