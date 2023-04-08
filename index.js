let gameBoard = document.querySelector('.gameBoard');
let gameButtons = Array.from(document.querySelectorAll('.gameBtn'));
let playerScore = document.querySelector('.player');
let computerScore = document.querySelector('.computer');
let resetGame = document.querySelector('.resetGame');

let gameInitially = document.querySelector(".initially");

const gameWins = [
    {win : 'Paper', lose : 'Rock'},
    {win : 'Rock', lose : 'Scissors'},
    {win : 'Scissors', lose : 'Paper'}
]

let computerShows = ['Rock', 'Paper', 'Scissors'];

let playerPlays = 0; 
let computerPlays = 0; 

function chooseRandomlyOne() {
    let lengthOfShows = computerShows.length;
    return Math.floor(Math.random()*lengthOfShows);
}

function toScrollTheBoard() {
    if (gameBoard.scrollHeight > 400) {
        let differenceHeight = gameBoard.clientHeight - gameBoard.scrollHeight;
        gameBoard.scrollTop = differenceHeight;
        gameBoard.scrollIntoView({
            behavior : 'smooth'
        })
    }
}

function resetCompleteGame() {
    playerPlays = 0;
    computerPlays = 0;
    playerScore.innerHTML = 'Player(P) : 0';
    computerScore.innerHTML = 'Computer(C) : 0';
    gameBoard.innerHTML = `<span class="initially">Start The Game.</span>`;
}

function handleButtonClick(show) {

    let playerChance = show;
    let computerChance = computerShows[chooseRandomlyOne()]

    gameWins.forEach((wins) => {
      let { win, lose } = wins;
      let winner = document.createElement("span");
      winner.classList.add("initially");

        if (playerChance === win && computerChance === lose) {
            playerPlays = playerPlays + 1;
            setTimeout(() => {
            winner.innerHTML = "Player +1";
            gameBoard.append(winner);
            toScrollTheBoard();
            }, 850);
        }

        if (computerChance === win && playerChance === lose) {
            computerPlays = computerPlays + 1;
            setTimeout(() => {
                winner.innerHTML = 'Computer +1';
                gameBoard.append(winner);
                toScrollTheBoard();
            }, 810);
        }

    });
    
    // Player's Time.
    let playerGameDiv = document.createElement('div');
    playerGameDiv.classList.add('playerGameDiv');
    let itsPlayer = document.createElement('span');
    itsPlayer.classList.add('itsPlayer');
    itsPlayer.innerHTML = 'Player';

    let playerShow = document.createElement('span');
    playerShow.classList.add('playerShow','showTime');

    let playerShowImage = document.createElement('img');
    playerShowImage.setAttribute('src', `./Assets/${playerChance}.png`);
    playerShowImage.setAttribute('alt', playerChance);
    playerShowImage.classList.add('showImage');
    
    // Computer's Time.
    let computerGameDiv = document.createElement('div');
    computerGameDiv.classList.add('computerGameDiv');
    let itsComputer = document.createElement('span');
    itsComputer.classList.add('itsComputer');
    itsComputer.innerHTML = 'Computer';

    let computerShow = document.createElement("span");
    computerShow.classList.add('computerShow','showTime');

    let computerShowImage = document.createElement("img");
    computerShowImage.setAttribute("src", `./Assets/${computerChance}.png`);
    computerShowImage.setAttribute('alt', computerChance);
    computerShowImage.classList.add("showImage");

    playerShow.append(playerShowImage);

    playerGameDiv.append(itsPlayer, playerShow);
    
    gameBoard.append(playerGameDiv)
    
    toScrollTheBoard();

    gameButtons.forEach((button) => {
        button.disabled = true;
    })

    setTimeout(() => {
        computerShow.append(computerShowImage);
        computerGameDiv.append(computerShow, itsComputer);
        gameBoard.append(computerGameDiv);
        toScrollTheBoard();
        playerScore.innerHTML = `Player(P) : ${playerPlays}`;
        computerScore.innerHTML = `Computer(C) : ${computerPlays}`;
        gameButtons.forEach((button) => {
          button.disabled = false;
        });
    }, 0);

}

gameButtons.forEach((button) => {
    button.addEventListener('click', () => {handleButtonClick(button.dataset.play)});
})

resetGame.addEventListener('click', () => {
    let resetSpan = document.createElement('span');
    resetSpan.classList.add('initially');
    resetSpan.innerHTML = 'Resetting...';
    gameBoard.append(resetSpan);
    toScrollTheBoard();
    resetGame.disabled = true;
    setTimeout(() => {
        resetCompleteGame();
        resetGame.disabled = false;
    }, 1000)
});