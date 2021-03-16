<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
TwThemes.getActiveThemeName(): activeThemeName
</h5>

Return the `themeName` of the currently active theme.  This is
provided as a convenience, because it is typically needed by the App's
theme selection UI control.

**Note:** The return value of this method represents a dynamic
resource that can change.  Please refer to the discussion on
{{book.guide.TwThemesReactivity}}.


**API:**

```js
+ TwThemes.getActiveThemeName(): activeThemeName
```

**Parameters:** NONE

**Return:** string ... the `activeThemeName`
