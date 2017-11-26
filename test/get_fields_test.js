const expect = chai.expect;

expectation = [
  { "address_line_1" : "Address Line 1" },
  { "cc_number" : "Number" },
  { "cc_type" : "Type" },
  { "country" : "Country" },
  { "first_name" : "First Name" },
  { "last_name" : "Last Name" }
];

describe('Widget #getFields', () => {

  before((done) => {
    fixture.setBase('assets');
    fixture.load('context.html');

    window.top.addEventListener('frames:loaded', function (event) {
      this.result = window.top[event.detail.widget].getFields();  
      done();  
    }.bind(this));
  });

  it('should extract the fields', () => {
    console.log(this.result);
    expect(this.result).to.deep.equal(expectation);
  });
});
