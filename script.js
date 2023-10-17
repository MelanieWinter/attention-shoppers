let board1;

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
// const playAgainButton = document.querySelector('#play-again');

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
        this.isEligibleForPickup = true;  // Indicate if the food is eligible for pickup
    };

    toggleEligibilityForPickup() {
        this.isEligibleForPickup = !this.isEligibleForPickup;
    }

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
        x: Boundary.width + Boundary.width * 14,
        y: Boundary.height + Boundary.height - 15,
    },
    velocity: {
        x: 0,
        y: 0,
    }
});

const map = [
    ['c1', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '[[', ']]', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', 'c2'],
    ['ll', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'CC', 'CC', '  ', '  ', '  ', '  ', 'CC', 'CC', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'rr'],
    ['ll', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'rr'],
    ['ll', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'rr'],
    ['ll', '01', '||', '||', '12', '23', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '02', '||', '||', '13', '24', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '03', '||', '||', '14', '25', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '04', '||', '||', '15', '26', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '05', '||', '||', '16', '27', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '06', '||', '||', '17', '28', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '07', '||', '||', '18', '29', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '08', '||', '||', '19', '30', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '09', '||', '||', '20', '31', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '10', '||', '||', '21', '32', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
    ['ll', '11', '||', '||', '22', '33', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', '  ', '||', '||', '  ', 'rr'],
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
                // case 'mi':
                //     food.push(
                //         new Food({
                //             type: 'Milk',
                //             position: {
                //                 x: Boundary.width * j,
                //                 y: Boundary.height * i + 25,
                //             },
                //             image: createImage('./imgFood32/milk.png'),
                //         })
                //     )
                //     break;
                // case 'eg':
                //     food.push(
                //         new Food({
                //             type: 'Eggs',
                //             position: {
                //                 x: Boundary.width * j,
                //                 y: Boundary.height * i + 25,
                //             },
                //             image: createImage('./imgFood32/eggs.png'),
                //         })
                //     )
                //     break;     
                // case 'ch':
                //     food.push(
                //         new Food({
                //             type: 'Chips',
                //             position: {
                //                 x: Boundary.width * j - 25,
                //                 y: Boundary.height * i,
                //             },
                //             image: createImage('./imgFood32/chips.png'),
                //         })
                //     )
                //     break; 
                // case 'ja':
                //     food.push(
                //         new Food({
                //             type: 'Jam',
                //             position: {
                //                 x: Boundary.width * j - 25,
                //                 y: Boundary.height * i,
                //             },
                //             image: createImage('./imgFood32/jam.png'),
                //         })
                //     )
                //     break; 
                // case 'cz':
                //     food.push(
                //         new Food({
                //             type: 'Cheese',
                //             position: {
                //                 x: Boundary.width * j,
                //                 y: Boundary.height * i + 30,
                //             },
                //             image: createImage('./imgFood32/cheese.png'),
                //         })
                //     )
                //     break; 
                // case 'ba':
                //     food.push(
                //         new Food({
                //             type: 'Bananas',
                //             position: {
                //                 x: Boundary.width * j,
                //                 y: Boundary.height * i + 30,
                //             },
                //             image: createImage('./imgFood32/bananas.png'),
                //         })
                //     )
                //     break; 
                // case 'ck':
                //     food.push(
                //         new Food({
                //             type: 'Chicken',
                //             position: {
                //                 x: Boundary.width * j,
                //                 y: Boundary.height * i - 25,
                //             },
                //             image: createImage('./imgFood32/chicken.png'),
                //         })
                //     )
                //     break; 
                // case 'br':
                //     food.push(
                //         new Food({
                //             type: 'Bread',
                //             position: {
                //                 x: Boundary.width * j - 25,
                //                 y: Boundary.height * i,
                //             },
                //             image: createImage('./imgFood32/bread.png'),
                //         })
                //     )
                //     break; 
                // case 'ho':
                //     food.push(
                //         new Food({
                //             type: 'Hot Dog',
                //             position: {
                //                 x: Boundary.width * j + 25,
                //                 y: Boundary.height * i,
                //             },
                //             image: createImage('./imgFood32/hot dog.png'),
                //         })
                //     )
                //     break; 
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
                            type: 'Scissors',
                            position: {
                                x: Boundary.width * j + 25,
                                y: Boundary.height * i,
                            },
                            image: createImage('./assets/img/food32/scissors.png'),
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
        }
        })
    });

    // Assume food.length is the total number of available food items
    const totalFoodItems = food.length;

    // Clear existing shopping list
    shoppingList = [];

    // Ensure shopping list has 10 unique items
    const numItemsInShoppingList = 10;
    const selectedFoodIndices = [];

    while (shoppingList.length < numItemsInShoppingList) {
        const randomFoodIndex = Math.floor(Math.random() * totalFoodItems);

        // Check if this food item is already in the shopping list
        if (!selectedFoodIndices.includes(randomFoodIndex)) {
            selectedFoodIndices.push(randomFoodIndex);

            const randomFood = food[randomFoodIndex].type;

            // Generate a random needed amount between 1 and 3
            const randomNeededAmount = Math.floor(Math.random() * 2) + 1;

            // Add the random food item to the shopping list
            shoppingList.push({ name: randomFood, neededAmount: randomNeededAmount, amount: 0 });
        }
    }
};

createMap();

function circleCollidesWithRectangle({
    circle,
    rectangle,
}) {
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
            circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width)
}

let gameStarted = false;

// Function to show the instructions
function showInstructions() {
    document.querySelector('#instructions').style.display = 'flex';
}

// Function to start the game
function startGame() {
    document.querySelector('#instructions').style.display = 'none';
    document.querySelector('canvas').style.display = 'block';
    document.querySelector('#side').style.display = 'flex';
}

function pauseGame() {
    document.querySelector('#message').style.display = 'none';
    document.querySelector('#play-button').style.display = 'none';
    document.querySelector('#instructions').style.display = 'flex';
    document.querySelector('canvas').style.display = 'none';
    document.querySelector('#side').style.display = 'none';
}

function resumeGame() {
    document.querySelector('#instructions').style.display = 'none';
    document.querySelector('canvas').style.display = 'block';
    document.querySelector('#side').style.display = 'flex';
}

let totalSeconds = 100; // Change to your desired initial total seconds
let timerInterval;
let isTimerPaused = false;

function decreaseTimer() {
    if (!isTimerPaused && totalSeconds > 0) {
        setTimeout(decreaseTimer, 1000);
        totalSeconds--;

        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        // Pad single-digit seconds with a leading zero
        let secondsDisplay = seconds < 10 ? "0" + seconds : seconds;
        document.querySelector('#timer').innerHTML = `${minutes}:${secondsDisplay}`;
    };
    if (totalSeconds > 10) {
        document.querySelector('#timer').style.color = 'black';
    } else {
        document.querySelector('#timer').style.color = 'rgb(172, 37, 55)';
        document.querySelector('#timer').style.borderColor = 'rgb(172, 37, 55)';
        document.querySelector('#timer').setAttribute('class', 'pulsate-bck');
    }
    if (totalSeconds === 0 && !isAtCashier() && !allItemsAreGreen()) {
        document.querySelector('#message').innerHTML = 'The store is now closed';
        document.querySelector('#message').style.display = 'flex';
        document.querySelector('#play-button').style.display = 'flex';
        document.querySelector('canvas').setAttribute('class', 'fade-out')
        document.querySelector('#side').setAttribute('class', 'fade-out')
    }
}

function pauseTimer() {
    isTimerPaused = true;
    clearTimeout(timerInterval);
}

// Function to resume the timer
function resumeTimer() {
    isTimerPaused = false;
    // decreaseTimer();
}

// decreaseTimer();

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

        // Draw a box around the food item if it's eligible for pickup
        if (circleCollidesWithRectangle({
            circle: sam,
            rectangle: foodItem,
        })) {
            c.strokeStyle = 'red';  // Change the color to red or any color you prefer
            c.lineWidth = 2;  // Adjust the line width as needed
            c.strokeRect(
                foodItem.position.x,
                foodItem.position.y,
                foodItem.width,
                foodItem.height
            );
            // Update the highlighted food name
            document.getElementById('highlighted-food').innerText = foodItem.type;
        }
    }   

    for (let i = 0; i < storeItems.length; i++) {
        const storeStuff = storeItems[i];
        storeStuff.update();
        storeStuff.draw();
    }  

    sam.update();
    isAtCashier();
}


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

// let shoppingList = [
//     { name: 'Milk', neededAmount: 1, amount: 0 },
//     { name: 'Cheese', neededAmount: 2, amount: 0 },
//     // {name: 'Eggs', neededAmount: 1, amount: 0},
//     // {name: 'Chips', neededAmount: 2, amount: 0},
//     // {name: 'Jam', neededAmount: 3, amount: 0},
//     // {name: 'Bananas', neededAmount: 2, amount: 0},
//     // {name: 'Chicken', neededAmount: 1, amount: 0},
//     // {name: 'Bread', neededAmount: 1, amount: 0},
// ];

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

let goBacks = [];

function updateGoBacksDisplay() {
    const gobacksDisplay = document.getElementById('gobacks-display');
    gobacksDisplay.innerHTML = ''; // Clear previous content

    const numItemsToShow = Math.min(goBacks.length, 5); // Display up to 3 items or the number of items available

    for (let i = goBacks.length - numItemsToShow; i < goBacks.length; i++) {
        const item = goBacks[i];

        // Create an image element for each item
        const img = document.createElement('img');
        img.src = `./assets/img/food32/${item.toLowerCase().split(' ').join('-')}.png`; // Adjust the path to your images accordingly
        img.alt = item; // Set alt text for accessibility

        // Add event listener to handle item click
        img.addEventListener('click', () => {
            // Remove the clicked item from goBacks
            goBacks.splice(goBacks.indexOf(item), 1);
            updateGoBacksDisplay(); // Update goBacks display after item is removed

            // Push the item back into the inventory
            inventory.push(item);
            updateInventoryDisplay(); // Update inventory display
        });

        gobacksDisplay.appendChild(img);
    }
}





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

let isRespawning = false;
let collectedFoodPosition = { x: 0, y: 0 }; // Initialize with a default position

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
        //     let collectedItem = null;
        //     for (let i = 0; i < food.length; i++) {
        //         const foodItem = food[i];
        //         if (circleCollidesWithRectangle({
        //             circle: sam,
        //             rectangle: foodItem,
        //         })) {
        //             inventory.push(foodItem.type);
        //             collectedItem = foodItem.type;
        //             food.splice(i, 1);
        //             i--;  // Decrement i to properly check the next item
        //         }
        //     }
        //     updateInventoryDisplay();
            
        //     // Check if the collected item is not on the shopping list
        //     const inventoryItem = shoppingList.find(item => item.name === collectedItem);
        //     if (!inventoryItem || inventoryItem.neededAmount === 0) {
        //         const notOnShoppingList = document.querySelector(`li:nth-child(${shoppingList.length})`);
        //         // notOnShoppingList.style.color = 'red'; // Change the color to red
        //     }

        //     break;

        case 'e':
            if (!isRespawning) {
                let collectedItem = null;
                let foodIndex = -1;  // Track the index of the collected food
                for (let i = 0; i < food.length; i++) {
                    const foodItem = food[i];
                    if (circleCollidesWithRectangle({
                        circle: sam,
                        rectangle: foodItem,
                    })) {
                        inventory.push(foodItem.type);
                        collectedItem = foodItem.type;
                        // Store the position of the collected food
                        collectedFoodPosition = { x: foodItem.position.x, y: foodItem.position.y };
                        foodIndex = i;
                        break;  // Exit the loop when food is collected
                    }
                }
        
                if (foodIndex !== -1) {
                    food.splice(foodIndex, 1); // Remove the collected food from the array
                }
        
                updateInventoryDisplay();

                // Toggle eligibility for pickup for the collected food item
                if (collectedItem) {
                    const collectedFood = food.find(item => item.type === collectedItem);
                    if (collectedFood) {
                        collectedFood.toggleEligibilityForPickup();
                    }
                }
        
                // Check if the collected item is not on the shopping list
                const inventoryItem = shoppingList.find(item => item.name === collectedItem);
                if (!inventoryItem || inventoryItem.neededAmount === 0) {
                    const notOnShoppingList = document.querySelector(`li:nth-child(${shoppingList.length})`);
                    // notOnShoppingList.style.color = 'red'; // Change the color to red
                }
        
                // Set a flag to indicate food is respawning
                isRespawning = true;
        
                // Reappear the food after 2 seconds
                setTimeout(() => {
                    // Push the collected food item back to the food array with the stored position
                    food.push(new Food({
                        type: collectedItem,
                        position: collectedFoodPosition,  // Use the previous position
                        image: createImage(`./assets/img/food32/${collectedItem.toLowerCase().split(' ').join('-')}.png`),
                    }));
        
                    // Reset the flag immediately after the food respawns
                    isRespawning = false;
                }, 200);
            }
        
            break;

        // case 'q':
        //     // Check if inventory has items
        //     if (inventory.length > 0) {
        //         const poppedItem = inventory.pop();  // Pop the last item from the inventory
        //         food.push(new Food({
        //             type: poppedItem,
        //             position: { x: sam.position.x, y: sam.position.y },
        //             image: createImage(`./imgFood32/${poppedItem.toLowerCase()}.png`),
        //         }));
        //         updateInventoryDisplay();  // Update inventory display after removing the item
        //     }
        //     break;

        case 'q':
            if (inventory.length > 0) {
                const poppedItem = inventory.pop();
                goBacks.push(poppedItem);
                updateGoBacksDisplay();
                updateInventoryDisplay();
            }
            break;
            case 'p':
                if (isAtCashier() && allItemsAreGreen() && timer !== 0) {
                    const timeTaken = 100 - totalSeconds; // Calculate time taken

                    const bestTime = localStorage.getItem('bestTime');
            
                    if (!bestTime || timeTaken < bestTime) {
                        localStorage.setItem('bestTime', timeTaken);
                        updateBestTimeDisplay();
                    }

                    document.querySelector('#message').innerHTML = 'Thank you for shopping!';
                    document.querySelector('#message').style.display = 'flex';
                    document.querySelector('#play-button').style.display = 'flex';
                    document.querySelector('canvas').setAttribute('class', 'fade-out');
                    document.querySelector('#side').setAttribute('class', 'fade-out');
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
                    decreaseTimer(); // Start the timer when the game starts
                } else if (!isTimerPaused) {
                    isTimerPaused = true;
                    pauseGame();
                    pauseTimer();
                    showInstructions();
                } else {
                    isTimerPaused = false;
                    decreaseTimer();
                    resumeGame();
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

function resetMap() {
    // Clear existing game objects and recreate the map
    boundaries.length = 0;
    food.length = 0;
    storeItems.length = 0;
    goBacks.length = 0;

    // Call the function to recreate the map
    createMap();
}

let isGameRunning = false;

const playAgainButton = document.querySelector('#play-again');

// playAgainButton.removeEventListener('click', handlePlayAgainClick);

playAgainButton.addEventListener('click', () => {
    // Reset the game state and start a new game
    // For example, reset inventory, timer, player position, etc.
    inventory.length = 0; // Clear inventory
    totalSeconds = 100; // Reset timer to 300 seconds
    sam.position.x = Boundary.width + Boundary.width * 13.5; // Reset player position
    sam.position.y = Boundary.height + Boundary.height - 15;
    sam.velocity.x = 0;
    sam.velocity.y = 0;

    resetMap();

    updateInventoryDisplay();

    // Reset any other game state variables or objects as needed
    document.querySelector('#gobacks-display').innerHTML = '';

    document.querySelector('#timer').style.color = 'black';
    document.querySelector('#timer').style.borderColor = 'black';
    document.querySelector('#timer').classList.remove('pulsate-bck');

    // Hide message and play button
    document.querySelector('#message').style.display = 'none';
    document.querySelector('#play-button').style.display = 'none';

    // Reset the canvas class to remove fade-out effect
    document.querySelector('canvas').classList.remove('fade-out');
    document.querySelector('#side').classList.remove('fade-out');
});


function updateBestTimeDisplay() {
    const bestTime = localStorage.getItem('bestTime');

    if (bestTime) {
        document.getElementById('best-time').textContent = `Best Time: ${bestTime} seconds`;
    } else {
        document.getElementById('best-time').textContent = 'Best Time: N/A';
    }
}

document.getElementById('play-again').addEventListener('click', () => {
    updateBestTimeDisplay();
});

animate();
console.log(inventory);