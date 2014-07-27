Backbone Decorator
==================

If you have lot's of data in your templates that needs formatting or
just a seperate way of displaying your model in one View or another.

Decorators are very usefull if you have a `events`-rich View, which
ussually have quite some template data aswell. The Decorator is here to keep
your Views focussed on the events and all supporting functions around the
those events.

Example:
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
