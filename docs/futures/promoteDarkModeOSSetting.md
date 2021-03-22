# Promote Dark Mode OS Setting

**CONSIDER**: Add a new function in the **tw-themes** API that
promotes the Dark Mode OS setting.

This would be used by the client as one factor in setting the
{{book.api.initTwThemes}} `initialInvertShade` parameter.

**API**:
```js
+ osSettingPrefersDarkMode(): boolean ... true: dark-mode, false light-mode
```

**IMPLEMENTATION**:

The implementation would utilize the
[prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
media query _(which is supported in all browsers except IE)_.

```js
function osSettingPrefersDarkMode() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  return prefersDarkMode.matches;
}
```

**LINKS**:

- [Detecting the browser’s theme with CSS media query prefers-color-scheme](https://medium.com/batary/detecting-the-browsers-theme-with-css-media-query-prefers-color-scheme-268456478b63)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [prefers-color-scheme: Hello darkness, my old friend](https://web.dev/prefers-color-scheme/)

**DISCUSS**:

To contribute to this topic, please refer to
[this discussion](https://github.com/KevinAst/tw-themes/discussions/6).
