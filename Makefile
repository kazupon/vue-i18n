C8 = node_modules/.bin/component
PONCHO = node_modules/.bin/poncho
REPORTER = dot


build: check node_modules components index.js
	@$(C8) build --dev -o test

dist: check node_modules components index.js
	@$(C8) build --standalone vue-i18n -o dist -n vue-i18n

check:
	@node_modules/.bin/jshint --config .jshintrc --exclude-path .jshintignore \
		index.js test/specs/index.js

components: component.json
	@$(C8) install --dev

node_modules: package.json
	@npm install

test: build
	@node_modules/.bin/mocha-phantomjs --reporter $(REPORTER) test/index.html

test_cov: build
	@$(PONCHO) test/index.html

test_coveralls: build
	echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@$(PONCHO) --reporter lcov test/index.html | node_modules/.bin/coveralls

clean:
	@rm -rf test/build.js dist


.PHONY: test test_cov test_coveralls lib_cov clean
