<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
TwThemes.colorConfig(): TwColors
</h5>

The `TwThemes.colorConfig()` function is to be be used in the
`tailwind.config.js` color section _(as part of the build process)_.
It generates a configuration structure that defines the context colors
in-use, as defined by the {{book.api.Schema}} contained in the
{{book.api.TwThemes}} object.

These color definitions reference CSS Variables that are dynamically
maintained _(at run-time)_ by the active theme.

**API:**

```js
+ TwThemes.colorConfig(): TwColors
```

**Parameters:** NONE

**Return:** {{book.api.TwColors}} - a **tailwind** JSON color structure to be
referenced in the `tailwind.config.js` color section.

**Usage:**
```js
tailwind.config.js
==================
import TwThemes from './src/layout/colorTheme';
export default {
  ... snip snip
  theme: {
    ... snip snip
    extend: {
      colors: TwThemes.colorConfig(), // define the context colors in-use
    },
  },
};
```

**NOTE:** Having trouble with this snippet, due to **ES Modules**?
Please refer to {{book.guide.aNoteOnESModulesInTailwindConfiguration}}.
