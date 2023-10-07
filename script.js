/*----- constants -----*/


/*----- state variables -----*/
let board1; // grocery store maze

/*----- cached elements  -----*/
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.setAttribute("width", getComputedStyle(canvas).width);
canvas.setAttribute("height", getComputedStyle(canvas).height);

/*----- classes ----- */

class Boundary {
    static width = 40;
    static height = 40;
     // pass properties into constructor as an object so order doesn't matter
    constructor({ position, image }) { 
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image;
    };

    draw() {
        // c.fillStyle = 'rgb(59, 90, 175)';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.drawImage(this.image, this.position.x, this.position.y);
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
    constructor({ position }) {
        this.position = position;
        this.width = 7;
        this.height = 20;
    };

    draw() {
        c.beginPath();
        c.fillStyle = 'rgb(218, 22, 37)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.fill();
        // c.strokeStyle = 'rgb(115, 19, 29)';
        // c.stroke();
        c.closePath();
    };

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
    };
};

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
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['l', '@', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'r'],
    ['l', '@', ' ', ' ', 'n', ' ', ' ', 'n', ' ', ' ', 'n', ' ', ' ', 'n', ' ', ' ', 'n', ' ', ' ', 'r'],
    ['l', '@', ' ', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', 'r'],
    ['l', '@', ' ', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', 'r'],
    ['l', ' ', ' ', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', 'r'],
    ['l', '@', ' ', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', 'r'],
    ['l', '@', ' ', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', '|', '.', ' ', 'r'],
    ['l', '@', ' ', ' ', 'u', '.', ' ', 'u', '.', ' ', 'u', '.', ' ', 'u', '.', ' ', 'u', '.', ' ', 'r'],
    ['l', '@', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'r'],
    ['4', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '3'],
];

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
            case '|':
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
            case 'u':
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
            case 'n':
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
            case '.':
                food.push(
                    new Food({
                        position: {
                            x: Boundary.width * j + 1,
                            y: Boundary.height * i,
                        },
                        // image: image
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
        const foodItem = food[i]
        foodItem.draw();
        // Check for collisions between the player and food
        if (circleCollidesWithRectangle({
            circle: sam,
            rectangle: foodItem,
        })) {
            console.log('touching food');
            food.splice(i, 1)
        }
    }

    sam.update();
}

animate();

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

/*----- functions -----*/

