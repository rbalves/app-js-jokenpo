var rounds = 5, round = 1;

var player1 = {
    name: "Jogador",
    choice: "?",
    points: 0
}

var player2 = {
    name: "Computador",
    choice: "?",
    points: 0
}

var message;

var dataDivs;

function setDivs() {
    setarValuesDiv();

    dataDivs.forEach(div => {
        clearDiv(div);
        mountDiv(div);
    });
}

function setarValuesDiv() {
    dataDivs = [
        {
            element: "h2",
            text: "Rodada " + round + " / " + rounds,
            id: "div-rounds",
        },
        {
            element: "h4",
            text: message,
            id: "message",
        },
        {
            element: "h3",
            text: player1.name + " X " + player2.name,
            id: "name-players",
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
    let div = document.getElementById(id);
    div.innerHTML = "";
}

function mountDiv({element, text, id}) {
    let elementText = document.createElement(element);
    elementText.innerHTML = text;
    let div = document.getElementById(id);
    div.appendChild(elementText);
}

var divsButtonsPlay = ['button-stone', 'button-paper', 'button-scissors', 'button-new-play'];

function clickButtonChoice(choice){
    player1.choice = choice;
    player2.choice = randomChoice();

    divsButtonsPlay.forEach(button => {
        document.getElementById(button).disabled = true;
    });

    checkWinnerRound();

    setDivs();

    setTimeout(nextRound, 2000);

}

function randomChoice() {
    let choices = ['Pedra', 'Papel', 'Tesoura'];
    let min = Math.ceil(0);
    let max = Math.floor(2);
    let numberRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    return choices[numberRandom];
}

function checkWinnerRound() {
    if(player1.choice.includes(player2.choice)){
        player1.points++;
        player2.points++;
        message = "Empatou!";
    }else{
        switch (player1.choice) {
            case "Pedra":
                if(player2.choice.includes("Tesoura")){
                    player1.points++;
                    message = "Você ganhou a rodada!";
                }else{
                    player2.points++;
                    message = "Você perdeu a rodada!";
                }
                break;
            case "Papel":
                if(player2.choice.includes("Pedra")){
                    player1.points++;
                    message = "Você ganhou a rodada!";
                }else{
                    player2.points++;
                    message = "Você perdeu a rodada!";
                }
                break;
            default:
                if(player2.choice.includes("Papel")){
                    player1.points++;
                    message = "Você ganhou a rodada!";
                }else{
                    player2.points++;
                    message = "Você perdeu a rodada!";
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
        divsButtonsPlay.forEach(button => {
            document.getElementById(button).disabled = false;
        });
    }else{
        if(player1.points > player2.points){
            alert("Você ganhou a partida!");
        }else if(player1.points < player2.points){
            alert("Você perdeu a partida!");
        }else{
            alert("Empatou!");
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

    divsButtonsPlay.forEach(button => {
        document.getElementById(button).disabled = false;
    });

    setDivs();
}

newPlay();
