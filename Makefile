HERE :=  $(shell pwd)

build:
	docker build --build-arg apikey=$(APIKEY) --rm=true --force-rm=true -t emdko-chan .

run:
	docker run -it -v "$(HERE)/src:/workspace/src" -v "$(HERE)/assets:/workspace/assets" --rm --name emdko-chan-running emdko-chan