PATH := node_modules/.bin:$(PATH)

source_files = $(wildcard *.js src/*)

.DEFAULT_TARGET: all

all: node_modules .code_style build

node_modules: package.json
	npm install
	@touch $@

.code_style: $(source_files)
	semistandard
	@touch $@

build: node_modules $(source_files)
	node build.js
	@touch $@

build-watch: node_modules $(source_files)
	node build.js watch
	@touch $@
