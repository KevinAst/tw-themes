# Install

**tw-themes** is a zero-dependent library.  

It does have one peerDependency: **tailwindcss** _(v2+)_ which you
must install & configure _(most likely you have already done this)_.
The dependence on **tailwindcss** is very minimal ... it simply
references tailwind's standard color pallet, when your
{{book.api.Theme}} references a tailwind color.

To install **tw-themes**, you simply do an `npm install`:

```shell
npm install --save tw-themes
```
