# Final-Project-JavaScript-Game

# Stealthy Serpents

My final project (which is an adaptation of the the popular "snake" game using JavaScript) which will recreate a combination of slither.io and the classic snake game, along with adding some of my own personal features, such as obstacles that grow more and more difficult as the game progresses.

Some of the pieces of code I am most proud of are the following:

![alt text](./images-here/Screen%20Shot%201.png)


This is one of my personal features that I added that will create a new obstacle or "cat" each time a player earns 5 points, which makes for a fun extra challenge! This also, funnily enough, took me way too long to figure out!

Another piece of code that is this one: 

![alt text](./images-here/screen%20shot%202.png)


I set a (count) parameter that will represent the number of obstacles I want to insert, which was useful for controlling not only how many obstacles I wanted to start with, along with how many I wanted to add based on how much the score climbs. I initiate the for loop, which will iterate up 1 each time until it reaches my count -1. Then inside my loop, I set an array of my directions. I then created the variable of randomDirection to store a randomly selected direction from the directions array my using Math.random() and multiplied it by the length of the directions array. I also used Math.floor to get a valid index within the array. From there, I made a new object called "obstacle" that had a random position on the x and y-axis, multiplying my Math.random() by the width and height of my canvas and dividing it by segmentSize, then rounding with Math.floor() again. I then had this randomly selected direction stored in randomDirection. I then had the newly created obstacle added to the obstacles array using the .push method. By the end, the obstacles array has new obstacle objects, each with a random position on the game canvas and a random direction.

I then had a moveObstacles function that checked if the obstacle had gone off the canvas by comparing its x and y coordinates with the canvas dimensions. If the obstacle is outside of the canvas, the code chooses a random side for the obstacle to respawn at.

![alt text](./images-here/screen%20shot%203.png)
![alt text](./images-here/screen%20shot%204.png)

In this moveObstacles() function, my switch statement assigns the obstacle's new x and y coordinates depending on the chosen side, making sure that it is placed back on the canvas at a random position along that side. After respawning the obstacle, it also calls another function I made, changeObstacleDirection(obstacle), to assign a new direction for the obstacle.

# Reach Goals
- Provide options of different levels of difficulty
- Customize images of cat, mouse, snake
- Make multiplayer 
- Make different pop-ups and buttons depending on the collision
- Have different obstacles do different things (for example, move in different directions)

# Works Referenced/Resources for Help:

image credits: 
https://unsplash.com/photos/C2PCa6DhlYE

Improvements/alternative solutions: 
https://www.youtube.com/watch?v=QTcIXok9wNY
https://www.youtube.com/watch?v=baBq5GAL0_U

troubleshooting:
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
https://www.w3schools.com/
 https://bobbyhadz.com/blog/javascript-referenceerror-cannot-access-before-initialization

