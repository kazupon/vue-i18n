C8 = ../node_modules/.bin/component

build: components index.js
	@$(C8) build --dev

components: component.json
	@$(C8) install --dev

clean:
	@rm -rf components
	@rm -rf build

open:
	@open index.html

.PHONY: clean
