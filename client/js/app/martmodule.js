
// Mart Module..
// Experimenting with UMD (Universal Module Definition)

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['exports'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(exports);
	} else {
		// Browser globals
		factory(root.ms = {});
	}


}(this, function (exports) {
	// Module

	exports.test = function(val) {
		console.log(val + " bob");
	};

	return exports;
}));
