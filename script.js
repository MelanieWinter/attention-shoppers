let board1;

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

class Boundary {
    static width = 32;
    static height = 32;
     // pass properties into constructor as an object so order doesn't matter
    constructor({ position, image }) { 
        this.position = position;
        this.width = 32;
        this.height = 32;
        this.image = image;
        this.originalImage = image;
    };

    draw() {
        // c.fillStyle = 'rgb(59, 90, 175)';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.drawImage(this.image, this.position.x, this.position.y);
    }

    resetImage() {
        this.image = this.originalImage;
    }
};

class StoreItem {
    static width = 32;
    static height = 32;
     // pass properties into constructor as an object so order doesn't matter
    constructor({ position, image }) { 
        this.position = position;
        this.width = 32;
        this.height = 32;
        this.image = image;
        this.originalImage = image;
    };

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }

    resetImage() {
        this.image = this.originalImage;
    }

    update() {

    };
};

class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 10;
    };

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'rgb(238, 206, 179)';
        c.fill();
        c.strokeStyle = 'rgb(148, 101, 54)';
        c.stroke();
        c.closePath();
    };

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        // console.log('Player Position:', this.position);
        this.draw();
    };
};

// class Employee {
//     constructor({ position, velocity }) {
//         this.position = position;
//         this.velocity = velocity;
//         this.radius = 15;
//         this.prevCollisions = [];
//     };

//     draw() {
//         c.beginPath();
//         c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
//         c.fillStyle = 'yellow';
//         c.fill();
//         c.strokeStyle = 'red';
//         c.stroke();
//         c.closePath();
//     };

//     update()  {
//         this.draw()
//         this.position.x += this.velocity.x
//         this.position.y += this.velocity.y
//     }
// }

class Food {
    constructor({ type, position, image }) {
        this.type = type;
        this.position = position;
        this.width = 32;
        this.height = 32;
        this.image = image;
        this.originalImage = image;
    };

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    };

    update() {
        this.position.x;
        this.position.y;
        this.draw();
    };

    resetImage() {
        this.image = this.originalImage;
    }

};


const food = [];
const boundaries = [];
const storeItems = [];


// const employee = new Employee({
//         position: {
//             x: Boundary.width + Boundary.width * 6.5,
//             y: Boundary.height + Boundary.height - 15,
//         },
//         velocity: {
//             x: 5,
//             y: 5,
//         }
//     })

const sam = new Player({
    position: {
        x: Boundary.width + Boundary.width * 13.5,
        y: Boundary.height + Boundary.height - 15,
    },
    velocity: {
        x: 0,
        y: 0,
    }
});

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '[', ']', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['l', '*', '+', '+', '+', '+', '+', ' ', ' ', ' ', 'C', 'C', ' ', ' ', ' ', ' ', 'C', 'C', ' ', ' ', ' ', ' ', '+', '+', '+', '+', '+', '+', '+', 'r'],
    ['l', '*', ' ', ' ', ' ', 'ck', 'ck', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*', 'r'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '^', ' ', ' ', '^', ' ', ' ', '^', 'ch', ' ', '^', ' ', ' ', '^', 'br', ' ', ' ', 'ba', 'ba', ' ', '*', 'r'],
    ['l', '*', ' ', '<', '+', '+', '>', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', 'ch', ' ', '*', ' ', ' ', '*', 'br', '<', '+', '+', '>', ' ', '*', 'r'],
    ['l', '*', ' ', '<', '+', '+', '>', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', 'ch', ' ', '*', ' ', ' ', '*', 'br', '<', '+', '+', '>', ' ', '*', 'r'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*', 'r'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*', 'r'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*', 'r'],
    ['l', '*', ' ', '<', '+', '+', '>', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', 'ja', ' ', '*', ' ', '<', '+', '+', '>', 't', '*', 'r'],
    ['l', '*', ' ', '<', '+', '+', '>', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', 'ja', ' ', '*', ' ', '<', '+', '+', '>', 't', '*', 'r'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '~', ' ', ' ', '~', ' ', ' ', '~', ' ', ' ', '~', 'ja', ' ', '~', ' ', ' ', ' ', ' ', ' ', 't', '*', 'r'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'eg', 'eg', 'eg', 'mi', 'mi', 'mi', 'cz', 'cz', 'cz', ' ', '*', 'r'],
    ['l', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '*', 'r'],
    ['4', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '3'],
];

const rows = map.length;
const columns = map[0].length;
const canvasWidth = 960;
const canvasHeight = 480;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

function createImage(src) {
    const image = new Image();
    image.src = src;
    return image;
};

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case 'C':
                storeItems.push(
                    new StoreItem({
                        position: {
                            x: StoreItem.width * j,
                            y: StoreItem.height * i,
                        },
                        image: createImage('./img/cashier.png'),
                    })
                )
                break;
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/wallTop.png'),
                    })
                )
                break;
            case '_':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/wallBottom.png'),
                    })
                )
                break;
            case 'l':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/wallLeft.png'),
                    })
                )
                break;
            case 'r':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/wallRight.png'),
                    })
                )
                break;

            case '1':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/wallCorner1.png'),
                })
            )
            break;
            case '2':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/wallCorner2.png'),
                    })
                )
                break;
            case '3':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/wallCorner3.png'),
                    })
                )
                break;
            case '4':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/wallCorner4.png'),
                    })
                )
                break;
            case '[':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/doorLeft.png'),
                    })
                )
                break;
            case ']':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/doorRight.png'),
                    })
                )
                break;
            case '*':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/woodShelfVertical.png'),
                    })
                )
                break;
            case '^':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/woodShelfTop.png'),
                    })
                )
                break;
            case '~':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/woodShelfBottom.png'),
                    })
                )
                break;
            case '+':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/woodShelfHorizontal.png'),
                    })
                )
                break;
            case '<':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/woodShelfLeft.png'),
                    })
                )
                break;
            case '>':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/woodShelfRight.png'),
                    })
                )
                break;
            case 'mi':
                food.push(
                    new Food({
                        type: 'Milk',
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i + 25,
                        },
                        image: createImage('./imgFood32/milk.png'),
                    })
                )
                break;
            case 'eg':
                food.push(
                    new Food({
                        type: 'Eggs',
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i + 25,
                        },
                        image: createImage('./imgFood32/eggs.png'),
                    })
                )
                break;     
            case 'ch':
                food.push(
                    new Food({
                        type: 'Chips',
                        position: {
                            x: Boundary.width * j - 25,
                            y: Boundary.height * i,
                        },
                        image: createImage('./imgFood32/chips.png'),
                    })
                )
                break; 
            case 'ja':
                food.push(
                    new Food({
                        type: 'Jam',
                        position: {
                            x: Boundary.width * j - 25,
                            y: Boundary.height * i,
                        },
                        image: createImage('./imgFood32/jam.png'),
                    })
                )
                break; 
            case 'cz':
                food.push(
                    new Food({
                        type: 'Cheese',
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i + 25,
                        },
                        image: createImage('./imgFood32/cheese.png'),
                    })
                )
                break; 
            case 'ba':
                food.push(
                    new Food({
                        type: 'Bananas',
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i + 25,
                        },
                        image: createImage('./imgFood32/bananas.png'),
                    })
                )
                break; 
            case 'ck':
                food.push(
                    new Food({
                        type: 'Chicken',
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i - 25,
                        },
                        image: createImage('./imgFood32/chicken.png'),
                    })
                )
                break; 
            case 'br':
                food.push(
                    new Food({
                        type: 'Bread',
                        position: {
                            x: Boundary.width * j - 25,
                            y: Boundary.height * i,
                        },
                        image: createImage('./imgFood32/bread.png'),
                    })
                )
                break; 
        }
    })
});

console.log(storeItems);

function circleCollidesWithRectangle({
    circle,
    rectangle,
}) {
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
            circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width)
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    boundaries.forEach((boundary) => {
        boundary.draw();
        if (circleCollidesWithRectangle({
            circle: sam,
            rectangle: boundary,
        })) {
            sam.velocity.x = 0;
            sam.velocity.y = 0;
        }
    });

    for (let i = 0; i < food.length; i++) {
        const foodItem = food[i];
        foodItem.update();
        foodItem.draw();
    }   

    for (let i = 0; i < storeItems.length; i++) {
        const storeStuff = storeItems[i];
        storeStuff.update();
        storeStuff.draw();
    }  

    sam.update();
    isAtCashier();
};


//     // employees.forEach((employee) => {
//         employee.update();
//         // employee.angle = Math.random() * Math.PI * 2;  // Initialize with a random angle
        
//         // employee.draw();
    
//         const collisions = [];
//         boundaries.forEach((boundary) => {
    
//             if (
//                 !collisions.includes('right') &&
//                 circleCollidesWithRectangle({
//                     circle: {
//                         ...employee,
//                         velocity: {
//                             x: 5,
//                             y: 0,
//                         }
//                     },
//                     rectangle: boundary,
//                 })
//             ) {
//                 collisions.push('right');
//             }
    
//             if (
//                 !collisions.includes('left') &&
//                 circleCollidesWithRectangle({
//                     circle: {
//                         ...employee,
//                         velocity: {
//                             x: -5,
//                             y: 0,
//                         }
//                     },
//                     rectangle: boundary,
//                 })
//             ) {
//                 collisions.push('left');
//             }
    
//             if (
//                 !collisions.includes('up') &&
//                 circleCollidesWithRectangle({
//                     circle: {
//                         ...employee,
//                         velocity: {
//                             x: 0,
//                             y: -5,
//                         }
//                     },
//                     rectangle: boundary,
//                 })
//             ) {
//                 collisions.push('up');
//             }
    
//             if (
//                 !collisions.includes('down') &&
//                 circleCollidesWithRectangle({
//                     circle: {
//                         ...employee,
//                         velocity: {
//                             x: 0,
//                             y: 3,
//                         }
//                     },
//                     rectangle: boundary,
//                 })
//             ) {
//                 collisions.push('down');
//             }
//         });
    
//         if (collisions.length > employee.prevCollisions.length) {
//             employee.prevCollisions = collisions;
//         }
//         if (JSON.stringify(collisions) !== JSON.stringify(employee.prevCollisions)) {
    
//             if (employee.velocity.x > 0) employee.prevCollisions.push('right');
//             else if (employee.velocity.x < 0) employee.prevCollisions.push('left');
//             else if (employee.velocity.y < 0) employee.prevCollisions.push('up');
//             else if (employee.velocity.y > 0) employee.prevCollisions.push('down');
    
//             const pathways = employee.prevCollisions.filter(collision => {
//                 return collisions.includes(collision);
//             });
    
//             const direction = pathways[Math.floor(Math.random() * pathways.length)];

//             switch (direction) {
//                 case 'down':
//                     employee.velocity.y = 3
//                     employee.velocity.x = 0
//                     // accelerateEmployee(employee, 5, 0);
//                     break;
            
//                 case 'up':
//                     employee.velocity.y = -3
//                     employee.velocity.x = 0
//                     // accelerateEmployee(employee, -5, 0);
//                     break;
            
//                 case 'right':
//                     employee.velocity.y = 0
//                     employee.velocity.x = 3
//                     // accelerateEmployee(employee, 0, 5);
//                     break;
            
//                 case 'left':
//                     employee.velocity.y = 0
//                     employee.velocity.x = -5
//                     // accelerateEmployee(employee, 0, -5);
//                     break;
//             }
//             employee.prevCollisions = [];
//         }
// }


const inventory = [];
const inventoryList = document.getElementById('inventory-list');

let shoppingList = [
    { name: 'Milk', neededAmount: 1, amount: 0 },
    { name: 'Cheese', neededAmount: 2, amount: 0 },
    // {name: 'Eggs', neededAmount: 1, amount: 0},
    // {name: 'Chips', neededAmount: 2, amount: 0},
    // {name: 'Jam', neededAmount: 3, amount: 0},
    // {name: 'Bananas', neededAmount: 2, amount: 0},
    // {name: 'Chicken', neededAmount: 1, amount: 0},
    // {name: 'Bread', neededAmount: 1, amount: 0},
];

const inventoryCounts = shoppingList.map(item => ({
    name: item.name,
    displayText: `${item.amount}/${item.neededAmount}`
}));

inventoryCounts.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.displayText}`;
    inventoryList.appendChild(li);
});

function updateInventoryDisplay() {
    // Reset amounts to 0 before updating
    shoppingList.forEach(item => (item.amount = 0));

    inventory.forEach(item => {
        const inventoryItem = shoppingList.find(shoppingItem => shoppingItem.name === item);
        if (inventoryItem) {
            inventoryItem.amount++;
        } else {
            // If the item is not on the shopping list, add it temporarily with red color
            const notOnShoppingList = {
                name: item,
                amount: 1,
                neededAmount: 0
            };
            shoppingList.push(notOnShoppingList);
        }
    });

    // Update the display
    inventoryList.innerHTML = ''; // Clear existing content
    shoppingList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.amount}/${item.neededAmount}`;

        if (item.amount < item.neededAmount) {
            li.style.color = 'black'; // Show not on shopping list items in red
            li.style.textDecoration = 'none';
        } else if (item.amount === item.neededAmount) {
            li.style.color = 'green';
            li.style.textDecoration = 'line-through';
        } else if (item.amount > item.neededAmount) {
            li.style.color = 'red';
            li.style.textDecoration = 'none';
        }

        inventoryList.appendChild(li);
    });

    // Remove temporarily added items
    shoppingList = shoppingList.filter(item => item.neededAmount > 0);
}

updateInventoryDisplay();

function isAtCashier() {
    for (const storeItem of storeItems) {

        if (storeItem.image.src.includes('cashier.png')) {
            const cashierPosition = storeItem.position;
            if (
                sam.position.x >= cashierPosition.x &&
                sam.position.x < cashierPosition.x + StoreItem.width &&
                sam.position.y >= cashierPosition.y &&
                sam.position.y < cashierPosition.y + StoreItem.height
            ) {
                console.log('Player is at the cashier.');
                return true;
            }
        }
    }
    console.log('Player is not at the cashier.');
    return false;


}

function allItemsAreGreen() {
    for (const item of shoppingList) {
        if (item.amount < item.neededAmount) {
            return false;  // Shopping list item is not green
        }
    }

    // Check additional items not on the shopping list
    for (const inventoryItem of inventory) {
        const item = shoppingList.find(shoppingItem => shoppingItem.name === inventoryItem);
        if (!item || item.amount < item.neededAmount) {
            return false;  // Additional item not on shopping list is not green
        }
    }

    return true;  // All items are green
}

// function allItemsAreGreen() {
//     for (const item of shoppingList) {
//         if (item.amount === item.neededAmount) {
//             return true;
//         }
//     }
//     return false;
// }

// // Function to check if all items in the inventory are green
// function allItemsAreGreen() {
//     for (const item of shoppingList) {
//         const inventoryItem = inventory.find((invItem) => invItem === item.name);
//         if (!inventoryItem || inventoryItem.amount < item.neededAmount) {
//             return false;
//         }
//     }
//     return true;
// }

// Function to show a notification
function showNotification(message) {
    // Implement your notification mechanism (e.g., alert, custom modal, etc.)
    alert(message);
}


/*----- event listeners -----*/
window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            sam.velocity.y = -5
            break;
        case 'a':
            sam.velocity.x = -5
            break;
        case 's':
            sam.velocity.y = 5
            break;
        case 'd':
            sam.velocity.x = 5
            break;         
        // case 'e':
        //     for (let i = 0; i < food.length; i++) {
        //         const foodItem = food[i];
        //         if (circleCollidesWithRectangle({
        //             circle: sam,
        //             rectangle: foodItem,
        //         })) {
        //             inventory.push(foodItem.type);
        //             food.splice(i, 1);
        //             i--;  // Decrement i to properly check the next item
        //             updateInventoryDisplay();
        //         }
        //     }
            // break;

        case 'e':
            let collectedItem = null;
            for (let i = 0; i < food.length; i++) {
                const foodItem = food[i];
                if (circleCollidesWithRectangle({
                    circle: sam,
                    rectangle: foodItem,
                })) {
                    inventory.push(foodItem.type);
                    collectedItem = foodItem.type;
                    food.splice(i, 1);
                    i--;  // Decrement i to properly check the next item
                }
            }
            updateInventoryDisplay();
            
            // Check if the collected item is not on the shopping list
            const inventoryItem = shoppingList.find(item => item.name === collectedItem);
            if (!inventoryItem || inventoryItem.neededAmount === 0) {
                const notOnShoppingList = document.querySelector(`li:nth-child(${shoppingList.length})`);
                // notOnShoppingList.style.color = 'red'; // Change the color to red
            }

            break;

        case 'q':
            // Check if inventory has items
            if (inventory.length > 0) {
                const poppedItem = inventory.pop();  // Pop the last item from the inventory
                food.push(new Food({
                    type: poppedItem,
                    position: { x: sam.position.x, y: sam.position.y },
                    image: createImage(`./imgFood32/${poppedItem.toLowerCase()}.png`),
                }));
                updateInventoryDisplay();  // Update inventory display after removing the item
            }
            break;
        case 'p':
            if (isAtCashier() && allItemsAreGreen()) {
                console.log('you win!')
                showNotification('All items are purchased. Thank you for shopping!');
            } else if (isAtCashier() && !allItemsAreGreen()) {
                showNotification("The items in your shopping cart are incorrect");
            } else if (!isAtCashier() && allItemsAreGreen()) {
                showNotification('You must be at the cashier to check out!')
            }
            break; 
    }
});


window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            sam.velocity.y = 0;
            break
        case 'a':
            sam.velocity.x = 0;
            break;
        case 's':
            sam.velocity.y = 0;
            break;
        case 'd':
            sam.velocity.x = 0;
            break;  

    }
});

console.log('Inventory', inventory);
console.log('food', food)

animate();