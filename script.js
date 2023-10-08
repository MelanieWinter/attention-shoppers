let board1;

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

class Boundary {
    static width = 40;
    static height = 40;
     // pass properties into constructor as an object so order doesn't matter
    constructor({ position, image }) { 
        this.position = position;
        this.width = 40;
        this.height = 40;
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

class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 13;
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
        this.draw();
    };
};

class Food {
    constructor({ type, position, image }) {
        this.type = type;
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image;
        this.originalImage = image;
    };

    draw() {
        // c.beginPath();
        // c.fillStyle = 'rgb(218, 22, 37)';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
        // c.fill();
        // // c.strokeStyle = 'rgb(115, 19, 29)';
        // // c.stroke();
        // c.closePath();
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

const inventory = [];
const inventoryDisplay = document.getElementById('inventory-display');
const inventoryList = document.getElementById('inventory-list');
// inventoryDisplay.textContent = 'Inventory: ' + inventory.join(', ');
const food = [];
const boundaries = [];
const sam = new Player({
    position: {
        x: Boundary.width + Boundary.width * 2,
        y: Boundary.height + Boundary.height * 4.5,
    },
    velocity: {
        x: 0,
        y: 0,
    }
});

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '[', '!', ']', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', '$', '$', '$', '$', ' ', ' ', ' ', ' ', ' ', '$', '$', '$', '$', ' ', ' ', ' ', ' ', ' ', 't', '*', 'r'],
    ['l', '*', ' ', '<', '+', '>', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '<', '+', '>', 't', '*', 'r'],
    ['l', '*', ' ', '<', '+', '>', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '<', '+', '>', 't', '*', 'r'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 't', '*', 'r'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', '^', ' ', ' ', '^', ' ', ' ', '^', ' ', ' ', '^', ' ', ' ', '^', ' ', ' ', ' ', ' ', ' ', ' ', '*', 'r'],
    ['l', '*', ' ', '<', '+', '>', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '<', '+', '>', ' ', '*', 'r'],
    ['l', '*', ' ', '<', '+', '>', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '<', '+', '>', ' ', '*', 'r'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*', 'r'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*', 'r'],
    ['l', '*', ' ', '<', '+', '>', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '*', ' ', ' ', '<', '+', '>', ' ', '*', 'r'],
    ['l', '*', ' ', '<', '+', '>', ' ', ' ', '~', ' ', ' ', '~', ' ', ' ', '~', ' ', ' ', '~', ' ', ' ', '~', ' ', ' ', '<', '+', '>', ' ', '*', 'r'],
    ['l', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'm', 'm', 'm', 'm', 'c', 'c', 'c', 'c', ' ', ' ', ' ', ' ', ' ', ' ', '*', 'r'],
    ['l', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '*', 'r'],
    ['4', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '3'],
];

const rows = map.length;
const columns = map[0].length;
const canvasWidth = 1160;
const canvasHeight = 600;
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
            case '!':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/doorMiddle.png'),
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
                        image: createImage('./img/woodShelf.png'),
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
                        image: createImage('./img/woodShelfHorizontalLeft.png'),
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
                        image: createImage('./img/woodShelfHorizontalRIght.png'),
                    })
                )
                break;
            case '$':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/register.png'),
                    })
                )
                break;
            case 't':
                food.push(
                    new Food({
                        type: 'Tomato',
                        position: {
                            x: Boundary.width * j + 35,
                            y: Boundary.height * i,
                        },
                        image: createImage('./img/tomato.png'),
                    })
                )
                break;
            case 'm':
                food.push(
                    new Food({
                        type: 'Milk',
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i + 35,
                        },
                        image: createImage('./img/milk.png'),
                    })
                )
                break;
            case 'c':
                food.push(
                    new Food({
                        type: 'Cheese',
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i + 35,
                        },
                        image: createImage('./img/cheese.png'),
                    })
                )
                break;
        }
    })
});

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

    sam.update();
}

function updateInventoryDisplay() {
    const inventoryCounts = { 
        'Tomato': 0, 
        'Milk': 0, 
        'Cheese': 0 
    };

    inventory.forEach(item => inventoryCounts[item]++);
    
    const updateSpan = (item) => {
        const span = document.getElementById(item.toLowerCase());
        span.innerText = `${inventoryCounts[item]} / 2 - ${item}`;
        span.style.color = inventoryCounts[item] > 2 ? 'red' : 'black';
    };

    ['Tomato', 'Milk', 'Cheese'].forEach(updateSpan);
}

updateInventoryDisplay();

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
        case 'e':
            for (let i = 0; i < food.length; i++) {
                const foodItem = food[i];
                if (circleCollidesWithRectangle({
                    circle: sam,
                    rectangle: foodItem,
                })) {
                    inventory.push(foodItem.type);
                    food.splice(i, 1);
                    i--;  // Decrement i to properly check the next item
                    updateInventoryDisplay();
                }
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
        case 'q':
            // Check if inventory has items
            if (inventory.length > 0) {
                const poppedItem = inventory.pop();  // Pop the last item from the inventory
                food.push(new Food({
                    type: poppedItem,
                    position: { x: sam.position.x, y: sam.position.y },
                    image: createImage(`./img/${poppedItem.toLowerCase()}.png`),
                }));
                updateInventoryDisplay();  // Update inventory display after removing the item
            }
            break;
    }
});

console.log('Inventory', inventory);
console.log('food', food)

animate();

