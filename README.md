*README work in progress*

# PrePacker

## Introduction

The goal of this project is to make a MERN fullstack app for use as a portfolio item. It will include authentication and web scraping amongst other things. I am hoping to improve my React and CSS skills mainly, but I wanted a full MERN stack to practice having everything together.

Users should be able to login, upload gear data (manually or with the scraper), and create PrePacker lists that will help them plan what to bring on a trip. This is mainly aimed at backpackers, but could be used for any trip, or simply to keep track of what items you own.

There will be two main pages: the closet and the PrePacker. On the closet page, users will be able to see all the equipment they have uploaded with more detail compared to the PrePacker page. The PrePacker page will be for creating lists for items to pack on a trip. Users will be able to save these lists for future use.

The project is almost complete, I just need to add a few more feature such as the password recovery and mobile css.

# Demonstrations

## Creating a New Checklist

Here is an example of a user creating a new checklist. You can see new items being added and removed, the total weight being updated, and the list being saved.

![Example Create Checklist](https://i.imgur.com/Eg7UaJZ.gif)

## Adding New Gear

Here is an example of a user adding new gear to their closet.

![Example User Adding Gear](https://i.imgur.com/q0HrfX7.gif)

## Using the Web Scraper to Add New Gear

Here is an example of the scraper in use. Any data found at the REI web address provided will be added to the fields. If data is not found for a specific field, it will be left blank:

![Example Scraping](https://i.imgur.com/4s4mVma.gif)

## Saved Lists

A condensed version of each list is shown on the saved lists page. The user can view all their saved lists, edit the lists, delete, and save as to create a copy of a list.

![Example of Saved List](https://i.imgur.com/zm38F5x.gif)

## Landing Page

New users will be greeted with a landing page that describes what the app can do.

![Example of the Landing Page 1](https://i.imgur.com/rw6tks3.png)
![Example of the Landing Page 2](https://i.imgur.com/3M6M2C0.png)

## Other Features

- When deleting a piece of gear from their closet, the user will be notified if the gear is being used in any lists. If they choose to delete a piece of gear that is in a list, the gear will be removed from that list.
- All lists and gear can be searched, edited, and deleted.

Example of searching and sorting the gear:

![Searching and Sorting the Gear](https://i.imgur.com/HOcRzo6.gif)

Example of the gear editor and delete windows:

![Example of the gear editor and delete windows](https://i.imgur.com/cDapgBW.gif)

# Notes

## Backend

*[Add in the schemas?]*

Creating the backend for the checklists was super simple - I just had to copy everything from the closet side of things (model, route, controller) and change a few variables.

It is still unclear to me if there is any downside to using a relational database over subdocuments. Currently each checklist and gear item is connected to their user via a user_id property. Would this cause any security or performance issues?

## Authentication

*[To add later]*

## React

*[Notes about context, hooks, helpers?]*

## Web Scraping

Originally I planned to scrape image urls and use those as images next to the gear data. However, I soon realized that this would likely be a copyright violation, so I scrapped the idea. I may use some public domain icons to represent each gear category instead, or allow users to upload their own images.

## Organization

I quickly had a lot of components and a lot of things to implement. In order to prevent myself from becoming overwhelmed, I divided up the components folder into sub-folders based on what page the component is being used for. I also made a to do list with every feature I want to add so I could quickly look something up and start to add it.

I had a few functions I was using over and over again - I put these into a utils.js file in a helpers folder to keep it organized.

## Design

- To get a cool looking gradient for the header, I found a picture of a mountain skyline and grabbed the color of the bottom, middle, and top.
- The PrePacker logo was made with Adobe's logo maker - very cool free software.
- I decided to use css modules and keep them in a separate styles folder to help keep myself organized. I still kept the index.css file for some global things.


## Miscellaneous Notes

*[Talk about any dependencies?]*

- In order to use local storage to set state, I had to disable Strict Mode in the index.js. I may add it back in later to make sure I don't have any problems.
- Make sure to use array.forEach instead of array.map if you don't have a return value.

# Future Updates

I may allow the user to upload photos, share their lists somehow, have container groupings, have a 'wearing' section that doesn't go towards the pack weight, include food and water weight, and possibly a few other things.

# Resources

- The Net Ninja Youtube channel
  - I used a couple tutorials on this channel to get a very basic MERN stack setup, authentication, and to learn about some CSS styling.
- I need to credit the author of the backpack icon or find something else: <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>. I may also need to credit the designer of the mountain header.