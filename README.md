# jsStorage
A simple javascript library to use as storage with the same API the :
 * localStorage
 * sessionStorage
 * cookies
 * window.name

## How to use it

All jsStorage's storages have the same methods with the localStorage Object, plus some shortcuts of them.
So it is really easy to use them.


### Add the script in your page

First you need to insert jsStorage on your page.

You can add it on your page's head or body.

```html
<script src="jsStorage-0.2.0.min.js"></script>
```


### jsStorage call

You can call jsAppend using the variables *jS* or *jsStorage*.

For example lets set up a cookie storage.

```javascript
// Using the jS
var cookieStorage = new jS('cookie');
// Save a value
cookieStorage.setItem("name", "test-value");
// Get a value
var value = cookieStorage.getItem("name");
console.log(value); // Outputs : test-value
```

Also a ready to use object with all the storages can be accesed from the variable *storage*.

```javascript
// Using the storage variable to store a cookie
storage.cookieStorage.setItem("name", "test-value");
// Or something on localStorage
storage.localStorage.setItem("name", "test-value");
// sessionStorage is also here
storage.sessionStorage.setItem("name", "test-value");
// and also the tab session storage hack "window.name" (cross-domain)
storage.windowNameStorage.setItem("name", "test-value");
```

The *storage* variable has as default storage the localStorage or if it is not supported,
it loads the cookieStorage for compatibility.

```javascript
// Save something on localStorage or is it not supported on cookieStorage
storage.setItem("name", "test-value");

// Check the storage type
if(typeof window.localStorage !== "undefined")
  console.log(storage.type()); // Outputs : local
else
  console.log(storage.type()); // Outputs : cookie
```

If any of these variables is not availiable, jsStorage will not override them. So you can easily use use jsStorage with other libraries.

```html
<script>
	// Variable storage is defined
	var storage = "something";
</script>

<!-- Load jsAppend -->
<script src="jsStorage-0.2.0.min.js"></script>

<script>
	// Print storage
	console.log(storage); // Output : "something"
</script> 
```


### jsStorage storages

As you have already understund, the jsStorage ports the *cookies* and the *window.name* to localStorage like Objects
and extends the localStorage and the sessionStorage for simple usage.

We have 4 storages :
* `localStorage` the localStorage storage
* `sessionStorage` the sessionStorage storage
* `cookieStorage` a port of the cookie mechanic on a localStorage like object
* `windowNameStorage` a port of the window.name storage mechanic on a localStorage like object

And also we have a defaultStorage object for fast accesing the selected storage.
* `defaultStorage` the sellected storage to use by default


#### defaultStorage

The *defaultStorage* is the storage set as active on a jsStorage instance.


```javascript
// Use localStorage by default
var s = new jsStorage('local');
// Default setItem in local storage
s.setItem("test", "a"); // Saved in localStorage

// Change default storage to cookie
s.useCookieStorage();
// Now default storage is cookies
s.setItem("test", "b"); // Saved as a cookie

// Access a specific storage
s.localStorage.getItem("test"); // Returns a
```

##### defaultStorage's methods

*defaultStorage.setItem(name, value);
*defaultStorage.set(name, value);
*defaultStorage.getItem(name);
*defaultStorage.get(name);
*defaultStorage.removeItem(name);
*defaultStorage.remove(name);
*defaultStorage.del(name);
*defaultStorage.key(n);
*defaultStorage.length();
*defaultStorage.clear();
*defaultStorage.type();


##### localStorage's methods

*localStorage.setItem(name, value);
*localStorage.set(name, value);
*localStorage.getItem(name);
*localStorage.get(name);
*localStorage.removeItem(name);
*localStorage.remove(name);
*localStorage.del(name);
*localStorage.key(n);
*localStorage.length();
*localStorage.clear();
*localStorage.type();
*localStorage.setDomain(domain);


##### sessionStorage's methods

*sessionStorage.setItem(name, value);
*sessionStorage.set(name, value);
*sessionStorage.getItem(name);
*sessionStorage.get(name);
*sessionStorage.removeItem(name);
*sessionStorage.remove(name);
*sessionStorage.del(name);
*sessionStorage.key(n);
*sessionStorage.length();
*sessionStorage.clear();
*sessionStorage.type();
*sessionStorage.setDomain(domain);


##### cookieStorage's methods

*cookieStorage.setItem(name, value);
*cookieStorage.set(name, value);
*cookieStorage.getItem(name);
*cookieStorage.get(name);
*cookieStorage.removeItem(name);
*cookieStorage.remove(name);
*cookieStorage.del(name);
*cookieStorage.key(n);
*cookieStorage.length();
*cookieStorage.clear();
*cookieStorage.type();
*cookieStorage.setDomain(domain);


##### windowNameStorage's methods

*windowNameStorage.setItem(name, value);
*windowNameStorage.set(name, value);
*windowNameStorage.getItem(name);
*windowNameStorage.get(name);
*windowNameStorage.removeItem(name);
*windowNameStorage.remove(name);
*windowNameStorage.del(name);
*windowNameStorage.key(n);
*windowNameStorage.length();
*windowNameStorage.clear();
*windowNameStorage.type();
*windowNameStorage.setDomain(domain);
*windowNameStorage.setPath(path);
*windowNameStorage.setExpiration(days);



