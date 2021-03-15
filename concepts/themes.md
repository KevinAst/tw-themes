# Themes (Real Colors)

{{book.api.Themes}} map **Real Colors** to your **Context Colors** at
run-time.  It's that simple!

Typically, you will define multiple color themes.  However it is
surprising what you can do with a single theme.  For example, you can
make minor color adjustments throughout your entire application from a
single source (i.e. your theme)!

Never the less, once you have gone through this process, it is a
minimal effort to define multiple themes, so you might as well take
the plunge!

In **tw-themes** **Real Colors** are supplied through **tailwind**'s
[standard color pallet](https://tailwindcss.com/docs/customizing-colors#color-palette-reference).
This includes a total of 220 colors _(22 base colors, each with 10
shades)_.

If that is not enough, you can also specify **Real Colors** through
CSS compatible color definitions _(ex: `'#8050c8'`)_.  This however is
discouraged, because you loose the capability to invert shades, and
define opacity _(see {{book.api.Themes}} for more detail)_.
