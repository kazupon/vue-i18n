SRC = $(wildcard lib/*.js)
C8 = node_modules/.bin/component
PONCHO = node_modules/.bin/poncho
REPORTER = dot


build: node_modules components $(SRC)
	@$(C8) build --dev -o test

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
	@rm -f test/build.js


.PHONY: test test_cov test_coveralls lib_cov clean
