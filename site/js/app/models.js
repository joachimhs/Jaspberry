Jaspberry.Pinstate = DS.Model.extend({
    vdcOne: DS.belongsTo('Jaspberry.Pin'),
    vdcTwo: DS.belongsTo('Jaspberry.Pin'),
    sda0: DS.belongsTo('Jaspberry.Pin'),
    dnc0: DS.belongsTo('Jaspberry.Pin'),
    scl0: DS.belongsTo('Jaspberry.Pin'),
    gnd: DS.belongsTo('Jaspberry.Pin'),
    gpio7: DS.belongsTo('Jaspberry.Pin'),
    txd: DS.belongsTo('Jaspberry.Pin'),
    dnc1: DS.belongsTo('Jaspberry.Pin'),
    rxd: DS.belongsTo('Jaspberry.Pin'),
    gpio0: DS.belongsTo('Jaspberry.Pin'),
    gpio1: DS.belongsTo('Jaspberry.Pin'),
    gpio2: DS.belongsTo('Jaspberry.Pin'),
    dnc2: DS.belongsTo('Jaspberry.Pin'),
    gpio3: DS.belongsTo('Jaspberry.Pin'),
    gpio4: DS.belongsTo('Jaspberry.Pin'),
    dnc3: DS.belongsTo('Jaspberry.Pin'),
    gpio5: DS.belongsTo('Jaspberry.Pin'),
    mosi: DS.belongsTo('Jaspberry.Pin'),
    dnc4: DS.belongsTo('Jaspberry.Pin'),
    miso: DS.belongsTo('Jaspberry.Pin'),
    gpio6: DS.belongsTo('Jaspberry.Pin'),
    sclk: DS.belongsTo('Jaspberry.Pin'),
    ce0: DS.belongsTo('Jaspberry.Pin'),
    dnc5: DS.belongsTo('Jaspberry.Pin'),
    ce1: DS.belongsTo('Jaspberry.Pin')
});

Jaspberry.Pin = DS.Model.extend({
    state: DS.attr('boolean'),
    isBusy: function() {
        return !this.get('isLoaded') || this.get('isSaving');
    }.property('isLoaded', 'isSaving')
});

Jaspberry.Pinstate.reopenClass({
    url: "pinStatus"
});

Jaspberry.Pin.reopenClass({
    url: 'triggerPin'
})