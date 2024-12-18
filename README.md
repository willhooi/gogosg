﻿# GoGo SG
IT5007 Final Project Submission

## Team 1
1. Li Weishi -A0265035J
2. Hooi Yuk Chuan (William) -A0265028E

## Demo
* [YouTube link](https://youtu.be/wtMuGWVAUeY)
* [Google Drive link](https://drive.google.com/file/d/19sBvkV1BiO5EZSL869OPkujr1oPFDxJJ/view?usp=drive_link)

## Overview

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Homepage.png" width="400">

**Go Go SG** is akin to a tourist's 'to-do' list when exploring places of interest in Singapore. The general concept revolves the idea of users searching for places of interests and collecting interesting ones as 'cards' by adding them to their favourite collection. User can enter their own submission to add new cards and to delete them if needed. They can also share their card collection to their friends via a 3rd party email service. In this way, we hope to 'gamify' the travel experience to be fun, interesting and social.   

## Features
This web app allows users to:

1. Search for places of interests in Singapore

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Search.png" width="500">

* user selects from a drop-down menu of attractions, bars & clubs, food & beverage and accommodation and enter free text of search item.

2. Add search items as to-do cards in favourite list

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Addfav.png" width="500">

* search results is displayed as 'cards' and user can add selected cards to a favourite list.
* after button is clicked, it will be greyed out

3. View to-do cards in favourite list

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Display.png" width="500">

* Place details are displayed as cards and colour-coded according to the input type (Accomodation is green, Attractions is orange, Food & Beverage is red and user-generated content is blue)

4. Delete to-do cards in favourite list

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Delete.png" width="500">

* Cards can be removed from the list by clicking on button.
* If there is no card available, a message will be displayed.

5. Add user-generated entry to favourite list

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Addown.png" width="500">

* user can enter own input and add by clicking on button.

6. Share favourite list to friends via email

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Shared.png" width="500">

<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/Email.png" width="500">

* At the display list, user has the option to share the list by entering email of recipient and name of sender.
* The input will be used to trigger an external webservice, EmailJS to send an email
* Upon success (or error), a message will be displayed.
* Email is formatted to rank list and count number of items sent.

Addtional Features include:

1. User authentication at login (handled by Google Sign-in) for secured sign-in.
2. Personalized persisted database for user to store their own favourite collection of cards.
3. Choice of emoji icons as avatars as a bonus fun feature to improve overall site visuals.✌

## Architecture Diagram
<img src="https://github.com/IT5007-2320/course-project-whlws/blob/main/ui/src/assets/gogosgv4.jpeg" width="600">

### Authentication
1. At login, user sign in using their Google account credentials. Client page requests access and upon successful authorization, access token (JWT) will be sent back.
2. Client page renders and user proceeds to homepage.
3. Upon loggin out, it will re-renders the initial login page

### Data Flow
1. Client page (front-end) retrieves user search query results/data from external API (using STB API) directly.
2. Data is displayed with buttons for user to add selected data to local DB via the graphql middleware.
3. When displaying data added, it will query and fetch directly from the local DB (via graphql middleware)
4. When deleting data displayed (as cards), it will mutate data directly to local DB (via graphql middleware), causing state changes which re-renders the display component.
5. User can add own user-generated data which is used to mutate data directly in the local DB (via graphql).
6. User can also share their favourite data to external party via an email template (using EmailJS webservice)  

### Front-end Considerations
1. UI is intentionally simplified with as little text for better user experience.
2. Visually the design is simple, with little images, uses emoji icons as graphic elements and uses a 'card' theme. Colours are mostly duo tone with red and white to represent Singapore.
3. Pages are scaled responsively to allow different view ports.

### Back-end Considerations
1. Query to DB uses user's name obtained from Google sign-in as a filter to retrieve only data related to ther user. This allow user to maintain session and persistant data even after user log off and logs in again.
2. Initial data are inserted automatically but should be not appear to users. Users will only see those that they added i.e. favourite cards.

### 3rd Party Applications
1. The [Singapore Tourism Information & Service Hub (TIH) API](https://tih-dev.stb.gov.sg/api-products-documentation) provides the attractions data (limited to 20 items per query).
2. [EmailJS](https://www.emailjs.com/) webservice is used to send templated-email to external users.
3. [Google Identity Sign In API](https://developers.google.com/identity/sign-in/web/sign-in) to sign in users as login using their Google accounts.

## Shared Coding Guidelines
* To start, clone remotely ```git clone https://github.com/willhooi/gogosg.git```
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
* Clone to local directory: ``git clone https://github.com/willhooi/gogosg.git``
* At directory, install dependencies ``npm install``
* If have any error issues, can try ``nvm install 22.0.0`` first. 
* Run auto-build scripts that sets up MongoDB, initialize DB, compile and start ``npm run build``
* At browser to go ``http://localhost:3000``
* Summary:
  ```shell
  git clone https://github.com/willhooi/gogosg.git
  cd gogosg/ui
  npm install
  npm run build
  ```
## Reference
1. Project is inspired by a similar project by [Damian Boh](https://github.com/damianboh/sg_attractions_outings_django)
2. [ChatGPT](https://chat.openai.com/) is used as assistive tool to generate most CSS files, utils.js, fetchimage blob function, passing props to some components, checking for & fixing errors and suggest improvements on general code aesthetics.
3. Code base is heavily adapted from IT5007 assignment templates and modified accordingly. 

