<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
TwThemes.activateTheme({[themeName], [invertShade]}): [activeThemeName, activeInvertShade]
</h5>

`TwThemes.activateTheme()` activates the supplied theme, applying it's colors
within the application.

Internally, this merely sets the context-based CSS Variables to the
real colors defined by the theme.

**API:**

```js
+ TwThemes.activateTheme({[themeName], [invertShade]}): [activeThemeName, activeInvertShade]
```

**Parameters** _(**Please Note** <mark>this function uses named parameters</mark>)_:

- **`themeName`**: {string} - the theme name to activate (as defined
  in the {{book.api.Themes}} structure).

  **DEFAULT**: the currently active `themeName`.

- **`invertShade`**: {boolean} - an indicator as to whether the
  theme's shaded colors should be inverted (`true`) or not (`false`)
  ...  _i.e. light-to-dark, and dark-to-light_.

  **DEFAULT**: the current `invertShade` setting

**Return:** `[activeThemeName, activeInvertShade]` - the newly activated theme state.
