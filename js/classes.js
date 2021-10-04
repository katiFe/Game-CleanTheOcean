class Game {
    constructor() {
        this.currentTime = 0;
        this.diver = null;
        this.sharkArr = [];
    }

    startGame() {
        this.diver = new Diver();
        this.diver.create();
        this.addEventListeners();


        const oneShark = new Shark();
        oneShark.create();
        oneShark.draw();

        //setting interval for obstacles to come

        setInterval(() => {
            // timer needs to be updated
            this.currentTime++;

            this.sharkArr.forEach((shark) => {
                shark.moveLeft();
                shark.draw();
            })
        }, 1000);
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
        });

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
        this.height = 10;
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
        if (this.y > 3) {
            this.y -= this.movementSpeed;
        }
    }
}

class Shark extends Item {
    constructor() {
        super();
        this.width = 10;
        this.height = 10;
        this.x = 90;
        this.y = 50;
        this.className = "shark";
        this.movementSpeed = 10;
    }

    moveLeft() {
        this.x -= this.movementSpeed;

    }
}




