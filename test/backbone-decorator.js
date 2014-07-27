(function() {
  // for collection instance
  var products;

  // for view instance
  var view;

  // example decorator which would enrich the View with numberOfProducts
  var productsDecorator = Backbone.Decorator.extend({
    getTemplateData: function() {
      var data = this.collection.toJSON();
      return _.extend(data, {
        numberOfProducts: this.collection.size()
      });
    }
  });

  // example view
  var ProductsView;



  module("Backbone.Decorator", {

    setup: function() {
      products = new Backbone.Collection([{
        title: "Apple MacBook Air",
        priceInCents: 99900
      }]);

      ProductsView = Backbone.View.extend({
        collection: products,
        decorator: productsDecorator
      });

      view = new ProductsView({
        collection: products,
        decorator: productsDecorator
      });
    }

  });


  test("get access to decoratorInstance", 1, function() {
    notEqual(view.decoratorInstance, undefined, "should automatically contain decoratorInstance on view");
  });

  test("get a value of getTemplateData", 2, function() {
    equal(typeof view.getTemplateData, "function", "should automatically contain getTemplateData function");

    var viewTemplateData = view.getTemplateData();
    equal(viewTemplateData.numberOfProducts, view.collection.size(), "should in this example contain the size of the collection");
  });

  test("normal Backbone.Views should not be affected if no decorator supplied", 2, function() {
    view = new Backbone.View({ model: new Backbone.Model({ some: 'thing' }) });
    equal(view.decoratorInstance, undefined, "should not have a decoratorInstance");
    equal(view.getTemplateData, undefined, "should not have a getTemplateData function");
  });

})();