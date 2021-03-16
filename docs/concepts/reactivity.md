# A Note on TwThemes Reactivity

The {{book.api.TwThemes}} object represents an additional piece of
application state, of which **certain aspects can change**.  It
contains four pieces of state:

- Two are non-changing static resources:
  * the {{book.api.Schema}}
  * the {{book.api.Themes}}
- Two are dynamic resources that can change:
  * the `activeThemeName`
  * the `activeInvertShade` indicator

In spite of the fact that the last two resources can change,
**tw-themes** provides **no means** by which this reactivity can be
tracked ... _other than the app module which stimulated it's change_.

The reason for this is simple: There is only **one place** where this
state is needed and used ... that is the **app's UI component that
manages Theme Selection**.  This is assumed to be true in an
overwhelming majority of cases.  The **unique thing** about this fact
is that **this component controls both the display and update** of
this state.  As a result it **can easily manage the reactivity,
_because it knows when it changes_**.

Consequently, **tw-themes** uses the {{book.ext.KISS}} so as not to
complicate matters.

If your application is an exception to this rule, you can easily wrap
{{book.api.TwThemes}} in the state management solution of your
choosing to promote it's reactivity.

**FUTURE**: Provide reactivity through simple event (doesn't complicate API at all)!
```
TODO: - We can easily provide reactivity by simply emitting a custom
        DOM event on the <body>: TwThemeChanged - containing:
        activeThemeName/activeInvertShade

      - reword this section

      - document event
        * raw event type
        * reflect in  any function that changes our dynamic state
```
