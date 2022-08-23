# PrePacker

## Introduction

The goal of this project is to make a MERN fullstack app for use as a portfolio item. It will include authentication and web scraping.

Users should be able to login, upload gear data (manually or with the scraper), and create PrePacker lists that will help them plan what to bring on a trip. This is mainly aimed at backpackers, but could be used for any trip, or simply to keep track of what items you own.

There will be two main pages: the closet and the PrePacker. On the closet page, users will be able to see all the equipment they have uploaded with more detail compared to the PrePacker page. The PrePacker page will be for creating lists for items to pack on a trip. Users will be able to save these lists for future use. Both pages will allow the user to upload new gear.

## Notes

Originally I planned to scrape image urls and use those as images next to the gear data. However, I soon realized that this would likely be a copyright violation, so I scrapped the idea. I may use some public domain icons to represent each gear category instead.

Creating the backend for the checklists was super simple - I just had to copy everything from the closet side of things (model, route, controller) and change a few variables.

In order to use local storage to set state, I had to disable Strict Mode in the index.js. I may add it back in later to make sure I don't have any problems.

I quickly had a lot of components and a lot of things to implement. In order to prevent myself from becoming overwhelmed, I divided up the components folder into sub-folders based on what page the component is being used for. I also made a to do list with every feature I want to add so I could quickly look something up and start to add it.

Make sure to use array.forEach instead of array.map if you don't have a return value.

Need to accredit the author of the mountain header: <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>

To get a cool looking gradient for the header, I found a picture of a mountain skyline and grabbed the color of the bottom, middle and top. The logo was made with Adobe's logo maker - very cool free software.