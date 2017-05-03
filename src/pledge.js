'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
function $Promise(executor){
	this._state = 'pending';
	this._handlerGroups = [];

	this.resolve = this._internalResolve.bind(this);
	this.reject = this._internalReject.bind(this);
	if(arguments[0])
		executor(this.resolve,this.reject);

}

$Promise.prototype._internalResolve = function(value){
	if(this._state === 'pending'){
		this._value = value;
		this._state = 'fulfilled';
		this._callHandler();
	}
};
$Promise.prototype._internalReject = function(reason){
	if(this._state === 'pending'){
		this._value = reason;
		this._state = 'rejected';
		this._callHandler();
	}
};
$Promise.prototype.then = function(res,rej){
	res = ((typeof res)==='function') ? res : null;
	rej = ((typeof rej)==='function') ? rej : null;
    this._handlerGroups.push({successCb:res,errorCb:rej});
    this._callHandler();
}
$Promise.prototype._callHandler = function(){

	if(this._state==='pending')
		return;
	
	else{
		var arr = this._handlerGroups;
		//Rejection handlers
		if(this._state==='rejected'){
		arr.forEach(function(val){
			if(val.errorCb!==null){
				val.errorCb(this._value);
			}
		},this);
		}
		//Success handlers
		else{
		console.log('success?');
		arr.forEach(function(val){
			val.successCb(this._value);
		},this);
		}
		this._handlerGroups = [];
		
	}
}
$Promise.prototype.catch = function(func){
	this.then(null,func);
}



      

/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
