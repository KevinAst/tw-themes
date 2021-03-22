<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
Themes
</h5>

`Themes` is a JSON structure that promotes the various color themes
defined in an application.  It applies real colors to the context
colors specified in the app's {{book.api.Schema}}.  It defines one or
more "named" themes through it's sub-structure _(one for each theme)_.

`Themes` represent the second essential parameter supplied to
{{book.api.initTwThemes}} _(the other is {{book.api.Schema}})_.

**Structure Example:**

```js
// using the following Schema:
Schema: ['primaryLight', 'primary', 'primaryDark', 'secondary', 'onLight', 'onDark', ['error']]

Themes: {
  'Emerald': {
    `clientProps`: `clientValues`,
    contextColors: {
      'primaryLight': 'emerald-300',
      'primary':      'emerald-500',
      'primaryDark':  'emerald-900',
      'secondary':    'red-500',
      'onLight':      'black',
      'onDark':       'white',
      'error':        'red',
    },
  },
  'Amber': {
    `clientProps`: `clientValues`,
    contextColors: {
      'primaryLight': 'amber-300',
      'primary':      'amber-500',
      'primaryDark':  'amber-900',
      'secondary':    'indigo-500',
      'onLight':      'black',
      'onDark':       'white',
      'error':        'red',
    },
  },
  ... more - snip snip
};
```

- Each "named" theme is defined through a sub-structure, keyed by the
  `themeName` which is referenced in {{book.api.activateTheme}}.  The
  example above has two `themeNames`: `Emerald` and `Amber`.

- The sub-structure contains the following fields:

  * Each theme may contain any number of `clientProps` which is
    totally defined/used by the client application.  As an example,
    you may wish to promote a `desc` in your theme selection UI
    control.

  * Each theme **must define** the `contextColors` property, which is
    a structure that maps all the {{book.guide.contextColors}} _(of
    the {{book.api.Schema}})_ to `realColors`.

    - ALL {{book.guide.contextColors}} _(defined in the
      {{book.api.Schema}})_ **must be supplied**.

    - The `realColor` can be on of the following:

      * A **tailwind** color name (found in the `'tailwindcss/colors'`
        import).  This represents a given color with **all it's
        numeric shades**.  This is the **only option** for
        schema-defined **shaded context colors** (because **tailwind**
        is the only supported source for **shaded colors**).

        EX: `'red'`

      * A **tailwind** color name suffixed with a shade.  This
        represents a single color, and can be used for a
        schema-defined **non-shaded context color**.

        EX: `'emerald-900'`

      * A custom color as represented by a CSS compatible color
        definition _(hex colors, rgb() refs, etc.)_.  This represents
        a single color, and can be used for a schema-defined
        **non-shaded context color**.

        EX: `'#8050c8'`

        EX: `'rgb(128, 80, 200)'`

        **NOTE:** You typically cannot use CSS color names (ex:
        `'red'`) because they routinely clash with the **tailwind**
        color names _(which takes precedence)_.  As a result, if you
        specify `'red'` it will be referencing the **tailwind**
        definition _(not the CSS keyword)_.  Most **tailwind** color
        names are shaded, which may be a source of confusion on some
        errors you may receive.  For example:

        ```
        Error: initTwThemes() parameter violation: 
               theme: 'My Best Theme' contextColor: 'primaryDark' realColor: 'red' 
               invalid realColor: 
                 references multiple tailwind shaded colors (without a dash -),
                 but the schema requires a single-color non-shaded context color (with a dash)
        ```

**Best Practice:** As a general rule it is better to base your colors
off of the **tailwind** color pallet, for the following reasons:

 - Only **tailwind** colors support **shade inversion**.  Custom
   colors will no-op on **shade inversion** requests.

   {{book.futures.customColorShadeInversion$}}

 - Only **tailwind** colors fully support tailwind's opacity
   directives _(how transparent a color is)_.
