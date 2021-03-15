<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
TwColors
</h5>

`TwColors` is a **tailwind** JSON color structure to be referenced in
the `tailwind.config.js` color section.  It is returned from the
{{book.api.colorConfig}} function.

These color definitions reference CSS Variables that are dynamically
maintained _(at run-time)_ by the active theme.

**Structure Example:**

```js
// using the following Schema:
Schema: [['primary'], ['secondary'], 'error'];

// yields this TwColors: 
{
  "primary": {
    "50": "var(--twt-primary-50)",
    "100": "var(--twt-primary-100)",
    "200": "var(--twt-primary-200)",
    "300": "var(--twt-primary-300)",
    "400": "var(--twt-primary-400)",
    "500": "var(--twt-primary-500)",
    "600": "var(--twt-primary-600)",
    "700": "var(--twt-primary-700)",
    "800": "var(--twt-primary-800)",
    "900": "var(--twt-primary-900)",
    "DEFAULT": "var(--twt-primary)"
  },
  "secondary": {
    "50": "var(--twt-secondary-50)",
    "100": "var(--twt-secondary-100)",
    "200": "var(--twt-secondary-200)",
    "300": "var(--twt-secondary-300)",
    "400": "var(--twt-secondary-400)",
    "500": "var(--twt-secondary-500)",
    "600": "var(--twt-secondary-600)",
    "700": "var(--twt-secondary-700)",
    "800": "var(--twt-secondary-800)",
    "900": "var(--twt-secondary-900)",
    "DEFAULT": "var(--twt-secondary)"
  },
  "error": "var(--twt-error)",
}
```
