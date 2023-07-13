#!/bin/bash

rsync -av --progress ~/Sites/six-storyblok-library/ ~/Sites/another-tomorrow-evrythng/node_modules/six-storyblok-library --exclude node_modules --exclude .git --exclude .idea --delete
