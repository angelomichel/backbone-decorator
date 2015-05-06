// for jshint
/*global require, define */

(function(root, factory) {
  // Start with AMD support.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], function(_, Backbone) {
      factory(root, _, Backbone);
    });

  // Next check for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    var Backbone = require('backbone');
    factory(root, _, Backbone);

  // Finnaly, if none of the above, create the extension and
  // assume Backbone is available at (browser) global scope.
  } else {
    factory(root, root._, root.Backbone);
  }
}(this, function(root, _, Backbone) {

  // Cache Backbone.View as we will be overriding it later
  
  var View = Backbone.View;

  // Backbone.Decorator
  // ------------------

  // `Backbone.Decorator` objects are designed to seperate the template-data
  // specific functions to a different instance, so the View can stay focussed
  // on event(function)s

  var Decorator = Backbone.Decorator = function(attributes) {
    var attrs = attributes || {};
    if (!attrs.view) { throw new Error('Cannot start Decorator without a View'); }

    // By default an instance gets at least the View available as `.view`
    // property, aswell as `.model` and `.collection` if present.
    this.view = attrs.view;
    if (this.view.model) { this.model = this.view.model; }
    if (this.view.collection) { this.collection = this.view.collection; }
  };

  // The decorator does NOT extend Backbone's events because we want the
  // decorator to operate as quickly as possible and let the view handle event
  // driven things. Backbone.Decorators should mainly focus on the
  // `getTemplateData` function and possible small subsets of that data object
  // (e.g. if you have child views).
  _.extend(Decorator.prototype, {
    // a Decorator must always have the `getTemplateData` function. Which is
    // also by default injected into Backbone.Views. They should return
    // something usable for the templateEngine.
    getTemplateData: function() {
      return {};
    }
  });
  Decorator.extend = Backbone.View.extend;

  // Extending Backbone.View
  // -----------------------

  // If a `decorator` is supplied to Backbone.View.extend's object, we
  // automatically try to launch an instance when the View is start too.
  // The decorator tries to assign getTemplateData to your Backbone.View (only
  // when it doesn't already exists). ;
  var ExtendedView = View.extend({
    constructor: function(attributes) {
      var decorator = (attributes || {}).decorator || this.decorator;
      if (decorator) {
        this.decoratorInstance = new decorator({ view: this });
        this.getTemplateData = function() {
          return this.decoratorInstance.getTemplateData();
        };
      }
      View.apply(this, arguments);
    }
  });
  Backbone.View = ExtendedView;

  return Backbone.Decorator;
}));