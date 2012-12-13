Ember.TEMPLATES['application'] = Ember.Handlebars.compile('' +
    '{{outlet}}'
);

Ember.TEMPLATES['gpio-template'] = Ember.Handlebars.compile('' +
    '<table style="width: 100%;">' +
    '<tr>' +
        '<td>1: 3.3V</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="vdcOne"}}</td>' +
        '<td>2: 5.0V</td><td> {{view Jaspberry.OnOffView itemBinding="vdcTwo"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>3: SDA0</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="sda0"}}</td>' +
        '<td>4: DNC</td><td> {{view Jaspberry.OnOffView itemBinding="dnc0"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>5: SCL0</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="scl0"}}</td>' +
        '<td>6: Ground</td><td> {{view Jaspberry.OnOffView itemBinding="gnd"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>7: GPIO7</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="gpio7" allowToggle=true}}</td>' +
        '<td>8: TxD</td><td> {{view Jaspberry.OnOffView itemBinding="txd"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>9: DNC</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="dnc1"}}</td>' +
        '<td>10: RxD</td><td> {{view Jaspberry.OnOffView itemBinding="rxd"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>11: GPIO0</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="gpio0" allowToggle=true}}</td>' +
        '<td>12: GPIO1</td><td> {{view Jaspberry.OnOffView itemBinding="gpio1" allowToggle=true}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>13: GPIO2</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="gpio2" allowToggle=true}}</td>' +
        '<td>14: DNC</td><td> {{view Jaspberry.OnOffView itemBinding="dnc2"}}</td>' +
    '</tr>' +
    '</tr>' +
    '<tr>' +
        '<td>15: GPIO3</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="gpio3" allowToggle=true}}</td>' +
        '<td>16: GPIO4</td><td> {{view Jaspberry.OnOffView itemBinding="gpio4" allowToggle=true}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>17: DNC</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="dnc3"}}</td>' +
        '<td>18: GPIO5</td><td> {{view Jaspberry.OnOffView itemBinding="gpio5" allowToggle=true}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>19: MOSI</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="mosi"}}</td>' +
        '<td>20: DNC</td><td> {{view Jaspberry.OnOffView itemBinding="dnc4"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>21: MISO</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="miso"}}</td>' +
        '<td>22: GPIO6</td><td> {{view Jaspberry.OnOffView itemBinding="gpio6" allowToggle=true}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>23: SCLK</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="sclk"}}</td>' +
        '<td>24: CE0</td><td> {{view Jaspberry.OnOffView itemBinding="ce0"}}</td>' +
    '</tr>' +
    '<tr>' +
        '<td>25: DNC</td><td class="mediumRightPadding"> {{view Jaspberry.OnOffView itemBinding="dnc5"}}</td>' +
        '<td>26: CE1</td><td> {{view Jaspberry.OnOffView itemBinding="ce1"}}</td>' +
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

Ember.TEMPLATES['memory-template'] = Ember.Handlebars.compile(
    '{{#if gameStarted}}' +
        '{{#if raspberryPisTurn}}' +
            'Raspberry Pi is LED-ing the way....' +
        '{{else}}' +
            '<h1>Round  {{numLeds}}</h1>' +
            'Select which LEDs lit up, in correct order<br />' +
            'Completed LEDs: {{completedLeds}} of {{numLeds}}<br />' +
        
            '<button {{action selectLedOne target="controller"}}>LED One</button>' +
            '<button {{action selectLedTwo target="controller"}}>LED Two</button>' +
            '<button {{action selectLedThree target="controller"}}>LED Three</button>' +
            '<button {{action selectLedFour target="controller"}}>LED Four</button>' +
            '<button {{action selectLedFive target="controller"}}>LED Five</button>' +
        '{{/if}}' +
    '{{else}}' +
        '{{#if gameEnded}}' +
            'Congratulations! You made it to Round {{numLeds}}!<br />' +
            '<button {{action finishGame target="controller"}}>Finish Game</button>' +
        '{{else}}' +
            '<button {{action startGame target="controller"}}>Start Game</button>' +
        '{{/if}}' +
    '{{/if}}'
);