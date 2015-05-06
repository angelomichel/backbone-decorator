(function() {
  // for collection instance
  var products;

  // for view instance
  var viewExtend, viewInitialize;

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
  var ProductsViewExtend, ProductsViewInitialize;

  module("Backbone.Decorator", {

    setup: function() {
      products = new Backbone.Collection([{
        title: "Apple MacBook Air",
        priceInCents: 99900
      }]);

      ProductsViewExtend = Backbone.View.extend({
        collection: products,
        decorator: productsDecorator
      });

      ProductsViewInitialize = Backbone.View.extend({
        collection: products
      });

      viewExtend = new ProductsViewExtend({
        collection: products
      });

      viewInitialize = new ProductsViewInitialize({
        collection: products,
        decorator: productsDecorator
      });

    }

  });


  test("get access to decoratorInstance", 2, function() {
    notEqual(viewExtend.decoratorInstance, undefined, "should automatically contain decoratorInstance on view");
    notEqual(viewInitialize.decoratorInstance, undefined, "should automatically contain decoratorInstance on view");
  });

  test("get a value of getTemplateData", 4, function() {
    equal(typeof viewExtend.getTemplateData, "function", "should automatically contain getTemplateData function");
    equal(typeof viewInitialize.getTemplateData, "function", "should automatically contain getTemplateData function");

    var viewTemplateData;

    viewTemplateData = viewExtend.getTemplateData();
    equal(viewTemplateData.numberOfProducts, viewExtend.collection.size(), "should in this example contain the size of the collection");

    viewTemplateData = viewInitialize.getTemplateData();
    equal(viewTemplateData.numberOfProducts, viewInitialize.collection.size(), "should in this example contain the size of the collection");
  });

  test("normal Backbone.Views should not be affected if no decorator supplied", 2, function() {
    view = new Backbone.View({ model: new Backbone.Model({ some: 'thing' }) });
    equal(view.decoratorInstance, undefined, "should not have a decoratorInstance");
    equal(view.getTemplateData, undefined, "should not have a getTemplateData function");
  });

})();