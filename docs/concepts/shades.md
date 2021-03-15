# Context Color Shades

Color shades are typically an important part of your color definition,
helping to distinguish various aspects of your UI.  As an example, you
may need three distinct shades for your primary context color:
`primaryLight`, `primary`, and `primaryDark`.

In **tw-themes** you have a choice when defining your context color shades:

- you can define your own shade nomenclature _(e.g. `primaryLight`,
  `primary`, `primaryDark`)_

- or you can use **tailwind**'s numeric shade scale
  _(e.g. `primary-50`, `primary-100`, `primary-200`, etc.)_

The former provides a more distinct set of color shades, and is
accomplished through a {{book.api.Schema}} definition of a single
context color.  In turn, your {{book.api.Theme}} can seed this with
either a **tailwind** color shade _(e.g. `'gray-100'`)_, or a custom
color _(e.g. `'#E4E4E7'`)_.

The latter provides more automated shades, and is accomplished through
a {{book.api.Schema}} definition of a multi-shaded context color.  In
this case your {{book.api.Theme}} **must** seed this with a
**tailwind** color that is _shadable_ _(e.g. `'gray'`)_.

As it turns out, the set of context colors you use may represent a
mixture of both approaches.

**Note on {{book.guide.shadeInversion}}**: 

Regardless of which option you use, you may still invert the shades of
either approach, providing the {{book.api.Theme}} is seeding this with
**tailwind** colors.  In other words, custom colors cannot be shade
inverted.

**Best Practice**: Use single context colors with your own shade
nomenclature

By using your own shade nomenclature, it:

- represents a more distinct set of shades _that is easier to
  remember and adhere to_

- provides the ability to more finely tune the color shades in-use
  _(by your {{book.api.Theme}})_ for different base colors
  _(for example, your `'Emerald'` theme may require a slightly darker
  `primaryLight` than other themes)_


**Best Practice**: Avoid using **tailwind**'s numeric shade scales to
distinguish context color boundaries.

You may be tempted to define a single context color _(say `base`)_
using **tailwind's** multi-shaded numeric scale _(`base-100`, etc.)_,
and then distinguish multiple context color boundaries with this one
definition _(example: `base-100` is **primary** and `base-700` is
**secondary**)_.

This may sound like a good idea initially, however it is simply too
confusing.  A heuristic like this hides the underlying real intent,
and is hard to remember.

It also doesn't allow color distinctions between your context
boundaries ... rather your context distinctions are restricted to
shades of the same color.

Most importantly, you cannot change this heuristic without changing
all of the markup in your entire application.
