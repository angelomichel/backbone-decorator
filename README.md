Backbone Decorator
==================

If you have lot's of data in your templates that needs formatting or
just a seperate way of displaying your model in one View or another.

Decorators are very usefull if you have a `events`-rich View, which
ussually have quite some template data aswell. The Decorator is here to keep
your Views focussed on the events and all supporting functions around the
those events. Especially for Views which use child views or partials in the
rendering, Decorator is very handy to keep everything nice and seperate.

Example View:
```javascript

    App.ProductsView = Backbone.View.extend({
      // decorator is assigned here
      decorator: App.ProductsDecorator,

      initialize: function() {
        this.listenTo(this.model, '...', this.someFunc);
      },

      events: {
        // some lot's of events here
        '...': '...'
      },

      // some lots of functions to support event-functions here

      render: function() {
        // getTemplateData is injected into Backbone.View
        // because a decorator is assigned.
        var data = this.getTemplateData();
        this.el.html(template(data));
      }

    });

```

Example Decorator:
```javascript

    App.ProductsDecorator = Backbone.Decorator.extend({
      getTemplateData: function() {
        var data = this.collection.toJSON();

        return _.extend(data, {
          numberOfProducts: this.collection.size(),
          actionBar: this.getActionBarData(),
          filterMenu: this.getFilterMenuData()
        });
      },

      getActionBarData: function() {
        var data;
        // get action bar specific data
        return data;
      },

      getFilterMenuData: function() {
        var data;
        // get filter menu specific data
        return data;
      }
    });

```

In the decorator example above you can use the `getActionBarData` and
`getFilterMenuData` in your View via the decoratorInstance property which
is injected aswell into your View. This is handy if you want a filter menu or
action bar to be updated seperatly from your content.

Example usage decoratorInstance:
```javascript
      // somewhere in a View

      renderActionBarComponent: function() {
        // you should 'cache' the this.$actionBarEl in the main
        // render() function

        // some partial
        var template = templates['_action_bar'];

        // only grab data for the partial
        var data = this.decoratorInstance.getActionBarData();
        this.$actionBarEl.html(template(data));
      }
```
