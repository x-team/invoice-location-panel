.PHONY: install start lint docs

install:
	./scripts/install.sh

build:
	make clean
	./scripts/build.sh

dev:
	make clean
	./scripts/dev.sh

docs:
	./scripts/docs.sh

clean:
	rm -rf ./dist

lint:
	./scripts/lint.sh

test:
	./scripts/test.sh
