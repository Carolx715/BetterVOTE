# BetterVOTE
Team Exabyte's project for ByteHacks 2020

## Inspiration
For ByteHacks’ theme, we had to come up with an **app that solved a problem during a historical event.** Our team’s chosen historical event is the 1898 Canadian prohibition plebiscite. This was the first nationwide referendum in Canadian history. This was a divisive topic and the vote in favour of the proposed legislation won by a slight margin, but ultimately, the Canadian government decided not to implement it due to only 44% voter turnout.

We wanted to make an app that would have had the potential to increase voter turnout, as well as eliminate more barriers that stand in the way of votes such as voter suppression tactics, and reduce the time and cost that goes into a referendum.

## What BetterVote Does

BetterVOTE is a mobile app for both Android and iOS that helps with conducting votes, referendums and plebiscites. It reduces the costs of conducting votes and referendums by presenting an option to vote online and decreases the use of certain vote suppression and intimidation tactics. It also makes it much easier for any organization (both political and apolitical) to operate democratically to make decisions. When a person first enters the app, they can register a new user profile through the registration page. Users are then automatically logged in and sent to the organizations page. Each organization is a separate entity with users and ballots. A logged in user can enter an organization by entering in its unique code on the organizations page or creating a new organization from the plus button menu.

Clicking on an organization will lead you to its individual page where you can see information at the top including your representative, user count, invite code and the date created. The second section is the active ballots where all the votes that are currently ongoing are displayed in their own card. These active ballots include both voted and unvoted ballots. Below that are two buttons labelled “Add New Ballot” and “View All Ballots”. “Add New Ballot” can be used to create a ballot with a name, description, percent to pass and ending date. “View All Ballots” will show all ballots that have expired. The final section shows a list of users in the organization. 

Clicking on a ballot in “Active Ballots” or in “View Completed Ballots” will take you to its respective page. There you can view the purpose of the ballot, the status (voted or not), description, who proposed it, arguments for supporting it, arguments for not supporting it, the vote threshold percentage to pass, the voter turnout so far and the end date. Below all of this is a button called “Add New Argument” which can be used to add an argument for or against the current motion if it is active. Finally, a button “Vote!” will be at the bottom if you haven’t voted in an active ballot. 

The “Vote!” button leads you to a page to either vote for, against or abstain from the current ballot. Successfully voting will lead you back to the organization’s page and an alert will pop up to confirm that your vote was submitted.  Completed ballots will display all of the previous information (title, description, arguments) for historical accuracy, show if it passed or failed and the finalized vote percentages.

Other features include a profile page button on the list of organizations which leads to a user’s profile. There, they can view their name, email, their list of organizations. There is also a section for more information, including the terms of service and a logout button.

SlideShow Presentation Here: https://docs.google.com/presentation/d/1Wr97-zyEMPbu1zl9BVycTq1GGVZjxuFjEt0wySWisj4/edit?usp=sharing
Video Demo: https://youtu.be/ErHqSElffvk

## How to run the application
1. Run `git clone https://github.com/Carolx715/ByteHacks.git` in your command line
2. `cd` into the project directory
3. Open up a command line and switch into the client directory (cd client).
4. Run the command `npm i` to install all the required dependencies and packages
5. Run `npm start` to initiate the Expo/React development server
6. You're all done!
7.  For more information, please visit the section titled “Expo CLI Quickstart” via the Following Link: https://reactnative.dev/docs/environment-setup 

Currently, the server is hosted on a DigitalOcean VM using the code in the server folder. To run the server, switch into the server directory (cd server), install dependencies (npm i) and run `node index.js` to start the server. Make sure to switch all references from the current DigitalOcean server URI to the new server URI.

## How we Built our Project
We built our product using **MongoDB, React Native, Express and Node.** We chose React Native for the front end because it allows for cross platform support on both iOS and Android with the same code. The backend was built using Express and Node because our team had prior experience with these technologies. We used MongoDB for our database structure because we felt that a document oriented NoSQL database best fit our needs. For the backend, we also used a JWT token for authorization and bcrypt password hashing for industry standard password security.

## Challenges we ran into
We ran into multiple challenges over the four days as we built our app as this was the first time any of us had used React Native. The notable ones include drawer components, React lifecycle hooks (figuring out how to update and re-render components when the database is updated), making GET and POST requests with the JWT token and styling. Styling was especially challenging and we had to style multiple components that interacted with each other. We also were unable to use a date and time picker component when creating a ballot as it didn’t display properly and we were unable to get the time the user had chosen. Instead, we opted to just use a single text field where the user would enter the end date and time of the ballot in JavaScript ISO format (UTC Time). 

## Accomplishments we are Proud Of
There are many accomplishments that we are proud of. Some of these include building an app from scratch for the first time that is efficient, reusable and has a scalable design. On the backend side, we are most proud of the complex logic that involves multiple users, organizations and ballots. On the front end, we’re proud of the array of features we can offer the user including making new organizations, joining existing organizations, making new ballots, voting and viewing past ballots. Other cool features also include multiple user registration and using AsyncStorage to authorize users and remember them. 

## What we learned
In short, a lot. Some of the things we learned include: React Native, building and utilizing a REST API, using GitHub/version control more effectively, user authentication (and JWT tokens), Formik and Yup for form input verification, AsyncStorage, designing efficient and effective mongoDB schema and momentJS.
