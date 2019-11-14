var rounds = 5, round = 1;

var player1 = {
    name: "Você",
    choice: "?",
    points: 0
}

var player2 = {
    name: "Máquina",
    choice: "?",
    points: 0
}

var message, dataDivs;

function setDivs() {
    setValuesDiv();
    dataDivs.forEach(div => {
        clearDiv(div);
        mountDiv(div);
    });
}

function setValuesDiv() {
    dataDivs = [
        {
            element: "h2",
            text: "Rodada " + round + " / " + rounds,
            id: "rounds",
        },
        {
            element: "h4",
            text: message,
            id: "message",
        },
        {
            element: "h3",
            text: player1.name + " X " + player2.name,
            id: "players",
        },
        {
            element: "h3",
            text: player1.choice + " X " + player2.choice,
            id: "choices-players",
        },
        {
            element: "h3",
            text: player1.points + " X " + player2.points,
            id: "points-players",
        }
    ]
}

function clearDiv({id}) {
    document.getElementById(id).innerHTML = "";
}

function mountDiv({element, text, id}) {
    let elementText = document.createElement(element);
    elementText.innerHTML = text;
    let div = document.getElementById(id);
    div.appendChild(elementText);
}

var idsAllButtons = ['button-stone', 'button-paper', 'button-scissors', 'button-new-play'];

function clickButtonChoice(choice){
    player1.choice = choice;
    player2.choice = randomChoice();
    disableButtons(true);
    checkWinnerRound();
    setDivs();
    setTimeout(nextRound, 2000);
}

function disableButtons(status) {
    idsAllButtons.forEach(button => {
        document.getElementById(button).disabled = status;
    });
}

function randomChoice() {
    let choices = ['Pedra', 'Papel', 'Tesoura'];
    let min = Math.ceil(0);
    let max = Math.floor(2);
    let numberRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    return choices[numberRandom];
}

var won = "Você ganhou a rodada!";
var defeat = "Você perdeu a rodada!";

function checkWinnerRound() {
    if(player1.choice.includes(player2.choice)){
        player1.points++;
        player2.points++;
        message = "Rodada empatada!";
    }else{
        switch (player1.choice) {
            case "Pedra":
                if(player2.choice.includes("Tesoura")){
                    player1.points++;
                    message = won;
                }else{
                    player2.points++;
                    message = defeat;
                }
                break;
            case "Papel":
                if(player2.choice.includes("Pedra")){
                    player1.points++;
                    message = won;
                }else{
                    player2.points++;
                    message = defeat;
                }
                break;
            default:
                if(player2.choice.includes("Papel")){
                    player1.points++;
                    message = won;
                }else{
                    player2.points++;
                    message = defeat;
                }
                break;
        }
    }
}

function nextRound() {
    round++;
    if (round <= rounds) {
        player1.choice = "?";
        player2.choice = "?";
        message = "Aguardando sua escolha...";
        setDivs();
        disableButtons(false);
    }else{
        if(player1.points > player2.points){
            alert("Você ganhou a partida!");
        }else if(player1.points < player2.points){
            alert("Você perdeu a partida!");
        }else{
            alert("Partida empatada!");
        }
        document.getElementById('button-new-play').disabled = false;
    }
    
}

function newPlay() {
    round = 1;
    player1.choice = "?";
    player1.points = 0;
    player2.choice = "?";
    player2.points = 0;
    message = "Aguardando sua escolha...";
    disableButtons(false);
    setDivs();
}

newPlay();
