# A Note on ES Modules in Tailwind Configuration

The {{book.api.colorConfig}} function conveys the **Context Colors**
to tailwind by referencing it directly in the `tailwind.config.js`.
This is a nice feature because it provides a **"single source of
truth"**.

There is an **issue** however, in that by accessing the `TwThemes`
object in `tailwind.config.js`, we are importing application code _(in
the configuration)_.  Typically our application code contains **ES
Modules**.  Currently, tailwind does NOT support ES Modules in it's
configuration.

You can work around this by resolving the `tailwind.config.js` in your
controlling configuration _(e.g. the configuration file for webpack or
rollup, etc.)_ ... as follows:

```js
rollup.config.js
================
import tailwindcss    from 'tailwindcss';          // NEW: in support of ES Modules
import tailwindConfig from './tailwind.config.js'; //      (found in tailwind.config.js)
... snip snip
export default {
  ... snip snip
  plugins: [
    svelte({
      ... snip snip
      preprocess: sveltePreprocess({
        ... snip snip
        postcss: {
          plugins: [
            ... snip snip
         // require("tailwindcss"),      // ... OLD: normal usage
            tailwindcss(tailwindConfig), // ... NEW: in support of ES Modules (in tailwind.config.js)
```
