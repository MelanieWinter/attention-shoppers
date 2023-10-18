// let board1;

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let gameStarted = false;
let isGameRunning = false;
let totalSeconds = 100;
let timerInterval;
let isTimerPaused = false;
let isRespawning = false;
let collectedFoodPosition = { x: 0, y: 0 };

const inventory = [];
const food = [];
const boundaries = [];
const storeItems = [];
const goBacks = [];

const playAgainButton = document.querySelector('#play-again');
const inventoryList = document.getElementById('inventory-list');

function showNotification(message) {
    alert(message);
};

function showInstructions() {
    document.querySelector('#instructions').style.display = 'flex';
};

function hideInstructions() {
    document.querySelector('#instructions').style.display = 'none';
};

function showGameScreen() {
    document.querySelector('canvas').style.display = 'block';
    document.querySelector('#side').style.display = 'flex';
};

function hideGameScreen() {
    document.querySelector('canvas').style.display = 'none';
    document.querySelector('#side').style.display = 'none';
};

function fadeGameScreen() {
    document.querySelector('canvas').setAttribute('class', 'fade-out');
    document.querySelector('#side').setAttribute('class', 'fade-out');
};

function removeFadeGameScreen() {
    document.querySelector('canvas').classList.remove('fade-out');
    document.querySelector('#side').classList.remove('fade-out');
};

function showPlayAgain() {
    document.querySelector('#message').style.display = 'flex';
    document.querySelector('#play-button').style.display = 'flex';
};

function hidePlayAgain() {
    document.querySelector('#message').style.display = 'none';
    document.querySelector('#play-button').style.display = 'none';
};

class Boundary {
    static width = 32;
    static height = 32;
    constructor({ position, image }) { 
        this.position = position;
        this.width = 32;
        this.height = 32;
        this.image = image;
        this.originalImage = image;
    };
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    };
    resetImage() {
        this.image = this.originalImage;
    };
};

class StoreItem {
    static width = 32;
    static height = 32;
    constructor({ position, image }) { 
        this.position = position;
        this.width = 32;
        this.height = 32;
        this.image = image;
        this.originalImage = image;
    };
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    };
    resetImage() {
        this.image = this.originalImage;
    };
    update() {
    };
};

class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 5;
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
    static width = 32;
    static height = 32;
    constructor({ type, position, image }) {
        this.type = type;
        this.position = position;
        this.width = 32;
        this.height = 32;
        this.image = image;
        this.originalImage = image;
        this.isEligibleForPickup = true;
    };
    toggleEligibilityForPickup() {
        this.isEligibleForPickup = !this.isEligibleForPickup;
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
    };
};

const sam = new Player({
    position: {
        x: Boundary.width + Boundary.width * 14,
        y: Boundary.height + Boundary.height - 15,
    },
    velocity: {
        x: 0,
        y: 0,
    },
});

const map = [
    ['c1', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '[[', ']]', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', 'c2'],
    ['ll', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'CC', 'CC', '  ', '  ', '  ', '  ', 'CC', 'CC', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'rr'],
    ['ll', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'rr'],
    ['ll', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'rr'],
    ['ll', '01', '||', '||', '12', '23', '||', '||', '34', '45', '||', '||', '56', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '02', '||', '||', '13', '24', '||', '||', '35', '46', '||', '||', '57', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '03', '||', '||', '14', '25', '||', '||', '36', '47', '||', '||', '58', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '04', '||', '||', '15', '26', '||', '||', '37', '48', '||', '||', '59', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '05', '||', '||', '16', '27', '||', '||', '38', '49', '||', '||', '60', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '06', '||', '||', '17', '28', '||', '||', '39', '50', '||', '||', '61', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '07', '||', '||', '18', '29', '||', '||', '40', '51', '||', '||', '62', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '08', '||', '||', '19', '30', '||', '||', '41', '52', '||', '||', '63', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '09', '||', '||', '20', '31', '||', '||', '42', '53', '||', '||', '64', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '10', '||', '||', '21', '32', '||', '||', '43', '54', '||', '||', '65', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '11', '||', '||', '22', '33', '||', '||', '44', '55', '||', '||', '66', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'rr'],
    ['ll', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'rr'],
    ['ll', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', '==', 'rr'],
    ['c4', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', '__', 'c3'],
];

const rows = map.length;
const columns = map[0].length;
const canvasWidth = 960;
const canvasHeight = 607;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

function createImage(src) {
    const image = new Image();
    image.src = src;
    return image;
};

function createMap() {
    map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            switch (symbol) {
                case 'CC':
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
                case '--':
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
                case '__':
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
                case 'll':
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
                case 'rr':
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

                case 'c1':
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
                case 'c2':
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
                case 'c3':
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
                case 'c4':
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
                case '[[':
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
                case ']]':
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
                case '||':
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
                case '==':
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
                case '01':
                    food.push(
                        new Food({
                            type: 'Roasted Chicken',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/roasted-chicken.png'),
                        })
                    )
                    break; 
                case '02':
                    food.push(
                        new Food({
                            type: 'Meatballs',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/meatballs.png'),
                        })
                    )
                    break; 
                case '03':
                    food.push(
                        new Food({
                            type: 'Pizza Slice',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/pizza-slice.png'),
                        })
                    )
                    break; 
                case '04':
                    food.push(
                        new Food({
                            type: 'Salmon Dish',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/salmon-dish.png'),
                        })
                    )
                    break;
                case '05':
                    food.push(
                        new Food({
                            type: 'Steak Dish',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/steak-dish.png'),
                        })
                    )
                    break;
                case '06':
                    food.push(
                        new Food({
                            type: 'Sushi',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/sushi.png'),
                        })
                    )
                    break;
                case '07':
                    food.push(
                        new Food({
                            type: 'Taco Dish',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/taco-dish.png'),
                        })
                    )
                    break;
                case '08':
                    food.push(
                        new Food({
                            type: 'Cheeseburger',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/cheeseburger.png'),
                        })
                    )
                    break;
                case '09':
                    food.push(
                        new Food({
                            type: 'Burrito',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/burrito.png'),
                        })
                    )
                    break;
                case '10':
                    food.push(
                        new Food({
                            type: 'Spaghetti Dish',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/spaghetti-dish.png'),
                        })
                    )
                    break;
                case '11':
                    food.push(
                        new Food({
                            type: 'Sandwich',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/sandwich.png'),
                        })
                    )
                    break;
                case '12':
                    food.push(
                        new Food({
                            type: 'Apple Pie',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/apple-pie.png'),
                        })
                    )
                    break;
                case '13':
                    food.push(
                        new Food({
                            type: 'Cheesecake',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/cheesecake.png'),
                        })
                    )
                    break;
                case '14':
                    food.push(
                        new Food({
                            type: 'Chocolate Cake',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/chocolate-cake.png'),
                        })
                    )
                    break;
                case '15':
                    food.push(
                        new Food({
                            type: 'Lemon Pie',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/lemon-pie.png'),
                        })
                    )
                    break;
                case '16':
                    food.push(
                        new Food({
                            type: 'Strawberry Cake',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/strawberry-cake.png'),
                        })
                    )
                    break;
                case '17':
                    food.push(
                        new Food({
                            type: 'Flan',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/flan.png'),
                        })
                    )
                    break;
                case '18':
                    food.push(
                        new Food({
                            type: 'Egg Tart',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/egg-tart.png'),
                        })
                    )
                    break;
                case '19':
                    food.push(
                        new Food({
                            type: 'Donuts',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/donuts.png'),
                        })
                    )
                    break;
                case '20':
                    food.push(
                        new Food({
                            type: 'Cookies',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/cookies.png'),
                        })
                    )
                    break;
                case '21':
                    food.push(
                        new Food({
                            type: 'Fruitcake',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/fruitcake.png'),
                        })
                    )
                    break;
                case '22':
                    food.push(
                        new Food({
                            type: 'Gingerbread Men',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/gingerbread-men.png'),
                        })
                    )
                    break;
                case '23':
                    food.push(
                        new Food({
                            type: 'Bowl',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/bowl.png'),
                        })
                    )
                    break; 
                case '24':
                    food.push(
                        new Food({
                            type: 'Plate',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/plate.png'),
                        })
                    )
                    break; 
                case '25':
                    food.push(
                        new Food({
                            type: 'Kitchen Scissors',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/kitchen-scissors.png'),
                        })
                    )
                    break; 
                case '26':
                    food.push(
                        new Food({
                            type: 'Spatula',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/spatula.png'),
                        })
                    )
                    break;
                case '27':
                    food.push(
                        new Food({
                            type: 'Whisk',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/whisk.png'),
                        })
                    )
                    break;
                case '28':
                    food.push(
                        new Food({
                            type: 'Rolling Pin',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/rolling-pin.png'),
                        })
                    )
                    break;
                case '29':
                    food.push(
                        new Food({
                            type: 'Tea Kettle',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/tea-kettle.png'),
                        })
                    )
                    break;
                case '30':
                    food.push(
                        new Food({
                            type: 'Frying Pan',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/frying-pan.png'),
                        })
                    )
                    break;
                case '31':
                    food.push(
                        new Food({
                            type: 'Sponge',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/sponge.png'),
                        })
                    )
                    break;
                case '32':
                    food.push(
                        new Food({
                            type: 'Scrub Brush',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/scrub-brush.png'),
                        })
                    )
                    break;
                case '33':
                    food.push(
                        new Food({
                            type: 'Cleaning Gloves',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/cleaning-gloves.png'),
                        })
                    )
                    break;
                case '34':
                    food.push(
                        new Food({
                            type: 'Ball Pen',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/ball-pen.png'),
                        })
                    )
                    break;
                case '35':
                    food.push(
                        new Food({
                            type: 'Batteries',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/batteries.png'),
                        })
                    )
                    break;
                case '36':
                    food.push(
                        new Food({
                            type: 'Glue Stick',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/glue-stick.png'),
                        })
                    )
                    break;
                case '37':
                    food.push(
                        new Food({
                            type: 'Elmers Glue',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/elmers-glue.png'),
                        })
                    )
                    break;
                case '38':
                    food.push(
                        new Food({
                            type: 'Light Bulb',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/light-bulb.png'),
                        })
                    )
                    break;
                case '39':
                    food.push(
                        new Food({
                            type: 'Pencil Box',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/pencil-box.png'),
                        })
                    )
                    break;
                case '40':
                    food.push(
                        new Food({
                            type: 'Power Strip',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/power-strip.png'),
                        })
                    )
                    break;
                case '41':
                    food.push(
                        new Food({
                            type: 'School Scissors',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/school-scissors.png'),
                        })
                    )
                    break;
                case '42':
                    food.push(
                        new Food({
                            type: 'Eraser',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/eraser.png'),
                        })
                    )
                    break;
                case '43':
                    food.push(
                        new Food({
                            type: 'Rubber Duck',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/rubber-duck.png'),
                        })
                    )
                    break;
                case '44':
                    food.push(
                        new Food({
                            type: 'Rubber Ducktopus',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/rubber-ducktopus.png'),
                        })
                    )
                    break;
                case '45':
                    food.push(
                        new Food({
                            type: 'Sunscreen',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/sunscreen.png'),
                        })
                    )
                    break;
                case '46':
                    food.push(
                        new Food({
                            type: 'Body Lotion',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/body-lotion.png'),
                        })
                    )
                    break;
                case '47':
                    food.push(
                        new Food({
                            type: 'Hand Sanitizer',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/hand-sanitizer.png'),
                        })
                    )
                    break;
                case '48':
                    food.push(
                        new Food({
                            type: 'Shampoo',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/shampoo.png'),
                        })
                    )
                    break;
                case '49':
                    food.push(
                        new Food({
                            type: 'Soap',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/soap.png'),
                        })
                    )
                    break;
                case '50':
                    food.push(
                        new Food({
                            type: 'Toothpaste',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/toothpaste.png'),
                        })
                    )
                    break;
                case '51':
                    food.push(
                        new Food({
                            type: 'Toothbrush',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/toothbrush.png'),
                        })
                    )
                    break;
                case '52':
                    food.push(
                        new Food({
                            type: 'Toothbrush Set',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/toothbrush-set.png'),
                        })
                    )
                    break;
                case '53':
                    food.push(
                        new Food({
                            type: 'Bandaids',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/bandaids.png'),
                        })
                    )
                    break;
                case '54':
                    food.push(
                        new Food({
                            type: 'Wet Wipes',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/wet-wipes.png'),
                        })
                    )
                    break;
                case '55':
                    food.push(
                        new Food({
                            type: 'Bathroom Cleaner',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/bathroom-cleaner.png'),
                        })
                    )
                    break;
                case '56':
                    food.push(
                        new Food({
                            type: 'Vanilla Ice Cream',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/vanilla-ice-cream.png'),
                        })
                    )
                    break;
                case '57':
                    food.push(
                        new Food({
                            type: 'Strawberry Ice Cream',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/strawberry-ice-cream.png'),
                        })
                    )
                    break;
                case '58':
                    food.push(
                        new Food({
                            type: 'Bowl of Ice Cream',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/bowl-of-ice-cream.png'),
                        })
                    )
                    break;
                case '59':
                    food.push(
                        new Food({
                            type: 'Gallon of Milk',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/gallon-of-milk.png'),
                        })
                    )
                    break;
                case '60':
                    food.push(
                        new Food({
                            type: 'Carton of Milk',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/carton-of-milk.png'),
                        })
                    )
                    break;
                case '61':
                    food.push(
                        new Food({
                            type: 'Yogurt',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/yogurt.png'),
                        })
                    )
                    break;
                case '62':
                    food.push(
                        new Food({
                            type: 'Cheese Wheel',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/cheese-wheel.png'),
                        })
                    )
                    break;
                case '63':
                    food.push(
                        new Food({
                            type: 'Cheese Slice',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/cheese-slice.png'),
                        })
                    )
                    break;
                case '64':
                    food.push(
                        new Food({
                            type: 'American Cheese',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/american-cheese.png'),
                        })
                    )
                    break;
                case '65':
                    food.push(
                        new Food({
                            type: 'White Eggs',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/white-eggs.png'),
                        })
                    )
                    break;
                case '66':
                    food.push(
                        new Food({
                            type: 'Brown Eggs',
                            position: {
                                x: Boundary.width * j - 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/brown-eggs.png'),
                        })
                    )
                    break;
        }
        })
    });

    const totalFoodItems = food.length;

    shoppingList = [];

    const numItemsInShoppingList = 10;
    const selectedFoodIndices = [];

    while (shoppingList.length < numItemsInShoppingList) {
        const randomFoodIndex = Math.floor(Math.random() * totalFoodItems);

        if (!selectedFoodIndices.includes(randomFoodIndex)) {
            selectedFoodIndices.push(randomFoodIndex);

            const randomFood = food[randomFoodIndex].type;

            const randomNeededAmount = Math.floor(Math.random() * 2) + 1;

            shoppingList.push({ name: randomFood, neededAmount: randomNeededAmount, amount: 0 });
        };
    };
};

createMap();

function startGame() {
    hideInstructions();
    showGameScreen();
};

function pauseGame() {
    showInstructions();
    hideGameScreen();
    hidePlayAgain();
};

function resumeGame() {
    hideInstructions();
    showGameScreen();
};

function decreaseTimer() {
    if (!gameStarted) {
        return;
    };
    if (!isTimerPaused && totalSeconds > 0) {
        setTimeout(decreaseTimer, 1000);
        totalSeconds--;

        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let secondsDisplay = seconds < 10 ? "0" + seconds : seconds;
        document.querySelector('#timer').innerHTML = `${minutes}:${secondsDisplay}`;
    };
    if (totalSeconds > 10) {
        document.querySelector('#timer').style.color = 'black';
    } else {
        document.querySelector('#timer').style.color = 'rgb(172, 37, 55)';
        document.querySelector('#timer').style.borderColor = 'rgb(172, 37, 55)';
        document.querySelector('#timer').setAttribute('class', 'pulsate-bck');
    };
    if (totalSeconds === 0 && !isAtCashier() && !allItemsAreGreen()) {
        fadeGameScreen();
        showPlayAgain();
        document.querySelector('#message').innerHTML = 'The store is now closed';
    };
};

function pauseTimer() {
    isTimerPaused = true;
    clearTimeout(timerInterval);
};

function resumeTimer() {
    isTimerPaused = false;
    decreaseTimer();
};

function circleCollidesWithRectangle({ circle,rectangle,}) {
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
            circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width)
};

function updateInventoryDisplay() {
    shoppingList.forEach(item => (item.amount = 0));
    inventory.forEach(item => {
        const inventoryItem = shoppingList.find(shoppingItem => shoppingItem.name === item);
        if (inventoryItem) {
            inventoryItem.amount++;
        } else {
            const notOnShoppingList = {
                name: item,
                amount: 1,
                neededAmount: 0
            };
            shoppingList.push(notOnShoppingList);
        }
    });
    inventoryList.innerHTML = '';
    shoppingList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.amount}/${item.neededAmount}`;
        if (item.amount < item.neededAmount) {
            li.style.color = 'black';
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
    shoppingList = shoppingList.filter(item => item.neededAmount > 0);
};

const inventoryCounts = shoppingList.map(item => ({
    name: item.name,
    displayText: `${item.amount}/${item.neededAmount}`
}));

inventoryCounts.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.displayText}`;
    inventoryList.appendChild(li);
});

updateInventoryDisplay();

function updateGoBacksDisplay() {
    const gobacksDisplay = document.getElementById('gobacks-display');
    gobacksDisplay.innerHTML = '';

    for (let i = goBacks.length - 1; i >= 0; i--) {
        const item = goBacks[i];
        const img = document.createElement('img');
        img.src = `./assets/img/food32/${item.toLowerCase().split(' ').join('-')}.png`;
        img.addEventListener('click', () => {
            goBacks.splice(goBacks.indexOf(item), 1);
            updateGoBacksDisplay();
            inventory.push(item);
            updateInventoryDisplay();
        });
        gobacksDisplay.appendChild(img);
    };
};

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
                return true;
            };
        };
    };
    return false;
};

function allItemsAreGreen() {
    for (const item of shoppingList) {
        if (item.amount < item.neededAmount) {
            return false;
        };
    };
    for (const inventoryItem of inventory) {
        const item = shoppingList.find(shoppingItem => shoppingItem.name === inventoryItem);
        if (!item || item.amount < item.neededAmount) {
            return false;
        };
    };
    return true;
};

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
            if (!isRespawning) {
                let collectedItem = null;
                let foodIndex = -1;
                for (let i = 0; i < food.length; i++) {
                    const foodItem = food[i];
                    if (circleCollidesWithRectangle({
                        circle: sam,
                        rectangle: foodItem,
                    })) {
                        inventory.push(foodItem.type);
                        collectedItem = foodItem.type;
                        collectedFoodPosition = { x: foodItem.position.x, y: foodItem.position.y };
                        foodIndex = i;
                        break;
                    };
                };
                if (foodIndex !== -1) {
                    food.splice(foodIndex, 1);
                };
                updateInventoryDisplay();
                if (collectedItem) {
                    const collectedFood = food.find(item => item.type === collectedItem);
                    if (collectedFood) {
                        collectedFood.toggleEligibilityForPickup();
                    };
                };
                const inventoryItem = shoppingList.find(item => item.name === collectedItem);
                if (!inventoryItem || inventoryItem.neededAmount === 0) {
                    const notOnShoppingList = document.querySelector(`li:nth-child(${shoppingList.length})`);
                };
                isRespawning = true;
                setTimeout(() => {
                    if (collectedItem) {
                        food.push(new Food({
                            type: collectedItem,
                            position: collectedFoodPosition,
                            image: createImage(`./assets/img/food32/${collectedItem.toLowerCase().split(' ').join('-')}.png`),
                        }));
                        const respawnedFood = food.find(item => item.type === collectedItem);
                        if (respawnedFood) {
                            respawnedFood.toggleEligibilityForPickup();
                        }
                    }
                    isRespawning = false;
                }, 200);
            };
            break;
        case 'q':
            if (inventory.length > 0) {
                const poppedItem = inventory.pop();
                goBacks.push(poppedItem);
                updateGoBacksDisplay();
                updateInventoryDisplay();
            };
            break;
            case 'p':
                if (isAtCashier() && allItemsAreGreen() && timer !== 0) {
                    const timeTaken = 100 - totalSeconds;
                    const bestTime = localStorage.getItem('bestTime');
                    if (!bestTime || timeTaken < bestTime) {
                        localStorage.setItem('bestTime', timeTaken);
                        updateBestTimeDisplay();
                    };
                    showPlayAgain();
                    document.querySelector('#message').innerHTML = 'Thank you for shopping!';
                    fadeGameScreen();
                    gameStarted = false;
                } else if (isAtCashier() && !allItemsAreGreen() && timer !== 0) {
                    showNotification("The items in your shopping cart are incorrect");
                } else if (!isAtCashier() && allItemsAreGreen() && timer !== 0) {
                    showNotification('You must be at the cashier to check out!')
                }
                break; 
            case 'Escape':
                if (!gameStarted) {
                    startGame();
                    gameStarted = true;
                    decreaseTimer();
                } else if (!isTimerPaused) {
                    isTimerPaused = true;
                    pauseGame();
                    pauseTimer();
                    showInstructions();
                } else {
                    isTimerPaused = false;
                    resumeTimer();
                    resumeGame();
                };
                break;
    };
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
    };
});

function resetMap() {
    boundaries.length = 0;
    food.length = 0;
    storeItems.length = 0;
    goBacks.length = 0;
    createMap();
};

playAgainButton.addEventListener('click', () => {
    inventory.length = 0; 
    totalSeconds = 100; 
    sam.position.x = Boundary.width + Boundary.width * 13.5; 
    sam.position.y = Boundary.height + Boundary.height - 15;
    sam.velocity.x = 0;
    sam.velocity.y = 0;
    isTimerPaused = false;
    gameStarted = true;
    resetMap();
    updateInventoryDisplay();
    document.querySelector('#gobacks-display').innerHTML = '';
    document.querySelector('#timer').style.color = 'black';
    document.querySelector('#timer').style.borderColor = 'black';
    document.querySelector('#timer').classList.remove('pulsate-bck');
    hidePlayAgain();
    removeFadeGameScreen();
    updateBestTimeDisplay();
    decreaseTimer();
});

function updateBestTimeDisplay() {
    const bestTime = localStorage.getItem('bestTime');
    if (bestTime) {
        document.getElementById('best-time').textContent = `Best Time: ${bestTime} seconds`;
    } else {
        document.getElementById('best-time').textContent = 'Best Time: N/A';
    };
};

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
        };
    });
    for (let i = 0; i < food.length; i++) {
        const foodItem = food[i];
        foodItem.update();
        foodItem.draw();
        if (circleCollidesWithRectangle({ circle: sam, rectangle: foodItem })) {
            c.strokeStyle = 'red';
            c.lineWidth = 2;
            c.strokeRect(
                foodItem.position.x,
                foodItem.position.y,
                foodItem.width,
                foodItem.height
            );
            document.getElementById('highlighted-food').innerText = foodItem.type;
        };
    };
    for (let i = 0; i < storeItems.length; i++) {
        const storeStuff = storeItems[i];
        storeStuff.update();
        storeStuff.draw();
    };
    sam.update();
    isAtCashier();
};

animate();
