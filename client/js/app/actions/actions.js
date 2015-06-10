var Reflux 	= require('reflux');

module.exports = Reflux.createActions({
	 "fullScreen": { asyncResult: false },
	 "mainSearch": { asyncResult: false },
	 "widgetOpen": { asyncResult: false },
	 "routeLoad": { asyncResult: true },
	 "routeLoadDone": { asyncResult: true },
	 "getDataRoute": { asyncResult: true }
});