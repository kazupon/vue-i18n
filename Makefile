KARMA = ./node_modules/karma/bin/karma
MOCHA = ./node_modules/mocha/bin/_mocha
SRCS = ./index.js ./test/specs/*.js


dist: lint node_modules
	@./task/dist

minify: lint node_modules
	@./task/minify

lint:
	@node_modules/.bin/jshint --config .jshintrc --exclude-path .jshintignore $(SRCS)

node_modules: package.json
	@npm install

test: lint node_modules
	@$(KARMA) start

coverage:
	@VUE_I18N_TYPE=coverage $(MAKE) test

coveralls:
	@VUE_I18N_TYPE=coveralls $(MAKE) test

e2e:
	@$(MOCHA) -R dot ./test/e2e/index.js

sauce1:
	@VUE_I18N_TYPE=sauce SAUCE=batch1 $(MAKE) test
	
sauce2:
	@VUE_I18N_TYPE=sauce SAUCE=batch2 $(MAKE) test

sauce3:
	@VUE_I18N_TYPE=sauce SAUCE=batch3 $(MAKE) test

sauce: sauce1 sauce2 sauce3

ci: coverage coveralls e2e sauce

clean:
	@rm -rf coverage
	@rm -rf dist


.PHONY: dist lint test coverage node_modules clean
