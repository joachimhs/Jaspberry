Jaspberry.PinStatus = DS.Model.extend({
    vdcOne: DS.attr('boolean'),
    vdcTwo: DS.attr('boolean'),
    sda0: DS.attr('boolean'),
    dnc0: DS.attr('boolean'),
    scl0: DS.attr('boolean'),
    gnd: DS.attr('boolean'),
    gpio7: DS.attr('boolean'),
    txd: DS.attr('boolean'),
    dnc1: DS.attr('boolean'),
    rxd: DS.attr('boolean'),
    gpio0: DS.attr('boolean'),
    gpio1: DS.attr('boolean'),
    gpio2: DS.attr('boolean'),
    dnc2: DS.attr('boolean'),
    gpio3: DS.attr('boolean'),
    gpio4: DS.attr('boolean'),
    dnc3: DS.attr('boolean'),
    gpio5: DS.attr('boolean'),
    mosi: DS.attr('boolean'),
    dnc4: DS.attr('boolean'),
    miso: DS.attr('boolean'),
    gpio6: DS.attr('boolean'),
    sclk: DS.attr('boolean'),
    ce0: DS.attr('boolean'),
    dnc5: DS.attr('boolean'),
    ce1: DS.attr('boolean')
});

Jaspberry.PinStatus.reopenClass({
    url: "gpio.json"
});