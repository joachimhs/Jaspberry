Jaspberry.router = Ember.Router.create({
    enableLogging: true,
    //location: 'history',
    root: Ember.Route.extend({
        loginSuccessful: function() {
            console.log('loginSuccessful');
        },

        doLogOut: Ember.Route.transitionTo('login'),

        index: Ember.Route.extend({
            route: '/',

            connectOutlets: function(router) {
                router.get('applicationController').connectOutlet('gpio', Jaspberry.PinStatus.find());
            }
        })
    })
});