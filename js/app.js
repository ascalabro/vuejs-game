
/**
 * Register Gameboard component globally
 */
Vue.component('gameboard', {
    template: '#gameboard-template'
});


/**
 * Register Scoreboard component globally
 */
Vue.component('scoreboard', {
    template: '#scoreboard-template', //TODO: Loop through players' names and display their names and scores here in the list-
});

/**
 * Register StatusControls component globally
 */
Vue.component('statuscontrols', {
    template: '#statuscontrols-template' //TODO: Display who's turn it is, player 1 or player 2
});

new Vue({
    el: '#app',
    data: {
        message: 'This is the message.. vue is loading, working'
    }
})
