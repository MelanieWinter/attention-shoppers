# Attention Shoppers

_ANNOUNCER: "Good evening Grocery Depot guests, our registers will be closing shortly. Please make your final selections and bring your items to the registers located at the front of the store. We would like to remind you that our shopping hours tomorrow are from 7am to 7pm. Thank you for shopping at Grocery Depot and have a nice evening."_

## Whats Going On Here?

Sam is having a dinner party tonight with some friends but he forgot the grocery store is only open till 7! Help Sam find all the groceries on his list before getting kicked out.

## Wireframe

![Imgur](https://i.imgur.com/FK1dmyP.png)

## MVP

- Render a start screen with the announcer message, game-play instructions, and a start button.
- Render a game screen displaying a winding maze of shelves and food on them.
- Render the ingredients lists which will constitute what Sam needs to collect from the grocery store.
- Render Sam who moves using WASD through the isles and bumps into the food to collect them into his basket.
- Food items not on the ingredients list will be blocked from interaction.
- Render the lists to have a counter so the player knows how many ingredients you have collected and how many more are needed.
- Render a countdown timer.
- Sam must return back to the cashier with the correct food items in his basket before the time runs out to move to the next level.
- Each level will have a shorter time limit.

## Stretch Goals

- Randomly spawn foods onto the shelves while making sure there are at least enough to make Sam's meals.
- Randomly spawn Sam's ingredients lists from a large array of lists.
- As levels get higher, more ingredients lists will spawn at a time.
- Add grocery store, Muzak type music which can be switched on and off with the 'm' key.
- Ability to accidentally grab the wrong food and have to put it back (these foods will render as red onto the bottom of the ingredients list).
- Render a finished level screen which shows an image of Sam checking out at the cashier and a 'Next Level' button.
- Render a 'Failed Level' screen which shows an image of the grocery store with a closed sign and a 'Play Again' button.
- Render the coundown timer to start as green, then turn red and flash at 10 seconds left.
- Randomly spawn grocery shelf maze into different layouts.

## Tech Stack

- HTML 5
- Canvas
- CSS
- Vanilla JavaScript

## Potential Roadblocks

- Changing the sprite direction according to which direction Sam is walking.
- Figuring out how to randomly generate the foods onto shelves while making sure the necessary ingredients are still there.
- Increasing the tally when Sam collects the food items.
- Creating blocks so Sam can't just walk through or around the shelves.
