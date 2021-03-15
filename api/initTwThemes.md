<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
initTwThemes(schema, themes, [initialThemeName], [initialInvertShade]): TwThemes
</h5>

The `initTwThemes()` function is the entry point into **tw-themes**.
It initializes the utility for use in your application, and must be
invoked very early in the application startup lifecycle _(typically in
a module scoped context)_.

Once the application has fully loaded _(via the `window load` event)_,
the `initialThemeName`/`initialInvertShade` will be activated
automatically.  This allows the application to manage this `initial`
state _(for example in the browser's local storage)_.

In essence `initTwThemes()` is an object creator.  It returns the
{{book.api.TwThemes}} object, from which from which all
remaining **tw-themes** API is promoted.  This is done so as to fuse
the relationship between the {{book.api.Schema}} and
{{book.api.Themes}}.

The {{book.api.TwThemes}} object contains functions to:

- change the active theme at run-time ... see:
  {{book.api.activateNextTheme}},
  {{book.api.activatePriorTheme}},
  {{book.api.activateTheme}}, 
  {{book.api.toggleInvertShade}}

- miscellaneous API in support of the app's theme selection UI
  control ... see:
  {{book.api.getActiveInvertShade}}
  {{book.api.getActiveThemeName}},
  {{book.api.getThemes}},

- auto configure the **tailwind** context colors in
  `tailwind.config.js` _(part of the build process)_ ... see:
  {{book.api.colorConfig}}

**NOTE**: These {{book.api.TwThemes}} methods are in reality functions
_(not methods)_.  In other words, they can be used without
dereferencing the object at run-time.  The object wrapper (in this
case) is simply a delivery mechanism.

**NOTE**: For additional considerations regarding the
{{book.api.TwThemes}} object, please refer to the discussions on
{{book.guide.appState}} and {{book.guide.TwThemesReactivity}}.


**API:**

```js
+ initTwThemes(schema, themes, [initialThemeName], [initialInvertShade]): TwThemes
```

**Parameters:**

- **`schema`**: {{book.api.Schema}} - the app-specific color schema,
  defining all {{book.guide.contextColors}}.

- **`themes`**: {{book.api.Themes}} - the structure defining one or
  more named color themes supported by this application.  This applies
  real colors to the context colors specified in the app's
  {{book.api.Schema}}.

- **`initialThemeName`**: {string} - the initial `themeName` to use at
  app startup.

  **DEFAULT**: The first theme in the `themes` reference.

- **`initialInvertShade`**: {boolean} - the initial `invertShade`
  option to use at app startup.

  **DEFAULT**: `false`

**Return:** {{book.api.TwThemes}} - a `TwThemes` object, from which
from which all remaining **tw-themes** API is promoted.
