

$(document).ready(function () {
    //console.log("info is collecting properly");

    

    $("#btnPlayerName").on("click", saveName);
    var playerName = localStorage.getItem("playerName");
    if (playerName != "" && playerName != null) {
        $("#txtPlayerName").html(`Welcome ${playerName}! <p>Please select which you hand you'd like to play.</p>`);
        playGame();
    }
    var rpsSelected = false;
    var playerHand = null;
    /*
    $("#btnReset").click(function () {
        $(".rpsImages").attr("class", "img-thumbnail rpsImages").css({ height: '200px'});
        $("#rock2").slideUp();
        $("#paper2").slideUp();
        $("#scissors2").slideUp();
        $("#divWinner").removeClass("text-success text-danger text-warning").empty()
        rpsSelected = false;
        playerHand = "";
        playGame();
    })
    */
    function saveName() {
        playerName = $("#inputPlayerName").val();
        localStorage.setItem("playerName", playerName);

        $("#txtPlayerName").html(`Welcome ${playerName}! <p>Please select which you hand you'd like to play.</p>`);
       // $("#btnReset").slideDown();
        playGame();
    }

    function playGame() {
        $(".rpsImages").slideDown();
        $(".rpsImages").mouseenter(function () {
            $(this).animate({ height: '220px' }, "fast");
        }).mouseleave(function () {
            console.log("rps seleceted: " + rpsSelected);
            if (rpsSelected == false) {
                $(this).animate({ height: '200px' });
            }
        }).click(function () {
            $(this).animate({ "height": '240px' }, "fast").attr("class", "img-thumbnail rpsImages border border-success");
            rpsSelected = true;
            playerHand = $(this).attr("id");
            console.log(rpsSelected);
            console.log($(this).attr("id"));
            playHand(playerHand);
        })
    }

    function playHand(hand) {
        if (hand == "rock") {
            $("#paper").toggle();
            $("#scissors").toggle();
            calculateWinner(hand)
        } else if (hand == "paper") {
            $("#scissors").toggle();
            $("#rock").toggle();
            calculateWinner(hand)
        } else if (hand == "scissors") {
            $("#rock").toggle();
            $("#paper").toggle();
            calculateWinner(hand)
        }
    }

    function calculateWinner(playerHand) {

        let aiHand = 0;
        aiHand = Math.round((Math.random() * 10000 + 1) % 2);

        console.log("this is the ai hand: " + aiHand)
        switch (aiHand) {
            case 0:
                $("#rock2").toggle(500);
                if (playerHand == "rock") {
                    winner("tie");
                } else if (playerHand == "paper") {
                    winner("player");
                } else {
                    winner("ai");
                }
                break;
            case 1:
                $("#paper2").toggle(500);
                if (playerHand == "rock") {
                    winner("ai");
                } else if (playerHand == "paper") {
                    winner("tie");
                } else {
                    winner("player");
                }
                break;
            case 2:
                $("#scissors2").toggle(500);
                if (playerHand == "rock") {
                    winner("player");
                } else if (playerHand == "paper") {
                    winner("ai");
                } else {
                    winner("tie");
                }
                break;
            default:
                break;
        }
    }

    function winner(playerWon) {
        if (playerWon == "player") {
            $("#divWinner").html(`<h2>Congratulations you won</h2>`).addClass("text-success")
        } else if (playerWon == "ai") {
            $("#divWinner").html(`<h2>Sorry You lost... :( </h2>`).addClass("text-danger")
        } else {
            $("#divWinner").html(`<h2>It's A draw!</h2>`).addClass("text-warning")
        }
    }
});