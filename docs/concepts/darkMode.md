# Dark Mode

As we have discussed, it is possible to automatically glean a **Dark
Mode** by using **tw-themes**'s {{book.guide.shadeInversion}} feature.
It really depends on how your color scheme is implemented.

If your color philosophy produces dark modes by simply inverting the
color shades, you are {{book.ext.inLikeFlynn}}!  Simply alias the
**tw-themes** inversion state to a dark mode and you are done!

As a fallback, if this doesn't work _(for whatever reason)_, don't
fret ... dark modes are easily achieved!

Dark modes are extremely simple to implement in **tw-themes**!  You
simply define a theme that adjusts your colors to a dark color
strategy.  It's really no different than defining themes with distinct
base colors.

Unlike **tailwind**'s **Dark Mode** feature, in **tw-themes** there
are **NO** changes to your markup, because you have abstracted this
away by using {{book.guide.contextColors}}.

This is in stark contrast to **tailwind**'s **Dark Mode** feature,
which requires you to tediously add the `dark` variant throughout your
markup!
