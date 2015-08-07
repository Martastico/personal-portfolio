var Reflux 	= require('reflux');

module.exports = Reflux.createActions({
	 "fullScreen":       { asyncResult: false },
	 "mainSearch":       { asyncResult: false },
	 "widgetOpen":       { asyncResult: false },
	 "routeLoad":        { asyncResult: true },
	 "routeLoadDone":    { asyncResult: true },
	 "getDataRoute":     { asyncResult: true },
	 "isMobile":         { asyncResult: false },
	 "sidebarToggle":    { asyncResult: false },
	 "userLogin":        { asyncResult: false },
	 "resetLoginForm":   { asyncResult: false },
	 "getPortfolioItems":{ asyncResult: true },
});