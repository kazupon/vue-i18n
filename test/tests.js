/**
 * import(s)
 */

var i18n = require('vue-i18n');


describe('add', function () {
  it('should be 2', function (done) {
    expect(i18n(1, 1)).to.be.eql(2);
    done();
  });
});
