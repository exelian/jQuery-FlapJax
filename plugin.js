(function ($, flapjax) {
    var methods = {
        'clicksE': function () {
            if (!(this instanceof $)) { return; }
            var events = [];

            var i;
            for (i = 0; i < this.length; i += 1) {
                var elm = this[i];
                events.push(flapjax.clicksE(elm));
            }

            return flapjax.mergeE.apply({}, events);
        },
        'extEvtE': function (eventName) {
            if (!(this instanceof $)) { return; }
            var events = [];

            var i;
            for (i = 0; i < this.length; i += 1) {
                var elm = this[i];
                events.push(flapjax.extractEventE(elm, eventName));
            }

            return flapjax.mergeE.apply({}, events);
        },
        'extValB': function () {
            if (!(this instanceof $) || this.length < 1) { return; }
            return flapjax.extractValueB(this.get(0));
        },
        'extValE': function () {
            if (!(this instanceof $)) { return; }
            var events = [];

            var i;
            for (i = 0; i < this.length; i += 1) {
                var elm = this[i];
                events.push(flapjax.extractValueE(elm));
            }

            return flapjax.mergeE.apply({}, events);
        },
        'jQueryBind': function (eventName) {
            if (!(this instanceof $)) { return; }
            var eventStream = receiverE();

            this.bind(eventName, function (e) {
                eventStream.sendEvent(arguments.length > 1 ? arguments : e);
            });

            return eventStream;
        },
        'jQueryE': function (eventStream, fnName) {
            if (!(this instanceof $)) {
                throw new TypeError('$obj needs to be a jQuery obj');// Type Guard
            }
            if (!(eventStream instanceof flapjax.EventStream)) {
                throw new TypeError('$obj needs to be a flapjax eventstream');// Type Guard
            }

            var self = this;

            eventStream.mapE(function ($obj) {
                var i;
                for (i = 0; i < self.length; i += 1) {
                    var elm = self[i];
                    var applyFn = $obj instanceof Array ? 'apply' : 'call';

                    $(elm)[fnName][applyFn](elm, $obj);
                }
            });

            return this;
        },
        'liftB': function (fn) {
            if (!(this instanceof $) || this.length < 1) { return; }
            return this.fj('extValB').liftB(fn);
        },
        'liftBArr': function (fn) {
            return this.map(function () {
                return flapjax.extractValueB(this).liftB(fn);
            });
        }
    };

    $.fn.fj = function (method) {
        var args = Array.prototype.slice.call(arguments, 1);
        return methods[method].apply(this, args);
    };
})(jQuery, flapjax);