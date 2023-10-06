# Attention Shoppers

_ANNOUNCER: "Attention Grocery Depot shoppers, our register will be closing shortly. Please make your final selections and bring your items to the register located at the front of the store. We would like to remind you that our shopping hours tomorrow are from 7am to 7pm. Thank you for shopping at Grocery Depot and have a nice evening."_

## Whats Going On Here?

Sam is having a dinner party tonight with some friends, but he forgot the grocery store is only open till 7! Help Sam find all the groceries on his list before getting kicked out.

## Wireframe

![Imgur](https://i.imgur.com/FK1dmyP.png)

## MVP

- A starting screen with the 'attention shoppers' announcement, game-play instructions, and a start button
- A game screen displaying a winding maze of shelves with food items on them.
  - These might be organized by department (i.e. Dairy, Meat, Dry Goods, Produce, etc.)
- Recipes which will constitute what Sam needs to collect from the grocery store
- Render Sam, who moves through the aisles using WASD
- To collect a food item, Sam will bump into the object
- The food item will disappear when interacted with
- Food items not in the recipes will be blocked from interaction
- Recipes will have a tally, so the player knows how many ingredients have been collected, and how many more are still needed
- There will be a countdown timer
  - Level 1 will probably be 60 seconds
- Sam must return back to the cashier (front of the store) to 'check out'
- To proceed to the next level
  - All food items, from the recipes, must be collected
  - Make it back to the cashier before the countdown timer runs out
- Each level will have a shorter time limit

## Stretch Goals

- Randomly spawn food items onto the shelves
- Randomly spawn recipes from a large array of lists
- Randomly spawn grocery shelf maze into different layouts
- As levels get higher, more recipes will spawn at a time
- Add grocery store, Muzak type, music which can be switched on and off with the 'm' key
- Accidentally grabbing the wrong food will remove 3 seconds from the timer
- A starting screen which shows an image of the Grocery Depot employee (looking exhausted) making the 'attention shoppers' announcement
- A 'Finished Level' screen, which shows an image of Sam checking out at the cashier, and a 'Next Level' button
- A 'Failed Level' screen, which shows an image of the grocery store with a closed sign, and a 'Play Again' button
- Have the coundown timer start as green; then turn red and flash at 10 seconds left

## Tech Stack

- HTML 5
- Canvas
- CSS
- Vanilla JavaScript

## Potential Roadblocks

- Changing the sprite image according to which direction Sam is walking
- Randomly generating the food items onto shelves, while making sure the necessary ingredients to pass the level are present
- Randomly spawning the grocery shelf maze into different viable layouts
- Increasing the tally when Sam collects the food items
- Creating blocks so Sam can't walk through, or around the shelves
