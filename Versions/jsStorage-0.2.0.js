/*
 * jsStorage v0.2.0 Beta
 *
 * A simple javascript library to use
 * localStorage / sessionStorage / cookies / window.name
 * with the same API
 *
 * Authors:
 *     Grammatopoulos Athanasios - Vasileios
 * License : The MIT License (MIT)
 */

(function(){
	// jsStorage :)
	var jsStorage;

	// Library Instance
	jsStorage = function(storage){
		this._initialize(storage);
	};

	// Version
	jsStorage.version = "v0.2.0 Beta";

	// Default storage handler
	jsStorage.prototype.defaultStorage = null;
	// Storages
	jsStorage.prototype.localStorage = null;
	jsStorage.prototype.sessionStorage = null;
	jsStorage.prototype.cookieStorage = null;
	jsStorage.prototype.windowNameStorage = null;

	// Initialise
	jsStorage.prototype._initialize = function(storage){
		// LocalStorage
		if(storage == "local"){
			this.localStorage = new jsStorageLocal();
			this.defaultStorage = this.localStorage;
		}

		// SessionStorage
		else if(storage == "session"){
			this.sessionStorage = new jsStorageSession();
			this.defaultStorage = this.sessionStorage;
		}

		// CookieStorage
		else if(storage == "cookie" || storage == "cookies"){
			this.cookieStorage = new jsStorageCookie();
			this.defaultStorage = this.cookieStorage;
		}

		// windowNameStorage
		else if(storage == "window-name" || storage == "window_name"){
			this.windowNameStorage = new jsStorageWindowName();
			this.defaultStorage = this.windowNameStorage;
		}

		// All Storages
		else{
			this.localStorage = new jsStorageLocal();
			this.sessionStorage = new jsStorageSession();
			this.cookieStorage = new jsStorageCookie();
			this.windowNameStorage = new jsStorageWindowName();
			
			// If localStorage is supported
			if(typeof window.localStorage !== "undefined")
				this.defaultStorage = this.localStorage;

			// Else fallback to cookies support
			else
				this.defaultStorage = this.cookieStorage;
		}
	};

	// Use LocalStorage
	jsStorage.prototype.useLocalStorage = function(){
		// If not initialised
		if(!this.localStorage)
			this.localStorage = new jsStorageLocal();
		// Set as default
		this.defaultStorage = this.localStorage;
	};
	jsStorage.prototype.getLocalStorage = function(){
		return new jsStorageLocal();
	};
	// Use SessionStorage
	jsStorage.prototype.useSessionStorage = function(){
		// If not initialised
		if(!this.sessionStorage)
			this.sessionStorage = new jsStorageSession();
		// Set as default
		this.defaultStorage = this.sessionStorage;
	};
	jsStorage.prototype.getSessionStorage = function(){
		return new jsStorageSession();
	};
	// Use CookieStorage
	jsStorage.prototype.useCookieStorage = function(){
		// If not initialised
		if(!this.cookieStorage)
			this.cookieStorage = new jsStorageCookie();
		// Set as default
		this.defaultStorage = this.cookieStorage;
	};
	jsStorage.prototype.getCookieStorage = function(){
		return new jsStorageCookie();
	};
	// Use WindowNameStorage
	jsStorage.prototype.useWindowNameStorage = function(){
		// If not initialised
		if(!this.windowNameStorage)
			this.windowNameStorage = new jsStorageWindowName();
		// Set as default
		this.defaultStorage = this.windowNameStorage;
	};
	jsStorage.prototype.getWindowNameStorage = function(){
		return new jsStorageWindowName();
	};


	// Storage Get Item method
	jsStorage.prototype.setItem = function(name, value){
		return this.defaultStorage.setItem(name, value);
	};
	jsStorage.prototype.set = jsStorage.prototype.setItem;
	// Storage Set Item method
	jsStorage.prototype.getItem = function(name){
		return this.defaultStorage.getItem(name);
	};
	jsStorage.prototype.get = jsStorage.prototype.getItem;
	// Storage Remove Item method
	jsStorage.prototype.removeItem = function(name){
		return this.defaultStorage.removeItem(name);
	};
	jsStorage.prototype.remove = jsStorage.prototype.removeItem;
	jsStorage.prototype.del = jsStorage.prototype.removeItem;
	// Storage Get Key method
	jsStorage.prototype.key = function(n){
		return this.defaultStorage.key(n);
	};
	// Storage Length method
	jsStorage.prototype.length = function(){
		return this.defaultStorage.length();
	};
	// Storage Clear method
	jsStorage.prototype.clear = function(){
		return this.defaultStorage.clear();
	};
	// Storage Get Type method
	jsStorage.prototype.type = function(){
		return this.defaultStorage.type();
	};



	// jsStorageLocal
	var jsStorageLocal = function(){
		this.storageType = "local";
	};
	// Set
	jsStorageLocal.prototype.setItem = function(name, value){
		jsStorage_CheckArgs(2, arguments.length, "setItem");
		return window.localStorage.setItem(name, value);
	};
	jsStorageLocal.prototype.set = jsStorageLocal.prototype.setItem;
	// Get
	jsStorageLocal.prototype.getItem = function(name){
		jsStorage_CheckArgs(1, arguments.length, "getItem");
		return window.localStorage.getItem(name);
	};
	jsStorageLocal.prototype.get = jsStorageLocal.prototype.getItem;
	// Remove
	jsStorageLocal.prototype.removeItem = function(name){
		jsStorage_CheckArgs(1, arguments.length, "removeItem");
		return window.localStorage.removeItem(name);
	};
	jsStorageLocal.prototype.remove = jsStorageLocal.prototype.removeItem;
	jsStorageLocal.prototype.del = jsStorageLocal.prototype.removeItem;
	// Key
	jsStorageLocal.prototype.key = function(n){
		jsStorage_CheckArgs(1, arguments.length, "key");
		return window.localStorage.key(n);
	};
	// Length
	jsStorageLocal.prototype.length = function(){
		return window.localStorage.length;
	};
	// Clear
	jsStorageLocal.prototype.clear = function(){
		return window.localStorage.clear();
	};
	// Type
	jsStorageLocal.prototype.type = function(){
		return this.storageType;
	};
	// Set Domain
	jsStorageLocal.prototype.setDomain = function(domain){
		jsStorage_CheckArgs(1, arguments.length, "setDomain");
		document.domain = domain;
	};



	// jsStorageSession
	var jsStorageSession = function(){
		this.storageType = "session";
	};
	// Set
	jsStorageSession.prototype.setItem = function(name, value){
		jsStorage_CheckArgs(2, arguments.length, "setItem");
		return window.sessionStorage.setItem(name, value);
	};
	jsStorageSession.prototype.set = jsStorageSession.prototype.setItem;
	// Get
	jsStorageSession.prototype.getItem = function(name){
		jsStorage_CheckArgs(1, arguments.length, "getItem");
		return window.sessionStorage.getItem(name);
	};
	jsStorageSession.prototype.get = jsStorageSession.prototype.getItem;
	// Remove
	jsStorageSession.prototype.removeItem = function(name){
		jsStorage_CheckArgs(1, arguments.length, "removeItem");
		return window.sessionStorage.removeItem(name);
	};
	jsStorageSession.prototype.remove = jsStorageSession.prototype.removeItem;
	jsStorageSession.prototype.del = jsStorageSession.prototype.removeItem;
	// Key
	jsStorageSession.prototype.key = function(n){
		jsStorage_CheckArgs(1, arguments.length, "key");
		return window.sessionStorage.key(n);
	};
	// Length
	jsStorageSession.prototype.length = function(){
		return window.sessionStorage.length;
	};
	// Clear
	jsStorageSession.prototype.clear = function(){
		return window.sessionStorage.clear();
	};
	// Type
	jsStorageSession.prototype.type = function(){
		return this.storageType;
	};
	// Set Domain
	jsStorageSession.prototype.setDomain = function(domain){
		jsStorage_CheckArgs(1, arguments.length, "setDomain");
		document.domain = domain;
	};



	// jsStorageCookie
	var jsStorageCookie = function(){
		this.storageType = "session";
		// Init parameters
		this._parameters = {};
		this.setExpiration(365);
		this.setDomain(document.domain);
		this.setPath("/");
	};
	// Set
	jsStorageCookie.prototype.setItem = function(name, value){
		jsStorage_CheckArgs(2, arguments.length, "setItem");
		// Create cookie
		document.cookie = 
			escape(name) + "=" + escape(value.toString()) + ";" + 
			this._parameters.domain + 
			this._parameters.path + 
			this._parameters.expiration;
	};
	jsStorageCookie.prototype.set = jsStorageCookie.prototype.setItem;
	// Get
	jsStorageCookie.prototype.getItem = function(name){
		jsStorage_CheckArgs(1, arguments.length, "getItem");
		// Parse name
		name = escape(name) + "=";
		// Get all cookies definitions
		var cookies = document.cookie.split(';');
		// For each cookie
		for(var i = 0; i <cookies.length; i++){
			// Trim white spaces
			while(cookies[i].charAt(0)==' '){
				cookies[i] = cookies[i].substring(1);
			}
			// If this is the cookie 
			if(cookies[i].indexOf(name) == 0){
				// Return value
				return unescape(cookies[i].substring(name.length, cookies[i].length));
			}
		}
		// Not found
		return null;
	};
	jsStorageCookie.prototype.get = jsStorageCookie.prototype.getItem;
	// Remove
	jsStorageCookie.prototype.removeItem = function(name){
		jsStorage_CheckArgs(1, arguments.length, "removeItem");
		// Create cookie
		document.cookie = 
			escape(name) + "=null;" + 
			this._parameters.domain + 
			this._parameters.path + 
			"expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	};
	jsStorageCookie.prototype.remove = jsStorageCookie.prototype.removeItem;
	jsStorageCookie.prototype.del = jsStorageCookie.prototype.removeItem;
	// Key
	jsStorageCookie.prototype.key = function(n){
		jsStorage_CheckArgs(1, arguments.length, "key");
		// Get all cookies definitions
		var cookies = document.cookie.split(';');
		// If not exist
		if(cookies.length <= n || n < 0)
			return null;

		// Trim white spaces
		while(cookies[n].charAt(0)==' '){
			cookies[n] = cookies[n].substring(1);
		}
		// Return name
		return unescape(cookies[n].substring(0, cookies[n].indexOf("=")));
	};
	// Length
	jsStorageCookie.prototype.length = function(){
		return (document.cookie.length > 0) ? document.cookie.split(';').length : 0;
	};
	// Clear
	jsStorageCookie.prototype.clear = function(){
		// Temp name
		var name;
		// Get all cookies definitions
		var cookies = document.cookie.split(';');
		// For each cookie
		for(var i = 0; i <cookies.length; i++){
			// Trim white spaces
			while(cookies[i].charAt(0)==' '){
				cookies[i] = cookies[i].substring(1);
			}
			// Clear cookie by name
			this.removeItem(unescape(cookies[i].substring(0, cookies[i].indexOf("="))));
		}
	};
	// Type
	jsStorageCookie.prototype.type = function(){
		return this.storageType;
	};

	// Cookie parameters
	jsStorageCookie.prototype._parameters = null;

	// Set Domain
	jsStorageCookie.prototype.setDomain = function(domain){
		jsStorage_CheckArgs(1, arguments.length, "setDomain");
		this._parameters.domain = "domain=" + escape(domain) + ";";
	};
	// Set Domain
	jsStorageCookie.prototype.setPath = function(path){
		jsStorage_CheckArgs(1, arguments.length, "setPath");
		this._parameters.path = "path=" + escape(path) + ";";
	};
	// Set Domain
	jsStorageCookie.prototype.setExpiration = function(days){
		jsStorage_CheckArgs(1, arguments.length, "setExpiration");
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		this._parameters.expiration = "expires=" + date.toUTCString() + ";";
	};



	// jsStorageWindowName
	var jsStorageWindowName = function(){
		this.storageType = "window-name";
	};
	// Set
	jsStorageWindowName.prototype.setItem = function(name, value){
		jsStorage_CheckArgs(2, arguments.length, "setItem");
		// Get storage
		var json = this._load();
		// Insert value
		json[name] = value.toString();
		// Save storage
		this._save(json);
	};
	jsStorageWindowName.prototype.set = jsStorageWindowName.prototype.setItem;
	// Get
	jsStorageWindowName.prototype.getItem = function(name){
		jsStorage_CheckArgs(1, arguments.length, "getItem");
		// Get storage
		var json = this._load();
		// Return value
		if(typeof json[name] != "undefined")
			return json[name];
		// Not found
		return null;
	};
	jsStorageWindowName.prototype.get = jsStorageWindowName.prototype.getItem;
	// Remove
	jsStorageWindowName.prototype.removeItem = function(name){
		jsStorage_CheckArgs(1, arguments.length, "removeItem");
		// Get storage
		var json = this._load();
		// Return value
		delete json[name];
		// Save storage
		this._save(json);
	};
	jsStorageWindowName.prototype.remove = jsStorageWindowName.prototype.removeItem;
	jsStorageWindowName.prototype.del = jsStorageWindowName.prototype.removeItem;
	// Key
	jsStorageWindowName.prototype.key = function(n){
		jsStorage_CheckArgs(1, arguments.length, "key");
		// Get storage
		var json = this._load();
		// Get keys
		var keys = Object.keys(json);
		// Check if nth key exist
		if(keys.length <= n)
			return null;
		// Return key
		delete keys[n];
	};
	// Length
	jsStorageWindowName.prototype.length = function(){
		// Get storage
		var json = this._load();
		// Return length
		return Object.keys(json).length;
	};
	// Clear
	jsStorageWindowName.prototype.clear = function(){
		// Clear storage
		this._save({});
	};
	// Type
	jsStorageWindowName.prototype.type = function(){
		return this.storageType;
	};
	// _Load
	jsStorageWindowName.prototype._load = function(){
		// Json object variable
		var json;
		// Try to parse storage
		try{
			json = JSON.parse(window.name);
		}
		// If failed to catch, clear it
		catch(e){
			json = {};
		}
		// Return storage
		return json;
	};
	// _Save
	jsStorageWindowName.prototype._save = function(json){
		jsStorage_CheckArgs(1, arguments.length, "_save");
		window.name = JSON.stringify(json);
	};



	// Aruments check
	var jsStorage_CheckArgs = function(args_required, args_length, method_name){
		// Check
		if(args_length < args_required){
			if(method_name)
				method_name = " \"" + method_name + "\" ";
			// Throw error
			throw "Not enough arguments to" + method_name + "method.";
		}
	};



	// Default Storage
	var jsStorageDefault = new jsStorage();



	// Store conflicts
	var conflicts = {
		jS : undefined,
		jsStorage : undefined,
		storage : undefined
	};
	// Get conflicts
	var refreshConflicts = function(){
		if(window.jS != undefined && window.jS != jsStorage)
			conflicts.jS = window.jS;
		if(window.jsStorage != undefined && window.jsStorage != jsStorage)
			conflicts.jsStorage = window.jsStorage;
		if(window.storage != undefined && window.storage != jsStorage)
			conflicts.storage = window.storage;
	};
	jsStorage.prototype.noConflict = function(avoid){
		// Try not to conflict with other libs
		if(avoid === true){
			if(conflicts.jS != undefined)
				window.jS = conflicts.jS;
			if(conflicts.storage != undefined)
				window.storage = conflicts.storage;
		}
		// Override 
		else if(avoid === false){
			refreshConflicts();
			window.jS = window.jsStorage = jsStorage;
			window.storage = jsStorageDefault;
		}
		// Return conflicts
		return conflicts;
	};

	// Save Conflicts
	refreshConflicts();

	// Override "jS" and "jsStorage"
	window.jS = window.jsStorage = jsStorage;
	// Override "storage" if it is undefined
	if(window.storage == undefined)
		window.storage = jsStorageDefault;
})();