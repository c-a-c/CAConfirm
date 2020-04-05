# ARG = projectName

check: 
	node -v
	npm -v
	
install: 
	npm i @google/clasp -g
	npm i

create:
	clasp create --type standalone --rootDir ./dist --title aaa

run: 
	npm run deploy

open: 
	clasp open

test: 
	npm run test
