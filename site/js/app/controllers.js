Jaspberry.ApplicationController = Ember.Controller.extend({
    init: function() {
        Jaspberry.log('Application Controller: init');
    }
});

Jaspberry.GpioController = Ember.ObjectController.extend({
    content: []
});

Jaspberry.MemoryController = Ember.ObjectController.extend({
    content: [],
    gameStarted: false,
    gameEnded: false,
    raspberryPisTurn: false,
    numLeds: 0,
    completedLeds: 0,

    finishGame: function() {
        this.set('gameStarted', false);
        this.set('gameEnded', false);
    },

    startGame: function() {
        var gameStarted = this.get('gameStarted');
        if (!gameStarted) {
            gameStarted = true;
        }

        this.set('raspberryPisTurn', true);
        var controller = this;
        this.sendToServer({"action": "start"}, function(response) {
            if (response.actionResponse === "started") {
                controller.set('numLeds', response.numLeds);
                controller.set('completedLeds', response.completedLeds);
                controller.set('raspberryPisTurn', false);
            } else {
                controller.set('gameStarted', false);
                controller.set('gameEnded', true);
            }
        });

        this.set('gameStarted', gameStarted);
    },

    selectLedOne: function() {
        this.set('raspberryPisTurn', true);
        var controller = this;
        this.sendToServer({"action": "ledOne"}, function(response) {
            if (response.actionResponse === "correct") {
                controller.set('numLeds', response.numLeds);
                controller.set('completedLeds', response.completedLeds);
                controller.set('raspberryPisTurn', false);
            } else {
                console.log('WRONG ANSWER. END GAME');
                controller.set('gameStarted', false);
                controller.set('gameEnded', true);
            }
        });
    },

    selectLedTwo: function() {
        this.set('raspberryPisTurn', true);
        var controller = this;
        this.sendToServer({"action": "ledTwo"}, function(response) {
            if (response.actionResponse === "correct") {
                controller.set('numLeds', response.numLeds);
                controller.set('completedLeds', response.completedLeds);
                controller.set('raspberryPisTurn', false);
            } else {
                console.log('WRONG ANSWER. END GAME');
                controller.set('gameStarted', false);
                controller.set('gameEnded', true);
            }
        });
    },

    selectLedThree: function() {
        this.set('raspberryPisTurn', true);
        var controller = this;
        this.sendToServer({"action": "ledThree"}, function(response) {
            if (response.actionResponse === "correct") {
                controller.set('numLeds', response.numLeds);
                controller.set('completedLeds', response.completedLeds);
                controller.set('raspberryPisTurn', false);
            } else {
                console.log('WRONG ANSWER. END GAME');
                controller.set('gameStarted', false);
                controller.set('gameEnded', true);
            }
        });
    },

    selectLedFour: function() {
        this.set('raspberryPisTurn', true);
        var controller = this;
        this.sendToServer({"action": "ledFour"}, function(response) {
            if (response.actionResponse === "correct") {
                controller.set('numLeds', response.numLeds);
                controller.set('completedLeds', response.completedLeds);
                controller.set('raspberryPisTurn', false);
            } else {
                console.log('WRONG ANSWER. END GAME');
                controller.set('gameStarted', false);
                controller.set('gameEnded', true);
            }
        });
    },

    selectLedFive: function() {
        this.set('raspberryPisTurn', true);
        var controller = this;
        this.sendToServer({"action": "ledFive"}, function(response) {
            if (response.actionResponse === "correct") {
                controller.set('numLeds', response.numLeds);
                controller.set('completedLeds', response.completedLeds);
                controller.set('raspberryPisTurn', false);
            } else {
                console.log('WRONG ANSWER. END GAME');
                controller.set('gameStarted', false);
                controller.set('gameEnded', true);
            }
        });
    },

    sendToServer: function(jsonMessage, callback) {
        jQuery.ajax({
            url: "/pinGameAction",
            data:  JSON.stringify(jsonMessage),
            dataType: 'json',
            type: 'POST',

            success: function(data) {
                Jaspberry.log('Got back from pinGameAction: ' + JSON.stringify(data));
                callback(data);
            }
        });
    }
});