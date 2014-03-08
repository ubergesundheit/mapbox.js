'use strict';

var Instrumentile = L.Class.extend({

	initialize: function(layer, endpoint){
        this.endpoint = (endpoint === true) ? 'http://fruit.pong.tilestream.net/pong' : endpoint;

		this.tileStats = {};

        layer.on('tileloadstart', this._setTileLoadStart, this);
        layer.on('tileload', this._calcTileLoadTime, this);
        layer.on('load', this._calcAverageTileLoadTime, this);
	},

	_setTileLoadStart: function(e) {
        var tileUrl = e.tile.src;
        this.tileStats[tileUrl] = {tileloadstart: new Date()};
	},

	_calcTileLoadTime: function(e){
		var tileUrl = e.tile.src;

        if (tileUrl in this.tileStats){
            var tileLoad = new Date();
            this.tileStats[tileUrl]['tileloadtime'] = tileLoad - this.tileStats[tileUrl]['tileloadstart'];
        }
	},

	_calcAverageTileLoadTime: function(e){
		var averageTileLoadTime = 0,
            tileLoadCount = 0;

        for (var tile in this.tileStats){
            if ('tileloadtime' in this.tileStats[tile]){
                averageTileLoadTime += this.tileStats[tile].tileloadtime;
                tileLoadCount += 1;
            }
        }
        averageTileLoadTime = Math.round(averageTileLoadTime / tileLoadCount);
        this._logToPong({tileloadtime: averageTileLoadTime, tileloadcount: tileLoadCount});
        
        this.tileStats = {};
	},

    _logToPong: function(e) {
        var img = new Image();
        img.src = this.endpoint + L.Util.getParamString(e, this.endpoint);
        img.onload = img.onerror = function() {
            img = null;
        };
    }
})

module.exports = function(_, endpoint) {
    return new Instrumentile(_, endpoint);
};