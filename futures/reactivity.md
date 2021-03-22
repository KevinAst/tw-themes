## Future: Provide Reactivity through DOM Event

As mentioned in the {{book.guide.TwThemesReactivity}} section,
**tw-themes** provides **no means** by which reactivity can be
tracked ... _other than the app module which stimulated it's change_.

Promoting reactive state change is not thought to be needed because
there is typically only **one place** where this state is used
... that is the **app's UI component that manages Theme Selection**
_(controlling both the display and update of this state)_.

Using the {{book.ext.KISS}} we did not want to complicate the API.

**CONSIDERATION**: With that said, it would be easy to provide
reactivity by simply emitting a custom DOM event on the `<body>`.
This would **not** complicate the API in any way.

**Proposed Event**:

```
TwThemeChanged:
  containing:  activeThemeName/activeInvertShade
```

If we decide to do this, **AI** includes:

- document the `TwThemeChanged` event _(in a new API section)_
  * also reference this event in the API of any function that changes state

- reword the {{book.guide.TwThemesReactivity}} section

**DISCUSS**:

To contribute to this topic, please refer to
[this discussion](https://github.com/KevinAst/tw-themes/discussions/4).
