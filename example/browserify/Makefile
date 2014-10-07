BROWSERIFY = browserify

build: node_modules index.js
	@$(BROWSERIFY) index.js -o build.js

node_modules: package.json
	@npm install

clean:
	@rm -rf node_modules
	@rm -rf build.js

open:
	@open index.html

.PHONY: clean
