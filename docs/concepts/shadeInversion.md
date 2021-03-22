# Shade Inversion

A unique feature of **tw-themes** is the ability to invert your color shades
at run-time.

When you do this your light shades become dark and your dark shades
become light.  This has the effect of doubling the number of available
color themes.

You can choose to use this feature or simply let sleeping dogs lie
_(i.e. leave it alone)_.

Shade inversion is accomplished at run-time, when the active theme is
specified _(either through {{book.api.activateTheme}} or
{{book.api.toggleInvertShade}})_.

The interesting aspect of this feature is it has the potential of
supporting an **automated dark mode**, depending on how your color
philosophy is implemented.

**Please Note** that only **tailwind** colors support **shade
inversion**.  Custom colors will simply no-op on **shade inversion**
requests.  {{book.futures.customColorShadeInversion$}}
