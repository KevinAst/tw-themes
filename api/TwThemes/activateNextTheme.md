<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
TwThemes.activateNextTheme(): activeThemeName
</h5>

`TwThemes.activateNextTheme()` advances the current theme to the next
one "in line" _(wrapping at the end)_.  These heuristics are defined
by the **tw-themes** object, with the same "theme order" as defined in
it's {{book.api.Themes}} reference.

You can easily wrap this utility into a sophisticated UI control
and/or choose to build your own.

**API:**

```js
+ TwThemes.activateNextTheme(): activeThemeName
```

**Parameters:** NONE

**Return:** activeThemeName - the newly activated themeName
