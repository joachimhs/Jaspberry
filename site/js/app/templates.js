Ember.TEMPLATES['application'] = Ember.Handlebars.compile('' +
    '{{outlet}}'
);

Ember.TEMPLATES['gpio-template'] = Ember.Handlebars.compile('' +
    '<table style="width: 100%;">' +
    '<tr>' +
        '<td>3.3V</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="vdcOne"}}</td>' +
        '<td>5.0V</td><td> {{view Jaspberry.OnOffView itemBinding="vdcTwo"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>SDA0</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="sda0"}}</td>' +
        '<td>DNC</td><td> {{view Jaspberry.OnOffView itemBinding="dnc0"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>SCL0</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="scl0"}}</td>' +
        '<td>Ground</td><td> {{view Jaspberry.OnOffView itemBinding="gnd"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>GPIO7</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="gpio7" allowToggle=true}}</td>' +
        '<td>TxD</td><td> {{view Jaspberry.OnOffView itemBinding="txd"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>DNC</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="dnc1"}}</td>' +
        '<td>RxD</td><td> {{view Jaspberry.OnOffView itemBinding="rxd"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>GPIO0</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="gpio0" allowToggle=true}}</td>' +
        '<td>GPIO1</td><td> {{view Jaspberry.OnOffView itemBinding="gpio1" allowToggle=true}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>GPIO2</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="gpio2" allowToggle=true}}</td>' +
        '<td>DNC</td><td> {{view Jaspberry.OnOffView itemBinding="dnc2"}}</td>' +
    '</tr>' +
    '</tr>' +
    '<tr>' +
        '<td>GPIO3</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="gpio3" allowToggle=true}}</td>' +
        '<td>GPIO4</td><td> {{view Jaspberry.OnOffView itemBinding="gpio4" allowToggle=true}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>DNC</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="dnc3"}}</td>' +
        '<td>GPIO5</td><td> {{view Jaspberry.OnOffView itemBinding="gpio5" allowToggle=true}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>MOSI</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="mosi"}}</td>' +
        '<td>DNC</td><td> {{view Jaspberry.OnOffView itemBinding="dnc4"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>MISO</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="miso"}}</td>' +
        '<td>GPIO6</td><td> {{view Jaspberry.OnOffView itemBinding="gpio6" allowToggle=true}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>SCLK</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="sclk"}}</td>' +
        '<td>CE0</td><td> {{view Jaspberry.OnOffView itemBinding="ce0"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>DNC</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="dnc5"}}</td>' +
        '<td>CE1</td><td> {{view Jaspberry.OnOffView itemBinding="ce1"}}</td>' +
    '</tr>' +
    '</table>'
);

Ember.TEMPLATES['on-off-template'] = Ember.Handlebars.compile(
    '{{#if view.item.isBusy}}' +
        'Waiting...' +
    '{{else}}' +
        '{{#with view.item}}' +
            '{{#if view.allowToggle}}' +
                '[ {{#if state}}' +
                    '<span class="greenBackground">ON</span> | <a {{action togglePin this}} class="pointer">OFF</a>' +
                '{{else}}' +
                    ' <a {{action togglePin this}} class="pointer">ON</a> | <span class="redBackground">OFF</span>' +
                '{{/if}} ]' +
            '{{else}}' +
                '[ {{#if state}}' +
                    '<span class="greenBackground">ON</span> | OFF' +
                '{{else}}' +
                    ' ON | <span class="redBackground">OFF</span>' +
                '{{/if}} ]' +
            '{{/if}}' +
        '{{/with}}' +
    '{{/if}}'
);