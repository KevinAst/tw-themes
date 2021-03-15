<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
TwThemes.getThemes(): Theme[]
</h5>

Return an iteratable array of all themes in the **tw-themes** object.  This
is provided as a convenience, because it is typically needed by the
App's theme selection UI control.

**API:**

```js
+ TwThemes.getThemes(): Theme[]
```

**Parameters:** NONE

**Return:** {{book.api.Theme}}\[\] ... an array wrapper around the
"named" theme sub-structure of the {{book.api.Themes}} object, **with
the injection of a `themeName` property**.
