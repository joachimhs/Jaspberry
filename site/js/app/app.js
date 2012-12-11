Ember.ENV.RAISE_ON_DEPRECATION = true;

var Jaspberry = Ember.Application.create({
    log: function(message) {
        if (window.console) console.log(message);
    }
});

//Removing the Camelcase-to-dash convention from Ember Data
/*DS.Model.reopen({
    namingConvention: {
        keyToJSONKey: function(key) {
            return key;
        },

        foreignKey: function(key) {
            return key;
        }
    }
});

DS.Model.reopen({
    reload: function() {
        if (!this.get('isDirty') && this.get('isLoaded')) {
            var store = this.get('store'),
                adapter = store.get('adapter');

            adapter.find(store, this.constructor, this.get('id'));
        }
    }
});*/

Jaspberry.Serializer = DS.JSONSerializer.extend({
    addBelongsTo: function(hash, record, key, relationship) {
        hash[key] = record.get(key + ".id");
    }

    /*addHasMany: function(hash, record, key, relationship) {
        hash[key] = record.get(key).getEach('id');
    }*/
});

Jaspberry.Adapter = DS.Adapter.create({
    serializer: Jaspberry.Serializer.create(),

    findAll: function(store, type) {
        var url = type.url;

        Jaspberry.log('finding all: type: ' + type + ' url: ' + url);
        $.ajax({
            type: 'GET',
            url: url,
            contentType: 'application/json',
            success: function(data) {
                Jaspberry.log(type);
                Jaspberry.log(data);
                store.loadMany(type, data);
            }
        });

    },
    
    find: function(store, type, id) {
        var url = type.url;

        Jaspberry.log('finding: type: ' + type + ' url: ' + url + ' id: ' + id);

        var requestStringJson = {

        };

        var adapter = this;

        $.ajax({
      	  type: 'GET',
      	  url: url,
      	  //data: JSON.stringify(requestStringJson, null, '\t').replace(/\%/g,'%25'),
      	  contentType: 'application/json',
      	  success: function(data) {
                console.log(type);
                console.log(data);
                if (type === Jaspberry.Pinstate) {
                    console.log(data.gpiostates);
                    console.log(data.gpios);
                    if (data.gpiostates) store.loadMany(Jaspberry.Pinstate, data.gpiostates);
                    if (data.gpios) store.loadMany(Jaspberry.Pin, data.gpios);
                }
                Jaspberry.store.load(type, data);
            }
      	});
    },

    findQuery: function(store, type, query, modelArray) {
        Jaspberry.log('FINDQUERY');
        Jaspberry.log(query);
        Jaspberry.log(query.id);
        Jaspberry.log(modelArray);

    },

    updateRecord: function(store, type, model) {
        var url = type.url;

        Jaspberry.log('updating record: type: ' + type + ' id: ' + model.get('id') + ' url: ' + url);
        Jaspberry.log('json: ' + JSON.stringify(model.serialize({ includeId: true })));

        jQuery.ajax({
            url: url,
            data: JSON.stringify(model.serialize({ includeId: true })),
            dataType: 'json',
            type: 'PUT',

            success: function(data) {
                // data is a hash of key/value pairs representing the record
                // in its current state on the server.
                Jaspberry.log('got back from updateRecord type: ' + type + " id: " + model.get('id') + " ::" + JSON.stringify(data));
                store.didSaveRecord(model, data);
            }
        });
    },

    createRecord: function(store, type, model) {
        var url = type.url;

        Jaspberry.log('creating record: type: ' + type + ' id: ' + model.get('id') + ' url: ' + url);
        Jaspberry.log('json: ' + JSON.stringify(model.serialize({ includeId: true })));
        var adapter = this;

        jQuery.ajax({
            url: url,
            data: JSON.stringify(model.serialize({ includeId: true })),
            dataType: 'json',
            type: 'POST',

            success: function(data) {
                // data is a hash of key/value pairs representing the record.
                // In general, this hash will contain a new id, which the
                // store will now use to index the record. Future calls to
                // store.find(type, id) will find this record.
                Jaspberry.log('got back from createRecord type: ' + type + " id: " + model.get('id') + " ::" + JSON.stringify(data));
                store.didSaveRecord(model, data);
            }
        });
    },

    deleteRecord: function(store, type, model) {
        var url = type.url;

        var requestStringJson = {
            id: model.get('id')
        };

        Jaspberry.log('delting record: type: ' + type + ' id: ' + model.get('id') + ' url: ' + url);
        Jaspberry.log('json: ' + JSON.stringify(requestStringJson));

        jQuery.ajax({
            url: url,
            dataType: 'json',
            data: JSON.stringify(requestStringJson),
            type: 'DELETE',

            success: function() {
                store.didDeleteRecord(model);
            }
        });
    }
});

Jaspberry.ajaxSuccess = function(data) {
    Jaspberry.Store.loadMany(type, data);
};


Jaspberry.store = DS.Store.create({
    adapter: Jaspberry.Adapter,
    /*adapter:  DS.RESTAdapter.create({
        bulkCommit: false,
        plurals: {
            pinstate: 'pinstates'
        },
        mappings: {
            pinstates: Jaspberry.Pinstate
        }
    }),*/
    revision: 10
});