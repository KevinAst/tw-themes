## Future: Custom Color Shade Inversion

Currently {{book.guide.shadeInversion}} is only supported when seeded
with tailwind colors.

**CONSIDERATION**: The {{book.api.Themes}} `contextColors` structure
could be enhanced to accept two colors (e.g. `[base, inversion]`).

For example:

```js
Themes: {
  'Emerald': {
    contextColors: {
      'primaryLight': ['#6EE7B7', '#047857'],
      'primary':      'emerald-500',
      'primaryDark':  ['#064E3B', '#D1FAE5'],
      ... snip snip
    }
  }
};
```

We would need to determine if this would be optional (i.e. "in
addition" to the current behavior), or simply replace it.

**DISCUSS**:

To contribute to this topic, please refer to
[this discussion](https://github.com/KevinAst/tw-themes/discussions/5).
