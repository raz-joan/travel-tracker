# Mod 2: Final Project: Travel Tracker  

Authored by: [Joan Rasmussen](https://github.com/raz-joan)  
Project Manager: [Cassandra Torske](https://github.com/CassandraGoose)  

Want to see it in action? --> [Deployed Site]()

## Table Of Contents
- [Overview](#overview)
- [Project Goals](#project-goals)
- [Project Spec / Rubric Link](#project-spec)
- [Setup Instructions](#setup-instructions)
- [Technologies](#technologies)
- [Code Architecture](#code-architecture)
- [Illustrations](#illustrations)
- [Reflections](#reflections)
- [Challenges](#challenges)
- [Wins](#wins)


## Overview  
  This goal of this solo project was to build a browser application that fetches data from a local server, which was provided. When visiting the site, a user will land on a log in page. Upon successful username and password input, they will be redirected to their home page. This dashboard shows all of their unique data, including: trips (past, present, upcoming, and pending), the total amount they have spent on trips this year (including a 10% agent fee), and they should be able to submit a new trip request to the travel agent.

## Project Goals  
  The learning goals of this project were to:  
  - Use OOP to drive the design of the application and the code.
  - Implement a robust testing suite using TDD.
  - Work with fetch API to send and receive data.
  - Track progress with a GitHub project board and solidify the code review process.
  - Write code that is accessible, DRY, and follows SRP.

## Project Spec  
  You can find the project rubric [here](https://frontend.turing.edu/projects/travel-tracker.html).  

## Setup Instructions  

1. Fork and then clone down this repo to your local machine.
2. Clone down the server [repo](https://github.com/turingschool-examples/travel-tracker-api), as well.
3. Separately, open the root folders for each repo in your terminal and run the command `npm install` to install the dependencies on both.
4. In your terminal, run `npm start` on both repos to initialize the server and webpage.
5. In your browser, enter [http://localhost:8080/](http://localhost:8080/) to see the project.
6. Follow the directions in the server README.md, to check the data at the various endpoints.  


## Technologies  
  Technologies used were: HTML, SCSS, MOCHA, CHAI, JAVASCRIPT, fetchAPI, GLIDE.JS, and DAY.JS.  

## Code Architecture  
  This application consists of one HTML file, four SCSS files, an images folder, three test files, two class files, one view-related code file, and three business-related code files. ES6 import and export syntax was used to tell Webpack how to bundle the files. The icons were sourced on [flaticon.com](https://www.flaticon.com/). Attribution is noted in the footer of the site.

## Illustrations  
#### Desktop Views:  
<img width="1439" alt="desktopLogin" src="https://user-images.githubusercontent.com/80644408/142063528-af07ee71-3014-4fa8-b9ce-4748472f75d8.png">  
<img width="1438" alt="desktopHomepage" src="https://user-images.githubusercontent.com/80644408/142063378-e509c0f6-3701-4d5b-8728-005d06c0fb43.png">  
<img width="1440" alt="desktopNewtrip" src="https://user-images.githubusercontent.com/80644408/142063392-fb3fafc2-7d7e-446e-9942-8a62ceb2b4a0.png">  

#### Tablet View (1st breakpoint):  
<img width="757" alt="tabletHomepage" src="https://user-images.githubusercontent.com/80644408/142063586-69fef184-2cce-43bf-9276-dc6ba6010286.png">  

#### Mobile View (2nd breakpoint):  
<img width="387" alt="mobileHomepage" src="https://user-images.githubusercontent.com/80644408/142063445-a7aad750-2486-45c1-881c-444ef4e930a3.png">

## Reflections  
  I found this project to be quite challenging, which fostered space for a great deal of learning. I appreciated the absolute freedom to design the structure of data, the view-related and business-related code files, and the visual design/layout of the web application. This helped to solidify the importance of planning, communication , and organization in both scheduling-out and building a code base. I particularly enjoyed thinking about the user's experience and how to make it easy and informative.

## Challenges  
  The most difficult part of this project was correctly implementing asynchronous functions using the fetchAPI, i.e. controlling the flow of data to the correct function at the correct time. I also found it difficult to decide what data to display, how to communicate it, and where it was located. I wanted each users experience to be unique, yet consistent. One special item that I created was a switch statement that gives different messages to the user depending upon their `travelerType`. In a future iteration, I would make this more dynamic by assigning an array to each type instead of a single string and then randomly choosing an element to display, so that the user experience is more varied/interesting.

## Wins  
  I am most proud of the following:  
  - Writing modular code and wrapping functions in objects, in order to use dot notation to call them elsewhere. This helped me to easily navigate the code base.
  - Learning and implementing two additional 3rd party libraries: Glide.js and Day.js.
  - The responsive design for desktop, tablet, and mobile.
  - Creating an accessible app. It is entirely tabbable and scored 100% on a lighthouse audit - see the unmerged branch: `feature/accessibilitiy-check`.
  - Using Mocha and Chai to write fairly thorough tests. In a future iteration, I would include testing for sad paths.
  - Error handling with APIs and possible user interactions.
