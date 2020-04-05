# ARG = projectName

install: 
	npm i @google/clasp -g
	npm i

check: 
	node -v
	npm -v

create:
	clasp create --type standalone --rootDir ./dist --title aaa

run: 
	npm run deploy

open: 
	clasp open

test: 
	npm run test
