/*
 *	jsStorage
 *	A simple javascript library to use
 *	localStorage / sessionStorage / cookieStorage
 *	with the same API
 *
 *	Version 0.1
 */

(function(){
	// jsStorage Library Instance
	var jsStorage = function(storage){
		// LocalStorage
		if(storage == "local")
			this._init_localStorage();
		// SessionStorage
		else if(storage == "session")
			this._init_sessionStorage();
		// CookieStorage
		else if(storage == "cookies")
			this._init_cookieStorage();

		// LocalStorage if supported or CookieStorage
		else this._init_defaultStorage();
	};

	// Active storage handler
	jsStorage.prototype.defaultStorage = null;

	// Initialize localStorage or cookieStorage
	jsStorage.prototype._init_defaultStorage = function(){
		// If localStorage is supported
		if(typeof window.localStorage !== "undefined"){
			this._init_localStorage();
		}
		// Else fallback to cookies support
		else{
			this._init_cookies();
		}
	};
	// Initialize localStorage
	jsStorage.prototype._init_localStorage = function(){
		this.defaultStorage = this.localStorage;
	};
	// Initialize sessionStorage
	jsStorage.prototype._init_sessionStorage = function(){
		this.defaultStorage = this.sessionStorage;
	};
	// Initialize cookieStorage
	jsStorage.prototype._init_cookieStorage = function(){
		this.defaultStorage = this.cookieStorage;
		this.cookieStorage.setDomain(document.domain);
		this.cookieStorage._parameters.setExpiration(365);
		this.cookieStorage._parameters.setDomain(document.domain);
		this.cookieStorage._parameters.setPath("/");
	};

	// Use LocalStorage
	jsStorage.prototype.useLocalStorage = function(){
		this._init_localStorage();
	};
	// Use SessionStorage
	jsStorage.prototype.useSessionStorage = function(){
		this._init_sessionStorage();
	};
	// Use CookieStorage
	jsStorage.prototype.useCookieStorage = function(){
		this._init_cookieStorage();
	};

	// Storage Get Item method
	jsStorage.prototype.setItem = function(name, value){
		this._check_args(2, arguments.length, "setItem");
		return this.defaultStorage.setItem(name, value);
	};
	// Storage Set Item method
	jsStorage.prototype.getItem = function(name){
		this._check_args(1, arguments.length, "getItem");
		return this.defaultStorage.getItem(name);
	};
	// Storage Remove Item method
	jsStorage.prototype.removeItem = function(name){
		this._check_args(1, arguments.length, "removeItem");
		return this.defaultStorage.removeItem(name);
	};
	// Storage Get Key method
	jsStorage.prototype.key = function(n){
		this._check_args(1, arguments.length, "key");
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
	// Storage Set Domain method
	jsStorage.prototype.setDomain = function(domain){
		this._check_args(1, arguments.length, "setDomain");
		return this.defaultStorage.setDomain(domain);
	};

	// LocalStorage
	jsStorage.prototype.localStorage = {
		// Set
		setItem : function(name, value){
			return window.localStorage.setItem(name, value);
		},
		// Get
		getItem : function(name){
			return window.localStorage.getItem(name);
		},
		// Remove
		removeItem : function(name){
			return window.localStorage.removeItem(name);
		},
		// Key
		key : function(n){
			return window.localStorage.key(n);
		},
		// Length
		length : function(){
			return window.localStorage.length;
		},
		// Clear
		clear : function(){
			return window.localStorage.clear();
		},
		// Set Domain
		setDomain : function(domain){
			document.domain = domain;
		}
	};

	// SessionStorage
	jsStorage.prototype.sessionStorage = {
		// Set
		setItem : function(name, value){
			return window.sessionStorage.setItem(name, value);
		},
		// Get
		getItem : function(name){
			return window.sessionStorage.getItem(name);
		},
		// Remove
		removeItem : function(name){
			return window.sessionStorage.removeItem(name);
		},
		// Key
		key : function(n){
			return window.sessionStorage.key(n);
		},
		// Length
		length : function(){
			return window.sessionStorage.length;
		},
		// Clear
		clear : function(){
			return window.sessionStorage.clear();
		},
		// Set Domain
		setDomain : function(domain){
			document.domain = domain;
		}
	};

	// CookieStorage
	jsStorage.prototype.cookieStorage = {
		// Set
		setItem : function(name, value){
			// Create cookie
			document.cookie = 
				escape(name) + "=" + escape(value.toString()) + ";" + 
				this._parameters.domain + 
				this._parameters.path + 
				this._parameters.expiration;
		},
		// Get
		getItem : function(name){
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
		},
		// Remove
		removeItem : function(name){
			// Create cookie
			document.cookie = 
				escape(name) + "=null;" + 
				this._parameters.domain + 
				this._parameters.path + 
				"expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		},
		// Key
		key : function(n){
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
		},
		// Length
		length : function(){
			return (document.cookie.length > 0) ? document.cookie.split(';').length : 0;
		},
		// Clear
		clear : function(){
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
		},
		// Set Domain
		setDomain : function(domain){
			this._parameters.setDomain(domain);
		},


		// Cookie parameters
		_parameters : {
			// Cookie domain parameter
			domain : "",
			setDomain : function(domain){
				this.domain = "domain=" + domain + ";";
			},

			// Cookie path parameter
			path : "",
			setPath : function(path){
				this.path = "path=" + path + ";";
			},

			// Cookie expiration parameter
			expiration : "",
			setExpiration : function(days){
				var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				this.expiration = "expires=" + date.toUTCString() + ";";
			}
		}
	};


	// Aruments check
	jsStorage.prototype._check_args = function(args_required, args_length, method_name){
		// Check
		if(args_length < args_required){
			if(method_name)
				method_name = " \"" + method_name + "\" ";
			// Throw error
			throw "Not enough arguments to" + method_name + "method.";
		}
	};

	// Hanldle lib variables
	window.jsStorage = jsStorage;
	window.storage = new jsStorage();
})();
