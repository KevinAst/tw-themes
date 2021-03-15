# A Note on App State

**tw-themes** introduces one piece of state in your application ... that is
the {{book.api.TwThemes}} object.  How you manage this state is up to the
requirements of your application.

- If your application runs exclusively on the browser, then you should
  be able to get by with a module-scoped state solution.  This is
  simple to accomplish and is what you will see in the examples of
  this documentation.

- If your application can run on a server _(in addition to the browser
  ... say via Server Side Rendering)_, then you will need to manage
  this state appropriately.  This is outside the scope of this
  document, and may vary based on the web framework you are using.
