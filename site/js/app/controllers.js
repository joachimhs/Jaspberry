Jaspberry.ApplicationController = Ember.Controller.extend({
    init: function() {
        Jaspberry.log('Application Controller: init');
    }
});

Jaspberry.GpioController = Ember.ObjectController.extend({
    content: []
});