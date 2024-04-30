# GoGo SG (formerly known as CaiFan Kaki)

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Homepage.png" width="400">

## Overview
**Go Go SG** is akin to a tourist's 'to-do' list when exploring places of interest in Singapore. The general concept revolves the idea of users searching for places of interests and collecting interesting ones as 'cards' by adding them to their favourite collection. User can enter their own submission to add new cards and to delete them if needed. They can also share their card collection to their friends via a 3rd party email service.  

## Features
This web app allows users to:
* search for areas of interests in Singapore (attractions, bars & clubs, food & beverage and  accomodation)

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Search.png" width="400">

* add search items as to-do cards in favourite list

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Addfav.png" width="400">

* view to-do cards in favourite list

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Display.png" width="400">

* delete to-do cards in favourite list

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Delete.png" width="400">

* add user-generated entry to favourite list

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Addown.png" width="400">

* share favourite list to friends via email

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Shared.png" width="400">

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Email.png" width="400">

## Architecture Diagram
![architecture diagram](https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/gogosgv2.png)
1. Client page (front-end) retrieves user search query results/data from external API (using STB API) directly.
2. Data is displayed with buttons for user to add selected data to local DB via the graphql middleware.
3. When displaying data added, it will query and fetch directly from the local DB (via graphql)
4. When deleting data displayed (as cards), it will mutate data directly to local DB (via graphql), causing state changes which re-renders the display component.
5. User can add own user-generated data which is used to mutate data directly in the local DB (via graphql).
6. User can also share their favourite data to external party via an email template (using EmailJS webservice)  

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
* Clone to local directory: ``git clone https://github.com/IT5007-2320/course-project-whlws.git``
* At directory, install dependencies ``npm install``
* Run auto-build scripts that sets up MongoDB, initialize DB, compile and start ``npm run build``
* At browser to go ``http://localhost:3000``
* Summary:
  ```shell
  git clone https://github.com/IT5007-2320/course-project-whlws.git
  cd course-project-whlws
  npm install
  npm run build
  ```
## Reference
1. Project is inspired by a similar project by [Damian Boh](https://github.com/damianboh/sg_attractions_outings_django)
2. [ChatGPT](https://chat.openai.com/) is used as assistive tool to generate most CSS files, utils.js, checking of errors & improvement to general aesthetics.
3. Code base is primarily adapted from IT5007 assignments and modified accordingly. 



