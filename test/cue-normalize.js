var expect = require('expect.js')
	fs = require('fs'),
	streamEqual = require('stream-equal'),
	os = require('os'),
	path = require('path'),
	normalize = require('../index.js');

describe('main', function() {
	it('should equal to expected', function(done) {
		var tmp = path.join(os.tmpdir(), 'normalized.cue'),
			good = fs.createReadStream('./test/fixtures/good.cue'),
			bad = fs.createReadStream('./test/fixtures/bad.cue'),
			normalized = fs.createWriteStream(tmp);

		normalize(bad, normalized, function() {
			streamEqual(good, fs.createReadStream(tmp), function(err, equal) {
				fs.unlink(tmp);
				
				expect(equal).be.ok();
				expect(err).not.be.ok();
				done(err);
			});
		});
	});
});