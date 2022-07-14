// prompt-sync module that prompt user for input
const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '▓';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    this.field[0][0] = pathCharacter;
  }

  static generateField(height, width, percentage = 0.2) {
    let field = new Array(height);

    // Loop to create 2D array using 1D array
    for (let i = 0; i < field.length; i++) {
      field[i] = new Array(width);
    }

    // Loop to initilize 2D array elements.
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        const rand = Math.random();
        field[i][j] = rand > percentage ? fieldCharacter : hole;
      }
    }

    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };

    field[hatLocation.y][hatLocation.x] = hat;
    return field;
  }

  // play method which help user to play
  play() {
    let playing = true;
    this.instructions(); // calling instruction method
    while (playing) {
      this.print(); // calling print() method to show the current state of the field
      this.askQuestion(); // calling method that ask user where h/she want to go next
      if (!this.isInBounds()) {
        console.log("Oooops. You are Out of bounds!");
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log("Sorry, you loose your Hat!");
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log("Conglatulation, you found your hat!");
        playing = false;
        break;
      }
      // Update the current location on the map
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }

// method for showing user instructions
  instructions() {
    console.log('\n\n====================== INSTRUCTION ON FIND YOUR HAT GAME ======================')
    console.log(
      "\nType U, D, L, R, (Up, Down, Left, Right) and hit enter to find the hat --> ^\n\nPress control + c to exit The Game.\n"
    );
  } // end of instruction method


// askQuestion method that ask user where he want to go or move
  askQuestion() {
    const answer = prompt("\nWhich way do you want to go?: ").toLowerCase();
    switch (answer) {
      case "u":
        this.locationY -= 1;
        break;
      case "d":
        this.locationY += 1;
        break;
      case "l":
        this.locationX -= 1;
        break;
      case "r":
        this.locationX += 1;
        break;
      default:
        console.log("Invalid Input!!. Enter U, D, L or R.");
        this.askQuestion();
        break;
    }
  } // end of askQuestion method


  isInBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }


// print method that print the current state of the field (3)
  print() {
    // const displayString = this.field.join('\n');
    const displayString = this.field
      .map((row) => {
        return row.join(" ");
      })
      .join("\n");
    console.log(displayString);
  }

} // end of print method

const newField = new Field(Field.generateField(10, 10, 0.2));
newField.play();