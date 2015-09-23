#!/usr/bin/env node

var fs = require('fs'),
	normalize = require('../index.js'),
	argv = process.argv;

normalize(
	argv[2] ? fs.createReadStream(argv[2]) : process.stdin,
	argv[3] ? fs.createWriteStream(argv[3]) : process.stdout
);
