
/**
 * Register Gameboard component globally
 */
Vue.component('gameboard', {
    template: '#gameboard-template',
    data: {},
    methods: {
        playAttempt: function (event) {
            if (!this.$root.$data.gameIsActive) {
                return; // Game is already finished
            }
            var cellValue = event.target.innerHTML,
                cellId = event.target.getAttribute('cell-id');
            if (cellValue == '') { // The user clicked on an empty cell
                console.log('The cell ' + cellId + ' was empty, making move');
                currentPlayerToken = this.$root.$data.store.currentPlayer;
                event.target.innerHTML = currentPlayerToken; // Put the player token into the grid
                this.$root.$data.store.playerPositions[currentPlayerToken].push(cellId); // Keep track of which cells the player occupies
                this.alternatePlayerTurn(); // Only alternate player if a move was made
            } else { // Not empty, player already moved here
                console.log('The cell was NOT empty. It contains ' + cellValue);
                return; // Do nothing
            }
            var currentPlayerPositions = this.$root.$data.store.playerPositions[currentPlayerToken];
            if (this.isWinner(currentPlayerPositions)) {
                this.$root.$data.gameIsActive = false;
                this.$root.$refs.scoreboard.addToScore(currentPlayerToken);
                this.$forceUpdate(); // TODO: Do something to update the scores as they are on the page, so user doesn't have to refresh browser
                alert('Player ' + currentPlayerToken + " has won this game");
            }
        },
        alternatePlayerTurn() {
            var playerTokens = this.$root.$data.store.playerTokens;
            for (i = 0; i < playerTokens.length; i++) {
                if (this.$root.$data.store.currentPlayer == playerTokens[i]) {
                    continue;
                } else {
                    this.$root.$data.store.currentPlayer = playerTokens[i];
                    break;
                }
            }
        },
        isWinner(positions) {
             const arr = this.$root.$data.store.winningCellCombinations;
             return arr.some(combination => combination.every(n => positions.includes(n)))
        },

    }
});
// END Gameboard component


/**
 * Register Scoreboard component globally
 */
Vue.component('scoreboard', {
    template: '#scoreboard-template', //TODO: Loop through players' names and display their names and scores here in the list-
    methods: {
        getScores() {
            var scores = [],
                playerTokens = this.$root.$data.store.playerTokens;
            for(var i = 0; i < playerTokens.length; i++) {
                var player = playerTokens[i];
                var scoreObj = {};
                scoreObj['player'] = player;
                scoreObj['score'] = localStorage.getItem("score-" + player);
                scores.push(scoreObj);
            }
            console.log(scores);
            return scores;
        },
        addToScore(player) {
            var currentScore = localStorage.getItem("score-" + player) || 0;
            localStorage.setItem("score-" + player, parseInt(++currentScore));
            console.log("score was added for player " + player + ": " + localStorage.getItem("score-" + player));
        }
    }
});
// END Scoreboard component


/**
 * Register Statuscontrols component globally
 */
Vue.component('statuscontrols', {
    template: '#statuscontrols-template',
    methods: {
        getActivePlayer() {
            return this.$root.$data.store.currentPlayer;
        },
        gameIsActive() {
            return this.$root.$data.gameIsActive;
        }
    }
});
// END Statuscontrols component


// Shared data
let store = {
    playerTokens: [
        'X', 'O'
    ],
    currentPlayer: 'X', // TODO: Randmoize starting player
    playerPositions: {
        'X': [],
        'O': [],
    },
    winningCellCombinations: [
        ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],
        ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"],
        ["1", "5", "9"], ["3", "5", "7"]
    ]
};


var vm = new Vue({
    el: '#app',
    data: { // get this with this.$root.$data.message
        message: 'This is a $root var called `message`...',
        store: store,
        gameIsActive: true
    }
});
