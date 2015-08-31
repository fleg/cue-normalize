'use strict';

var nl = require('os').EOL,
	byline = require('byline'),
	through2 = require('through2');

function zeroPad(number, zeros) {
	return Array(zeros - number.toString().length + 1).join("0") + number;
}

var normalize = module.exports = function normalize(input, output, callback) {
	var re = /(\ *track\ +)(\d+)(\ +audio\ *)/ig,
		track = 1;

	callback = callback || function() {};

	input.pipe(byline.createStream())
		.pipe(through2(function(chunk, enc, cb) {
			var match = re.exec(chunk.toString());

			if(match) {
				cb(null, match[1] + zeroPad(track++, 2) + match[3] + nl);
			} else {
				cb(null, chunk + nl);
			}
		}))
		.pipe(output)
		.on('finish', callback);
};
