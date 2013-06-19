/**
 * Class emulation for MaViCo
 */

/*
  Learning notes:
  The reason to create (and return) a function into the Class definition is
  to make that other "klass" be a constructor, being called when we instantiate
  a new class object.

  E.g:
  var my_dog = new Class({name: 'bobby'})

  Class will return klass function, that will be called when adding "()" with
  the arguments being passed to the init function into it (init = constructor)

  "parent" attribute let us inherit from another class
 */
var Class = function(parent) {
  var klass = function() {
        this.init.apply(this, arguments);
      };

  // What inheritance does is changing the klass' prototype
  // to take the one of the parent.
  // Directly assigning klass.prototype = parent.prototype is not
  // an option, as we are not "extending" (kind of) but making class
  // to inherit: This way, when a method is not found in the class'
  // instance, if will be searched in parent's instance (new subclass)
  if(parent) {
    var subclass = function() {};
    subclass.prototype = parent.prototype;
    klass.prototype = new subclass;
  }

  // Empty constructor
  klass.prototype.init = function() {};

  // Shortcut to access the prototype
  klass.fn = klass.prototype;
  // Shortcut to access the class
  // (it can be used to access the static methods from a class instance)
  klass.fn.parent = klass;
  // Shortcut to parent methods
  klass._super = klass.__proto__;

  // Class (static) properties
  klass.extend = function(obj) {
    var extended = obj.extended,
        prop;

    // Copying all the properties one by one to this class
    for(prop in obj) {
      klass[prop] = obj[prop];
    }

    // If present, "extended" callback will be called
    // once the properties are copied, passing the new,
    //  extended class as argument
    if(extended) extended(klass);
  }

  // Instance properties
  klass.include = function(obj) {
    var included = obj.included,
        prop;

    // Copying all the properties to the prototype, so that
    // they will affect to every new instance
    for(prop in obj) {
      klass.fn[prop] = obj[prop];
    }

    if(included) included(klass);
  }

  // Proxy function to control the context
  // As a class property
  klass.proxy = function(func) {
    var self = this;
    return (function() {
      func.apply(self, arguments);
    });
  }

  // And as an instance property
  klass.fn.proxy = klass.proxy;

  return klass;
}
