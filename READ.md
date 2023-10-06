# Attention Shoppers

_ANNOUNCER: "Good evening Grocery Depot guests, our registers will be closing in one minute. Please make your final selections and bring your items to the registers located at the front of the store. We would like to reind you that our shopping hours tomorrow are from 7am to 7pm. Thank you for shopping at Grocery Depot and have a nice evening."_

## Whats Going On Here?

Sam is having a dinner party tonight with some friends but he forgot the grocery store is only open till 7! Help Sam find all the groceries he needs before he gets kicked out in ONE minute!

## MVP

- Render a start screen with the announcer message, game-play instructions, and a start button.
- Render a game screen displaying a winding maze of shelves and food on them.
- Render the dishes/ingredients lists which will constitute what Sam needs to collect from the grocery store.
- Render Sam who moves using WASD through the isles and bumps into the food to collect them into his basket.
- Render the lists to have a counter so the player knows how many foods you have collected and how many more are needed.
- Render a timer which starts as green then turns red at 10 seconds left.
- Sam must return back to the cashier with the correct foods in his basket before the time runs out to move to the next level.
- Each level will have a shorter time limit.

## Stretch Goals

- Randomly spawn foods onto the shelves while making sure there are at least enough to make Sam's meals
- Randomly spawn Sam's dishes/ingredients lists from a large array of lists.
- Add grocery store, Muzak type music which can be switched on and off with the 'm' key.
- Ability to accidentally grab the wrong food and have to put it back (these foods will render as red onto the bottom of the ingredients list).
- Render a finished level screen which shows and image of Sam checking out at the cashier and a 'Next Level' button.
- Render a failed level screen which shows and image of the grocery store with a closed sign and a 'Play Again' button.

## Tech Stack

- HTML 5
- CSS
- Vanilla JavaScript

## Potential Roadblocks

- Canvas is going to be a large undertaking in general.
- Figuring out how to randomly generate the foods onto shelves while making sure the necessary ingredients are still there.
- Increasing the tally when Sam collects the food items.
- Creating blocks so Sam can't just walk through or around the shelves.
