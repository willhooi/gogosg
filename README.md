# GoGo SG (formerly known as CaiFan Kaki)

## Overview
This web app allows users to:
* search for areas of interests in Singapore (attractions, bars & clubs, food & beverage and  accomodation)
* add search items as to-do cards in favourite list
* view to-do cards in favourite list
* delete to-do cards in favourite list
* add user-generated entry to favourite list
* share favourite list to friends [to be completed]

## Architecture
[coming soon]


## Shared Coding Guidelines
* To start, clone remotely ```git clone https://github.com/IT5007-2320/course-project-whlws.git```
* Next, create a branch with ```git checkout -b <new branch name>```
* After updating, remember to add & commit:
- ```git add -A``` 
- ``git commit -m "<some commit message>"``
* Upload changes to Github: ``git push -u origin <new branch name>``
* Do a ``git pull origin main`` to grab any changes from main to your branch to avoid merge conflicts
* At Github page, at branch tab, click on 'New pull request'. Fill in comments and click ``Create pull request``
* If no merge conflicts, click ``Merge pull request``

* To see changes thus far, at CLI do:
- ``git checkout main``
- ``git pull``
* To delete branch that is unused from remote/local: ``git branch -D <name of branch to be deleted>``

## To start web app
* Clone github repo to local container
* Install dependencies ``npm install``
* Run auto-build scripts that sets up MongoDB, initialize DB, compile and start ``npm run build``
* At browser to go ``http://localhost:3000``




