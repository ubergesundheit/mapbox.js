if (typeof mapbox === 'undefined') mapbox = {};


mapbox.util = {

    // Asynchronous map that groups results maintaining order
    // Waits for all calls, regardless of errors. Returns with more recent error.
    // TODO: Is there a better way to handle this?
    asyncMap: function(values, func, callback) {
        var remaining = values.length,
            results = [],
            error;

        function next(index) {
            return function(err, result) {
                if (err) error = err;
                results[index] = result;
                remaining--;
                if (!remaining) callback(error, results);
            };
        }

        for (var i = 0; i < values.length; i++) {
            func(values[i], next(i));
        }
    }
};
