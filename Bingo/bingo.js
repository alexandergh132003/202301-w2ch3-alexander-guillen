/* eslint-disable no-negated-condition */
/* eslint-disable no-alert */
const bingo = () => {
  const promptWithType = (str, type) => {
    const input = prompt(str);
    if (input !== null) {
      if (input.trim() === "") {
        alert("Missing arguments");
        return promptWithType(str, type);
      }

      if (type === "number") {
        if (/^[0-9]+$/.test(input.trim())) {
          return Number(input.trim());
        }

        alert("Enter only numbers.");
        return promptWithType(str, type);
      }

      if (type === "string") {
        if (/^[A-Za-z\s]*$/.test(input.trim())) {
          return input.trim();
        }

        alert("Enter only letters.");
        return promptWithType(str, type);
      }
    } else {
      return input;
    }
  };

  const name = promptWithType("Enter your name", "string") || "stranger";
  const players = [
    {
      playerName: name,
      points: 0,
    },
    {
      playerName: "Benito Camelas",
      points: 0,
    },
    {
      playerName: "Solomeo Paredes",
      points: 0,
    },
    {
      playerName: "Barry Allen",
      points: 0,
    },
    {
      playerName: "Snape",
      points: 0,
    },
    {
      playerName: "NoobMaster69",
      points: 0,
    },
  ];

  alert(`Hello, ${name}. Welcome to ISDI CODERS Bingo.
You will be shown a card with 15 numbers divided into 3 rows. Each row contains 5 numbers. You can choose a new card, if the one you are shown does not suit you. At each turn a random number will be shown on the screen. If the number matches any of the numbers on the card, that number will be marked with an X. If all the numbers in a row are marked, "Line!" will be alerted. If all the numbers on the card are marked, "Bingo!" will be alerted. 
Finally, your score will be displayed on the screen.`);

  alert(`The points for each game are calculated as follows.
((90 - turns) / 75) x 100 (without decimals)
So if you manage to complete the game in a total of 15 turns you will have 100 points. The less turns the more points.`);

  const game = () => {
    const showPunctuation = () => {
      const assignRandomPoints = () => {
        for (let i = 0; i < players.length; i++) {
          if (players[i].playerName !== name) {
            players[i].points += Math.floor(Math.random() * 101);
          } else {
            players[i].points += punctuation;
          }
        }
      };

      assignRandomPoints();

      const sortPlayersByPoints = () => {
        players.sort((player1, player2) => {
          if (player1.points > player2.points) {
            return -1;
          }

          if (player2.points > player1.points) {
            return 1;
          }

          return 0;
        });
      };

      sortPlayersByPoints();

      const player = players.find((player) => player.playerName === name);

      alert(`Your cumulative score is ${player.points} points.
  
  ${players[0].playerName} - ${players[0].points}
  
  ${players[1].playerName} - ${players[1].points}
  
  ${players[2].playerName} - ${players[2].points}
  
  ${players[3].playerName} - ${players[3].points}
  
  ${players[4].playerName} - ${players[4].points}
  
  ${players[5].playerName} - ${players[5].points}`);
    };

    const assingBingoCard = (bingoCard, message, keepCard) => {
      bingoCard = [];

      while (bingoCard.length < 15) {
        const randomNumber = Math.floor(Math.random() * 90) + 1;
        if (!bingoCard.includes(randomNumber)) {
          bingoCard.push(randomNumber);
        }
      }

      message = `\n${bingoCard[0]} ${bingoCard[1]} ${bingoCard[2]} ${bingoCard[3]} ${bingoCard[4]}\n${bingoCard[5]} ${bingoCard[6]} ${bingoCard[7]} ${bingoCard[8]} ${bingoCard[9]}\n${bingoCard[10]} ${bingoCard[11]} ${bingoCard[12]} ${bingoCard[13]} ${bingoCard[14]}\n\n`;

      const keep = () => {
        keepCard = promptWithType(
          `Your card is next: ${message} Enter "yes" if you want to keep the card, "no" if you want to change the card, cancel if you want to quit the game.`,
          "string"
        );

        if (keepCard === null) {
          if (confirm("Wan to exit game?")) {
            alert("Goodbye");
          } else {
            return keep();
          }
        } else {
          keepCard = keepCard.trim();
          if (keepCard === "yes") {
            return bingoCard;
          }

          if (keepCard === "no") {
            return assingBingoCard();
          }

          alert("Invalid input");
          return keep();
        }
      };

      return keep();
    };

    const bingoCard = assingBingoCard();
    let line1 = bingoCard.slice(0, 5);
    let line2 = bingoCard.slice(5, 10);
    let line3 = bingoCard.slice(10);
    const changeToX = (element, index, randomNumber) => {
      if (element === randomNumber) {
        return "X";
      }

      return element;
    };

    const showCard = () =>
      `\n${line1.join(" ")}\n${line2.join(" ")}\n${line3.join(" ")}`;

    const correctNumbers = bingoCard;
    const incorrectNumbers = [];
    while (incorrectNumbers.length < 75) {
      const randomNumber = Math.floor(Math.random() * 90) + 1;
      if (
        !correctNumbers.includes(randomNumber) &&
        !incorrectNumbers.includes(randomNumber)
      ) {
        incorrectNumbers.push(randomNumber);
      }
    }

    const getRandomNumber = () => {
      const firstRandomNum = Math.random();
      const secondRandomNum = Math.random();
      const luck = firstRandomNum < secondRandomNum;

      if (luck) {
        const correctNum = [
          correctNumbers[Math.floor(Math.random() * correctNumbers.length)],
          true,
        ];
        correctNumbers.splice(correctNumbers.indexOf(correctNum[0]), 1);
        return correctNum;
      }

      const incorrectNum = [
        incorrectNumbers[Math.floor(Math.random() * incorrectNumbers.length)],
        false,
      ];
      incorrectNumbers.splice(incorrectNumbers.indexOf(incorrectNum[0]), 1);
      return incorrectNum;
    };

    let lineAlerted = false;

    let turns = 1;
    while (correctNumbers.length > 0) {
      const number = getRandomNumber();
      alert(`Turn ${turns}:\n NUMBER ${number[0]}`);
      if (number[1]) {
        line1 = line1.map((element) => changeToX(element, null, number[0]));
        line2 = line2.map((element) => changeToX(element, null, number[0]));
        line3 = line3.map((element) => changeToX(element, null, number[0]));
        alert(
          `Number ${
            number[0]
          } has been found and has therefore been marked with an X.\n${showCard()}`
        );
      } else {
        alert(`Number ${number[0]} has not been found.\n${showCard()}`);
      }

      if (line1.every((x) => x === "X") && !lineAlerted) {
        alert("Line!");
        lineAlerted = true;
      }

      if (line2.every((x) => x === "X") && !lineAlerted) {
        alert("Line!");
        lineAlerted = true;
      }

      if (line3.every((x) => x === "X") && !lineAlerted) {
        alert("Line!");
        lineAlerted = true;
      }

      if (line1.concat(line2, line3).every((x) => x === "X")) {
        alert("Bingo!");
        break;
      }

      turns++;
    }

    alert(`You have completed this game in a total of ${turns} turns.`);
    const punctuation = Math.trunc(((90 - turns) / 75) * 100);
    alert(`Your score for this round is ${punctuation} points.`);
    showPunctuation();

    const keepPlaying = confirm("Do you want to continue playing");

    if (keepPlaying === true) {
      game();
    } else {
      alert("Goodbye");
    }
  };

  game();
};

bingo();
