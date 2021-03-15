# Context Colors (Color Abstraction)

Applications that employ color themes, make use of a set of contextual
colors (i.e. **Context Colors**) that are referenced in the
application's markup.  In other words, they use Context Colors,
**NOT** real colors.

**Context Colors** are abstract.  They have meaning in the context of
your application.  Typically their names don't appear to be color
related at all.  Rather theirs names are derived from the desired
color to use within some app-specific context.  This could be
something as abstract as a "primary" section, or as concrete as an
"error" display.  You are in control of the "contextual" meaning in
your application.  You define them however you wish _(ex: `primary`,
`onPrimary`, `secondary`, `onSecondary`, `error`, `warning`, etc.)_.

In **tw-themes** your **Context Colors** are first-class **tailwind**
colors, so so you may use the standard color reference notation in
your markup _(ex: `text-primary`, `bg-secondary-400`, etc.)_.

**Context Color** definitions are made through a {{book.api.Schema}}.  This is
really nothing more than a list of abstract names you will use for
color references in your markup.

As a result, schema definition  is an extremely simple process!
The **hard part** is 
  **a:** determining your context color philosophy _(see {{book.guide.colorSystems}} for more insight)_, and
  **b:** permeating these colors throughout your markup _(obviously easier if you are starting from scratch)_.

There is a **big payoff** however, and that is the **ease at which** you can 
  **a:** tweak the colors in your application,
  **b:** support multiple color themes, and
  **c:** add support for dark mode!


**SideBar:** Because **tailwind** needs to know about your **Context
Colors**, **tw-themes** provides a utility that you will reference in the
color section of your `tailwind.config.js` _(part of the build process
... see: {{book.api.colorConfig}})_.
