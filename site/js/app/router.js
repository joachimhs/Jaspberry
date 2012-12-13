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

            navigateToPinbat: Ember.Route.transitionTo('pinbat'),

            togglePin: function(router, event) {
                console.log('togglePin');
                console.log(event.context);
                event.context.set('state', !event.context.get('state'));
                Jaspberry.store.commit();
            },

            connectOutlets: function(router) {
                router.get('applicationController').connectOutlet('gpio', Jaspberry.Pinstate.find("gpio"));
            }
        }),

        pinbat: Ember.Route.extend({
            route: '/pinbat',

            returnToJaspberry:  Ember.Route.transitionTo('index'),

            connectOutlets: function(router) {
                router.get('applicationController').connectOutlet('memory');
            }
        })
    })
});