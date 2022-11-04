# PrePacker

## Introduction

This MERN stack app is a digital checklist aimed at backpackers looking to plan what they want to bring on their next trip. Users are able to login, upload gear data (manually or with a web scraper), create PrePacker checklists, and use the lists to help them pack. This is mainly aimed at backpackers, but could be used for any trip, or simply to keep track of what gear you own.

[You can check out the app here](https://prepacker.netlify.app/)

The goal of this project was to make a MERN fullstack app for use as a portfolio item. It includes authentication and web scraping amongst other things. My previous project was mostly backend, so my main focus here was to improve my React and CSS skills. However, I wanted a full MERN stack to practice having everything together.

There are three main pages: the closet, the checklist creator, and the saved lists page. On the closet page, users can see all the equipment they have uploaded with more detail compared to the PrePacker page including price, weight, personal notes, and links to where they bought the items. They can upload and edit information about their gear here. The checklist creator page is where users select gear to make a custom checklist for their trips. Users can save these lists and access them on the saved lists page.

The project is almost complete, I just need to add a few more features such as the password recovery.

## Table of Contents

<ul>
  <li><a href="#demonstrations">Demonstrations</a></li>
  <ul>
    <li><a href="#creating">Creating a New Checklist</a></li>
    <li><a href="#adding">Adding New Gear</a></li>
    <li><a href="#scraper">Using the Web Scraper to Add New Gear</a></li>
    <li><a href="#saved">Saved Lists</a></li>
    <li><a href="#landing">Landing Page</a></li>
    <li><a href="#other">Other Features</a></li>
  </ul>
  <li><a href="#notes">Notes</a></li>
  <ul>
    <li><a href="#mongo">MongoDB and Mongoose</a></li>
    <li><a href="#control">Controllers and Routing</a></li>
    <li><a href="#web">Web Scraping</a></li>
    <li><a href="#auth">Authentication</a></li>
    <li><a href="#react">React</a></li>
    <li><a href="#org">Organization</a></li>
    <li><a href="#design">Design</a></li>
    <li><a href="#deploy">Deployment</a></li>
    <li><a href="#misc">Miscellaneous Notes</a></li>
  </ul>
  <li><a href="#future">Future Updates</a></li>
  <li><a href="#helpful">Resources</a></li>
</ul>

<a id="demonstrations"></a>

# Demonstrations

<a id="creating"></a>

## Creating a New Checklist

Here is an example of a user creating a new checklist. You can see new items being added and removed, the total weight being updated, and the list being saved:

![Example Create Checklist](https://i.imgur.com/Eg7UaJZ.gif)


<a id="adding"></a>

## Adding New Gear

Here is an example of a user adding new gear to their closet:

![Example User Adding Gear](https://i.imgur.com/q0HrfX7.gif)


<a id="scraper"></a>

## Using the Web Scraper to Add New Gear

Here is an example of the scraper in use. Any data found at the REI web address provided will be added to the fields. If data is not found for a specific field, it will be left blank. I may allow the user to scrape data from other websites in the future:

![Example Scraping](https://i.imgur.com/4s4mVma.gif)


<a id="saved"></a>

## Saved Lists

A condensed version of each list is shown on the saved lists page. The user can view all their saved lists, edit the lists, delete, and 'save as' to create a copy of a list:

![Example of Saved List](https://i.imgur.com/zm38F5x.gif)


<a id="landing"></a>

## Landing Page

New users will be greeted with a landing page that describes what the app can do:

![Example of the Landing Page 1](https://i.imgur.com/rw6tks3.png)
![Example of the Landing Page 2](https://i.imgur.com/3M6M2C0.png)


<a id="other"></a>

## Other Features

- When deleting a piece of gear from their closet, the user will be notified if the gear is being used in any lists. If they choose to delete a piece of gear that is in a list, the gear will be removed from that list.
- All lists and gear can be searched, edited, and deleted.

Example of searching and sorting the gear:

![Searching and Sorting the Gear](https://i.imgur.com/HOcRzo6.gif)

Example of the gear editor and delete windows:

![Example of the gear editor and delete windows](https://i.imgur.com/cDapgBW.gif)


<a id="notes"></a>

# Notes

<a id="mongo"></a>

## MongoDB and Mongoose

I have three Mongoose models:

    const userSchema = new Schema({
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    })

    const gearSchema = new Schema({
      gear_name: { type: String, required: true },
      weight: Number,
      price: Number,
      category: { type: String, required: true },
      notes: String,
      website: Schema.Types.Mixed,
      image_url: Schema.Types.Mixed, //Saved for future use
      user_id: { type: String, required: true }
    }, { timestamps: true })

    const checklistSchema = new Schema({
      checklist_name: { type: String, required: true },
      gear_items: [String], //Array of _id's
      checklist_notes: String,
      user_id: { type: String, required: true }
    }, { timestamps: true })

The `checklistSchema` contains a `gear_items` property that is an array of `gearSchema` IDs - rather than duplicating the gear data for every checklist, it made more sense to just reference it. The total weight of the list is calculated on the front end.

The `gearSchema` and `checklistSchema` both reference the `userSchema` via a `user_id` property. It is still unclear to me if there is any downside to using this relational database over Mongoose subdocuments. Is doing it this way causing any security or performance issues?


<a id="control"></a>

## Controllers and Routing

The controlling and routing is fairly simple - I basically just needed to be able to talk with MongoDB. The most complicated thing was the web scrapped, which is discussed below.


<a id="web"></a>

## Web Scraping

The frontend sends the url to the backend which uses cheerio and axios to grab any relevant data from an REI page. The REI product pages are mostly similar, but there are usually multiple options for data such as weight, price, and category. In these cases I would grab the first one found. Users are expected to confirm the information is correct - perhaps a warning should be placed.

If I allow for users to scrape from another website in the future, I will need to make sure the website has consistent product pages - I'm a little worried that Amazon's format would be a little too unpredictable for getting gear data.

Originally I planned to scrape image urls and use those as images next to the gear data. This looked really nice, however I soon realized that this would likely be a copyright violation, so I scrapped the idea. I may allow users to upload their own images in the future and host them on Imgur like I did with a my [Hiker Tracker App](https://github.com/andyarensman/Hiker-Tracker).


<a id="auth"></a>

## Authentication

My authentication uses json web token, bcrypt, and React context. The token is stored in local storage - this may need to change as I learn more about JWT. I am not using a refresh token for now, but I may add this in the future.

When the user returns to the website after previously being logged in, a `useEffect` hook will run because there is local storage data containing the access token. If the token is expired, a `401` status will return and the user will be logged out. If not, the user's data will be available for them. In order to get this to work in the `useEffect` hook, I had to omit my `logout` hook as a dependency. React doesn't like this, but I don't think it causes any problems.

If the token expires when the user is trying to post/edit/delete, the user will be logged out and sent back to the homepage. This is done by running a check on the response status - if it is `401`, the `logout` hook is fired. This may be confusing for the user, so if I make this project public, I will want to change it. It would be helpful to at least have a message for the user to read that would pop up on the homepage. Refresh tokens may also solve the problem.


<a id="react"></a>

## React

One of my main goals with this project was to gain a better understanding of React. I had twenty components, six pages, and a few hooks that helped me get used to the syntax of React.

I used React context for gear and checklist viewing, creating, deleting, and editing. This allowed for easier use in various components. I also used context for authentication.


<a id="org"></a>

## Organization

As the project progressed, I quickly had a lot of components and a lot of things to implement. In order to prevent myself from becoming overwhelmed, I divided up the components folder into sub-folders based on what page the component is being used for. There is some overlap, but it wasn't a problem. I also made a to do list with every feature I wanted to add so I could quickly look something up and start to add it.

I had a few functions I was using over and over again - I put these into a utils.js file in a helpers folder to keep it organized.


<a id="design"></a>

## Design

- To get a cool looking gradient for the header, I found a picture of a mountain skyline and grabbed the color of the bottom, middle, and top, then recreated the effect using the color values.
- The PrePacker logo was made with Adobe's logo maker - very cool free software.
- I decided to use css modules and keep them in a separate styles folder to help keep myself organized. I still kept the index.css file for some global things. The index-alt.css file is left over from a scrolling feature I may try to add back in later.


<a id="deploy"></a>

## Deployment

I used [Netlify](https://www.netlify.com/) for the frontend and [Adaptable.io](https://adaptable.io/) for the backend.

I ran into a few problems when deploying. Heroku would have been my first choice for the backend, but they recently announced that they would no longer be providing a free tier. The next tier up was too expensive for a portfolio project, so I did some research and eventually found Adaptable. They are currently in beta, but the sign up was super simple and they have very good customer support.

Because I'm hosting the backend and frontend at different locations, I needed to install [CORS](https://www.npmjs.com/package/cors) on the backend: `app.use(cors({ origin: process.env.CORS_URL }))`. The environment variable points to the url of the frontend. The best way to trouble shoot this was to go into the development tools of Chrome and look at the error messages in the console and the data in the network tab.

I also needed to use [environmental variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) in the frontend. Originally I was using a proxy in the `package.json` file to get around the CORS, but this doesn't work for deployment. So I made an environment variable for the backend url and attached it to the front of all my fetches.

It took a lot of tweaking to get it right, but eventually it all worked.

<a id="misc"></a>

## Miscellaneous Notes

- In order to use local storage to set state, I had to disable Strict Mode in the index.js. I may add it back in later to make sure I don't have any problems.
- Make sure to use array.forEach instead of array.map if you don't have a return value.
- I'm using axios, bcrypt, cheerio, dotenv, express, jsonwebtoken, mongoose, and validator on the backend and fontawesome, date-fns, react, and react-router-dom on the frontend.

<a id="future"></a>

# Future Updates

I may allow the user to upload photos, share their lists somehow, have container groupings, have a 'wearing' section that doesn't go towards the pack weight, include food and water weight, and possibly a few other things. Right now the checklists don't do much on their own - it would be nice to keep track of how many times a user used the list. If I were to open this up to the public, I might include a new page with tutorials on how to use the website.

<a id="helpful"></a>

# Resources

- The Net Ninja Youtube channel
  - I used a couple tutorials on this channel to understand the basics of a MERN stack, authentication, and to learn about some CSS styling
- ['Learn CORS In 6 Minutes'](https://www.youtube.com/watch?v=PNtFSVU-YTI) from the [Web Dev Simplified](https://www.youtube.com/c/WebDevSimplified) YouTube channel
- ['Free Heroku Alternatives'](https://github.com/DmitryScaletta/free-heroku-alternatives) by Dimitry Scaletta
- I need to credit the author of the backpack icon or find something else: <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>. I may also need to credit the designer of the mountain header