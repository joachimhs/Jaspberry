Jaspberry.ApplicationView = Ember.View.extend({
    elementId: 'mainArea',
    templateName: 'application'
});

Jaspberry.GpioView = Ember.View.extend({
    elementId: 'gpioArea',
    templateName: 'gpio-template',
    classNames: 'thinborder'
});

Jaspberry.OnOffView = Ember.View.extend({
    templateName: 'on-off-template',
    tagName: 'span',
    allowToggle: false
});

Jaspberry.MemoryView = Ember.View.extend({
    elementId: 'memoryArea',
    templateName: 'memory-template'
});