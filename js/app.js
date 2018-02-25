
/**
 * Register Gameboard component globally
 */
Vue.component('gameboard', {
    template: '#gameboard-template',
    data: {},
    methods: {
        playAttempt: function (event) {
            var cellValue = event.target.innerHTML,
                cellId = event.target.getAttribute('cell-id');
            if (cellValue == '') { // Empty cell
                console.log('The cell was empty...' + cellValue);
                currentPlayerToken = this.$root.$data.store.currentPlayer;
                event.target.innerHTML = currentPlayerToken; // Put the player token into the grid
                this.$root.$data.store.playerPositions[currentPlayerToken].push(cellId); // Keep track of which cells the player occupies
                this.alternatePlayerTurn(); // Only alternate player if a move was made
            } else { // Not empty, player already moved here
                console.log('The cell was NOT empty: ' + cellValue);
                return; // Do nothing
            }
            var currentPlayerPositions = this.$root.$data.store.playerPositions[currentPlayerToken];
            if (this.isWinner(currentPlayerPositions)) {
                alert('Player ' + currentPlayerToken + " has won this game");
            }

            // `this` inside methods points to the Vue instance
            // `event` is the native DOM event
            if (event) {
                // alert(event.target.innerHTML)
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


/**
 * Register Scoreboard component globally
 */
Vue.component('scoreboard', {
    template: '#scoreboard-template', //TODO: Loop through players' names and display their names and scores here in the list-
    methods: {
        getBestScore() {
            return localStorage.getItem("localHighScore");
        },
        setBestScore(score) {
            localStorage.setItem("localHighScore", score);
        }
    }
});

/**
 * Register StatusControls component globally
 */
Vue.component('statuscontrols', {
    template: '#statuscontrols-template',
    methods: {
        getActivePlayer() {
            return this.$root.$data.store.currentPlayer;
        }
    }
});

// Shared data
let store = {
    playerTokens: [
        'X', 'O'
    ],
    currentPlayer: 'X',
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
        store: store
    }
});
