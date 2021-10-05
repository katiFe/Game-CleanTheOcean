class Game {
    constructor() {
        this.currentTime = 0;
        this.diver = null;
        this.sharkArr = [];
        this.bagArr = [];
    }

    startGame() {
        this.diver = new Diver();
        this.diver.create();
        this.addEventListeners();


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
                if (shark.x < 0) {
                    shark.remove();
                    this.sharkArr.shift();
                }
            })

            //obstacle collution 
            this.sharkArr.forEach((shark) => {
                if (shark.x === 0) {
                    if (this.diver.y < shark.y + shark.height &&
                        this.diver.y + this.diver.height > shark.y) {
                        alert("Game Over");
                    }
                }
            })


            // create score points/bags
            if (this.currentTime % 3 === 0) {
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
                if (bag.x < 0) {
                    bag.remove();
                    this.bagArr.shift();
                }
            })

            //collusion detection
            this.bagArr.forEach((bag) => {
                let score = 0;
                if (bag.x === 0) {
                    if (
                        this.diver.y < bag.y + bag.height &&
                        this.diver.y + this.diver.height > bag.y
                    ) {
                        score = score + 5;
                    
                        console.log(score);
                    }
                    console.log(score);
                }
            });

        }, 500);
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
        this.width = 10;
        this.height = 17;
        this.x = 0;
        this.y = 50;
        this.movementSpeed = 3;
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
}

class Shark extends Item {
    constructor() {
        super();
        this.width = 20;
        this.height = 17;
        this.x = 90;
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
        this.width = 5;
        this.height = 8;
        this.x = 90;
        //set random point where to start 
        this.y = Math.floor(Math.random() * (90 - 10 + 1) + 10);
        this.className = "plastik";
        this.movementSpeed = 10;
    }

    moveLeft() {
        this.x -= this.movementSpeed;

    }
}




