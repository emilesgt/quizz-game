let gameSettings = {
    players: [], //info of the players
    subject: '', //subject of the questions
    questionsPerPlayer: 3,
    currentPlayerIndex: 0, //which player's turn
    currentQuestionIndex: 0, ///whihc question 
    questions: [], 
    isGameOver: false //boolean to end game
};

//sample questions data 
const questionsData = {
    HTML: [
        {
            question: "What does HTML stand for?",
            
            options: ["Hyper Tool Markup Language", "Hyperlinks Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language"],
            correct: 3
        },
        {
            question: "Which tag is used to define a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correct: 1
        },
        {
            question: "What tag is used for inserting an image?",
            options: ["<img>", "<image>", "<pic>", "<src>"],
            correct: 0
        },
        {
            question: "What does the <br> tag add to an HTML document?",
            options: ["A break line", "Bold text", "A border", "Background color"],
            correct: 0
        },
        {
            question: "Which HTML tag is used to define an unordered list?",
            options: ["<ol>", "<ul>", "<list>", "<li>"],
            correct: 1
        },
        {
            question: "Which tag is used to create a table in HTML?",
            options: ["<table>", "<tab>", "<tr>", "<td>"],
            correct: 0
        },
        {
            question: "Which attribute is used to provide a unique identifier to an element?",
            options: ["class", "id", "type", "name"],
            correct: 1
        },
        {
            question: "What is the purpose of the <meta> tag?",
            options: ["To store metadata", "To add a heading", "To add a link", "To create a new paragraph"],
            correct: 0
        },
        {
            question: "Which tag is used to create a dropdown list?",
            options: ["<dropdown>", "<select>", "<list>", "<input>"],
            correct: 1
        }
    ],
    CSS: [
        {
            question: "What does CSS stand for?",
            options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
            correct: 0
        },
        {
            question: "Which property is used to change the background color?",
            options: ["bgcolor", "color", "background-color", "bg-color"],
            correct: 2
        },
        {
            question: "How do you make text bold in CSS?",
            options: ["font-weight: bold;", "text-decoration: bold;", "style: bold;", "text-weight: bold;"],
            correct: 0
        },
        {
            question: "Which CSS property controls the text size?",
            options: ["font-size", "text-size", "font-style", "text-style"],
            correct: 0
        },
        {
            question: "How do you add a comment in CSS?",
            options: ["// comment", "<!-- comment -->", "/* comment */", "# comment"],
            correct: 2
        },
        {
            question: "Which property is used to change the font of an element?",
            options: ["font-family", "font-style", "text-font", "font-text"],
            correct: 0
        },
        {
            question: "Which property is used to align text to the center?",
            options: ["text-align: center;", "align: center;", "center-text: true;", "text-position: center;"],
            correct: 0
        },
        {
            question: "What is the default value of the position property?",
            options: ["absolute", "relative", "static", "fixed"],
            correct: 2
        },
        {
            question: "Which CSS property adds space inside an element's border?",
            options: ["margin", "padding", "spacing", "border"],
            correct: 1
        }
    ],
    JS: [
        {
            question: "Which of the following is a JavaScript framework?",
            options: ["Django", "Laravel", "React", "Spring"],
            correct: 2
        },
        {
            question: "What does 'DOM' stand for?",
            options: ["Document Object Model", "Data Object Model", "Document Orientation Model", "Data Orientation Model"],
            correct: 0
        },
        {
            question: "How do you declare a JavaScript variable?",
            options: ["var", "let", "const", "All of the above"],
            correct: 3
        },
        {
            question: "Which symbol is used for comments in JavaScript?",
            options: ["//", "/*", "#", "<!--"],
            correct: 0
        },
        {
            question: "What keyword is used to define a function in JavaScript?",
            options: ["def", "function", "func", "define"],
            correct: 1
        },
        {
            question: "Which method is used to access an HTML element by its ID?",
            options: ["getElementById()", "getElementByClass()", "getId()", "querySelector()"],
            correct: 0
        },
        {
            question: "How do you convert a string to an integer in JavaScript?",
            options: ["parseInt()", "toInt()", "Integer()", "parseInteger()"],
            correct: 0
        },
        {
            question: "What will the following code return: Boolean(10 > 9)?",
            options: ["true", "false", "NaN", "undefined"],
            correct: 0
        },
        {
            question: "What is the correct syntax for a for loop?",
            options: ["for (i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <= 5; i++)", "for (i++ <= 5)"],
            correct: 2
        }
    ]
};




//initialize the game screen
function renderPlayerSelection() {
    const appDiv = document.getElementById('app'); //gets app in index.html
    appDiv.innerHTML = `
        <h2>Select Players</h2>
        <label for="players-count">Number of Players:</label>
        <input type="number" id="players-count" value="1" min="1" max="4">
        <div id="player-info"></div>
        <button id="next-screen">Next</button>
    `;//edits html and adds a header "players with number of player info, default 1, 1<x<4", adds player info, adds next screen button

    const playerCountInput = document.getElementById('players-count');
    playerCountInput.addEventListener('input', generatePlayerInputs); //the event listener responds to edits made within the page like player info

    document.getElementById('next-screen').addEventListener('click', renderSubjectSelection);

    generatePlayerInputs();  //initial call
}

//function to dynamically create player inputs
function generatePlayerInputs() {
    const playerCount = parseInt(document.getElementById('players-count').value); //gets number of players and converts it to integer
    console.log("Generating inputs for", playerCount, "players."); //for debugging in case my code is bad

    const playerInfoDiv = document.getElementById('player-info');
    playerInfoDiv.innerHTML = '';  // Clear existing content

    for (let i = 0; i < playerCount; i++) { //color picker, name picker
        playerInfoDiv.innerHTML += `
            <div>
                <label>Player ${i + 1} Name:</label>
                <input type="text" id="player-${i}-name" value="Player ${i + 1}">
                <label>Color:</label>
                <input type="color" id="player-${i}-color" value="#${Math.floor(Math.random() * 16777215).toString(16)}">
            </div>
        `;
        console.log(`Created input for Player ${i + 1}: player-${i}-name and player-${i}-color`); //for debugging
    }
}



//function to go to the next screen - subject selection
//store the player data and go to the subject selection screen
function renderSubjectSelection() {
    const players = collectPlayerData();  //collect player data before switching screens so i don't lose the info
    gameSettings.players = players;       //store player data in gameSettings

    const appDiv = document.getElementById('app');
    appDiv.innerHTML = `
        <h2>Select Subject</h2>
        <select id="subject">
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JS">JS</option>
            <option value="Mixed">Mixed</option>
        </select>

        <h2>Select Difficulty</h2>
        <select id="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>

        <label for="questions-per-player">Questions per Player:</label>
        <select id="questions-per-player">
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <button id="start-game">Start Game</button>
        <button id="prev-screen">Back</button>
    `;//adds subject dropdown, difficulty dropdown (function doesn't work yet), number of questions dropdown (3,4,5)

    //event listeners for buttons
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('prev-screen').addEventListener('click', renderPlayerSelection);
}






// Function to start the game
function startGame() {
    console.log('Start Game button pressed'); //debugging

    // Get the subject, difficulty, and number of questions per player
    const subject = document.getElementById('subject').value;
    const difficulty = document.getElementById('difficulty').value;
    const questionsPerPlayer = parseInt(document.getElementById('questions-per-player').value);

    // Ensure difficulty is selected
    if (!difficulty) {
        console.error("Difficulty selection is missing!");
        return;
    }

    //collect player data stored earlier
    const players = gameSettings.players;

    //store settings in gameSettings
    gameSettings.players = players;
    gameSettings.subject = subject;
    gameSettings.difficulty = difficulty;
    gameSettings.questionsPerPlayer = questionsPerPlayer;

    //fetch the relevant questions based on subject and difficulty
    if (subject === "Mixed") {
        // Combine questions from all subjects
        gameSettings.questions = shuffleQuestions([...questionsData.HTML, ...questionsData.CSS, ...questionsData.JS]);
    } else if (questionsData[subject] && Array.isArray(questionsData[subject])) {
        // Specific subjects (HTML, CSS, JS)
        gameSettings.questions = shuffleQuestions([...questionsData[subject]]);
    } else {
        // Error if subject is not valid
        console.error(`Subject "${subject}" not found or is not valid.`);
        return;
    }

    //start the game by rendering the first question screen
    renderGameScreen();
}







//collect player data from the form
function collectPlayerData() {
    const playerCount = parseInt(document.getElementById('players-count').value);
    const players = [];
    console.log("Collecting data for", playerCount, "players.");

    for (let i = 0; i < playerCount; i++) {
        const playerNameInput = document.getElementById(`player-${i}-name`);
        const playerColorInput = document.getElementById(`player-${i}-color`);

        //check if inputs exist
        if (!playerNameInput || !playerColorInput) {
            console.error(`Player inputs for player ${i + 1} not found.`);
            return null;
        }

        const playerName = playerNameInput.value; //recreate another variable for better comprehension
        const playerColor = playerColorInput.value; //same

        players.push({ name: playerName, color: playerColor, score: 0 });
        console.log(`Collected Player ${i + 1}: ${playerName}, color: ${playerColor}`);
    }

    return players;
}




//initialize the game when page loads
window.onload = function() {
    renderPlayerSelection();
};


function escapeHTML(str) { //before I put this function, the "<>" in the answers were treated like tags and not strings messing up everything
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}


function renderGameScreen() {
    //get the current player
    const currentPlayer = gameSettings.players[gameSettings.currentPlayerIndex];
    const currentQuestion = gameSettings.questions[gameSettings.currentQuestionIndex];

    //create the game screen
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = `
        <h2 style="color: ${currentPlayer.color}">${currentPlayer.name}'s turn</h2>
        <p id="question-text">${currentQuestion.question}</p>
        <div id="options">
            ${currentQuestion.options.map((option, index) => `
                <button class="option-btn" data-index="${index}" style="background-color: ${currentPlayer.color}">${escapeHTML(option)}</button>
            `).join('')}
        </div>

        <div id="timer">10</div>
        <button id="submit-answer" disabled>Submit</button>
    `;

    //attach event listeners to answer buttons
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', selectAnswer);
    });

    //timer starts
    startTimer();

    //attach event listener to the submit button
    document.getElementById('submit-answer').addEventListener('click', submitAnswer);
}

let selectedAnswer = null;

function selectAnswer(event) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.style.border = "none");  // Remove previous selection

    //highlight the selected button
    event.target.style.border = `3px solid ${gameSettings.players[gameSettings.currentPlayerIndex].color}`;
    selectedAnswer = parseInt(event.target.getAttribute('data-index'));

    //enable submit button
    document.getElementById('submit-answer').disabled = false;
}

let timer;
let timeLeft = 10;

function startTimer() {
    timeLeft = 10;
    timer = setInterval(() => {
        document.getElementById('timer').innerText = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            submitAnswer();  //automatically submit the answer when time runs out
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function submitAnswer() {
    stopTimer();

    //check if the selected answer is correct
    const currentQuestion = gameSettings.questions[gameSettings.currentQuestionIndex];
    const currentPlayer = gameSettings.players[gameSettings.currentPlayerIndex];

    if (selectedAnswer === currentQuestion.correct) {
        currentPlayer.score += 10;  // Add 10 points for the correct answer
    }

    //move to the next question or player
    nextTurn();
}

function nextTurn() {
    selectedAnswer = null;  //reset selected answer

    //move to the next player's turn
    gameSettings.currentPlayerIndex++;
    
    if (gameSettings.currentPlayerIndex >= gameSettings.players.length) {
        //all players answered the current question, move to the next question
        gameSettings.currentPlayerIndex = 0;
        gameSettings.currentQuestionIndex++;
    }

    //check if the game is over (no more questions)
    if (gameSettings.currentQuestionIndex >= gameSettings.questionsPerPlayer) {
        endGame();
    } else {
        //continue with the next question
        renderGameScreen();
    }
}

function endGame() {
    gameSettings.isGameOver = true;

    //sort players by score in descending order
    const sortedPlayers = gameSettings.players.sort((a, b) => b.score - a.score);

    //display results
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = `
        <h2>Game Over!</h2>
        <h3>Results:</h3>
        <ul>
            ${sortedPlayers.map(player => `
                <li style="color: ${player.color}">${player.name}: ${player.score} points</li>
            `).join('')}
        </ul>
        <button id="play-again">Play Again</button>
    `;

    //play again button to restart the game
    document.getElementById('play-again').addEventListener('click', resetGame);
}

function resetGame() {
    //reset game settings
    gameSettings.currentPlayerIndex = 0;
    gameSettings.currentQuestionIndex = 0;
    gameSettings.players.forEach(player => player.score = 0);

    //go back to the player selection screen
    renderPlayerSelection();
}

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
