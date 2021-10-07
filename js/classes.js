class Game {
    constructor() {
        this.currentTime = 0;
        this.diver = null;
        this.sharkArr = [];
        this.bagArr = [];
        this.score = 0;
        this.turtleArr = [];
    }

    startGame() {
        this.diver = new Diver();
        this.diver.create();
        this.addEventListeners();
        // let totalScore = document.getElementbyId('score');
        // totalScore.innerHTML = this.score;


        //setting interval for obstacles to come

        setInterval(() => {
            // timer needs to be updated
            this.currentTime++;


            //add sharks
            if (this.currentTime % 5 === 0) {
                const newShark = new Shark();
                newShark.create();
                this.sharkArr.push(newShark);
            }


            //update obstacle positions
            this.sharkArr.forEach((shark) => {
                shark.moveLeft();
                shark.draw();

            })

            //remove obstacle from board
            this.sharkArr.forEach((shark) => {
                //- 4 is set because with 0 it would disappear earlier/ 
                if (shark.x < - 4) {
                    shark.remove();
                    this.sharkArr.shift();
                }
            })

            //obstacle collison 
            this.sharkArr.forEach((shark) => {
                if (this.diver.x < shark.x + shark.width &&
                    this.diver.x + this.diver.width > shark.x &&
                    this.diver.y < shark.y + shark.height &&
                    this.diver.y + this.diver.height > shark.y) {
                    console.log("____collision detected___");
                    console.log("this.diver.x...", this.diver.x);
                    console.log("shark.x...", shark.x);
                    console.log("shark.width...", shark.width);

                    console.log("this.diver.width...", this.diver.width);
                    console.log("this.diver.y...", this.diver.y);
                    console.log("shark.y...", shark.y);
                    console.log("shark.height...", shark.height);
                    console.log("this.diver.height...", this.diver.height);


                    alert("Game Over");

                }
            })

        }, 500);


        setInterval(() => {
            // timer needs to be updated
            this.currentTime++;


            // create score points/bags
            if (this.currentTime % 8 === 0) {
                const newBag = new Bag();
                newBag.create();
                this.bagArr.push(newBag);

            }

            //update score points/bags positions
            this.bagArr.forEach((bag) => {
                bag.moveLeft();
                bag.draw();
            })

            //remove score points/ bags from board
            this.bagArr.forEach((bag) => {
                //- 10 is set because with 0 it would disappear earlier
                if (bag.x < - 5) {
                    bag.remove();
                    this.bagArr.shift();
                }
            })

            //collusion detection
            this.bagArr.forEach((bag) => {
                if (this.diver.x < bag.x + bag.width &&
                    this.diver.x + this.diver.width > bag.x &&
                    this.diver.y < bag.y + bag.height &&
                    this.diver.y + this.diver.height > bag.y) {
                    this.score = this.score + 1;
                    bag.remove();
                    console.log(this.score);
                }
            })

        }, 600);

        setInterval(() => {
            // timer needs to be updated
            this.currentTime++;


            // create score points/bags
            if (this.currentTime % 25 === 0) {
                const newTurtle = new Turtle();
                newTurtle.create();
                this.turtleArr.push(newTurtle);

            }

            //update score points/bags positions
            this.turtleArr.forEach((turtle) => {
                turtle.moveUp();
                turtle.draw();
            })

            //remove score points/ bags from board/ 
            this.turtleArr.forEach((turtle) => {
                if (turtle.y < 10) {
                    turtle.remove();
                    this.turtleArr.shift();
                }
            })

            //collusion detection
            this.turtleArr.forEach((turtle) => {
                if (this.diver.x < turtle.x + turtle.width &&
                    this.diver.x + this.diver.width > turtle.x &&
                    this.diver.y < turtle.y + turtle.height &&
                    this.diver.y + this.diver.height > turtle.y) {
                    this.score = this.score + 5;
                    turtle.remove();
                    console.log(this.score);
                }
            })
        }, 800);


    }




    addEventListeners() {
        //linking arrow buttom up & down in order to move diver
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
                this.diver.moveDown();
                this.diver.draw();
            } else if (event.key === "ArrowUp") {
                this.diver.moveUp();
                this.diver.draw();
            } else if (event.key === "ArrowLeft") {
                this.diver.moveLeft();
                this.diver.draw();

            } else if (event.key === "ArrowRight") {
                this.diver.moveRight();
                this.diver.draw();
            }
        })

    }

}

class Item {
    constructor() {
        this.domElm = null;
        this.gameElm = document.getElementById("game");
    }
    create() {
        this.domElm = document.createElement("div");
        this.domElm.className = this.className;
        this.gameElm.appendChild(this.domElm);
    }
    remove() {
        this.gameElm.removeChild(this.domElm);
    }
    draw() {
        this.domElm.style.width = this.width + "%";
        this.domElm.style.height = this.height + "%";
        this.domElm.style.left = this.x + "%";
        this.domElm.style.top = this.y + "%";
    }
}

class Diver extends Item {
    constructor() {
        super();
        this.width = 7;
        this.height = 12;
        this.x = 0;
        this.y = 50;
        this.movementSpeed = 10;
        this.className = "diver";
    }

    moveDown() {
        //setting border // 100 - 12 px to be still in board
        if (this.y < 88) {
            this.y += this.movementSpeed;
        }
    }

    moveUp() {
        //setting border //0 + 3px to be still in board
        if (this.y > 10) {
            this.y -= this.movementSpeed;
        }
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.movementSpeed;
        }
    }

    moveRight() {
        if (this.x < 100) {
            this.x += this.movementSpeed;
        }
    }
}

class Shark extends Item {
    constructor() {
        super();
        this.width = 12;
        this.height = 12;
        this.x = 95;
        //set random point where to start obstacles
        this.y = Math.floor(Math.random() * (85 - 10 + 1) + 10);
        this.className = "shark";
        this.movementSpeed = 10;
    }

    moveLeft() {
        this.x -= this.movementSpeed;

    }
}

class Bag extends Item {
    constructor() {
        super();
        this.width = 4;
        this.height = 8;
        this.x = 95;
        //set random point where to start 
        this.y = Math.floor(Math.random() * (90 - 10 + 1) + 10);
        this.className = "plastik";
        this.movementSpeed = 10;
    }

    moveLeft() {
        this.x -= this.movementSpeed;

    }
}

class Turtle extends Item {
    constructor() {
        super();
        this.width = 5;
        this.height = 8;
        this.y = 100;
        //set random point where to start 

        this.x = Math.floor(Math.random() * (100 - this.width + 1));
        this.className = "turtle";
        this.movementSpeed = 10;
    }

    moveUp() {
        this.y = this.y - 5;

    }
}



