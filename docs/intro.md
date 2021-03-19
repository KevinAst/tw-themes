<!-- THIS is now in logo
# tw-themes

> _... powerful tailwind color themes **(dynamically selectable at run-time)**_
-->

<!-- LOGO: centered, WITH diagram border
<p style="text-align: center;">
  <img class="diagram"
       src="img/tw-themes-logo.png"
       alt="tw-themes"
       width="50%">
</p>
-->

<!-- LOGO: left, NO diagram border -->
<p>
  <img src="img/tw-themes-logo.png"
       alt="tw-themes"
       width="50%">
</p>


Developing **color themes** _that are dynamically selectable
at run-time_ is **a tedious and arduous process**.  Ideally **Dark
Mode** would also be included in our requirements list!  While
**tailwind** provides a powerful foundation to work from, it has no
real support for the dynamics that are needed for this task.

If you are a **tailwind** user _that needs **dynamic color themes**_,
this utility may be just what you are looking for!

> Want to see **tw-themes** in action? ... take a peek at the
> {{book.guide.seeItLive}} section.

<!--- Badges ---> 
[![NPM Version
Badge](https://img.shields.io/npm/v/tw-themes.svg)](https://www.npmjs.com/package/tw-themes)

## Introduction

**tw-themes** is a {{book.ext.tailwindcss}} utility that facilitates
_**dynamic color themes that are selectable at run-time**_.

Using **tw-themes** ...

- You define and use {{book.guide.contextColors}}.  These are
  _abstract colors that have meaning in the context of your
  application_.  You define them however you wish _(such as `primary`
  and `secondary`)_, and reference them throughout your markup with
  **tailwind**'s standard color syntax _(ex: `text-primary`,
  `bg-secondary-400`, etc.)_.

- You then map **Real Colors** to your **Context Colors** through one
  or more {{book.guide.themes}}, which can be selected at run-time to
  **change your application colors on the fly!**

  Your colors can be defined either through the **tailwind**'s
  standard color pallet, or your own custom colors _(or a combination
  of both)_.

  It's common to use {{book.guide.colorShading}} to accentuate various
  aspects of your UI.  In **tw-themes** you can define your own shade
  nomenclature _(e.g. `primaryLight`, `primaryDark`)_, or piggy back
  off of **tailwind**'s numeric shade scale _(e.g. `primary-50`,
  `primary-100`, `primary-200`, etc.)_.

- Speaking of color shades, **tw-themes** even allows you to
  {{book.guide.invertYourColorShades}} at run-time _(light-to-dark,
  and dark-to-light)_, **in effect doubling the number of color themes
  available**, and potentially supporting an **automatic dark mode
  theme** _(depending on how your colors are implemented)_.
  
  Of course, you can explicitly define your own
  {{book.guide.darkMode}} with minimal effort _(if
  {{book.guide.shadeInversion}} doesn't produce the desired effect)_
  ... it's merely a new theme!  Unlike **tailwind**'s new **Dark
  Mode** feature, using **tw-themes** to define your **dark themes**
  requires **NO CHANGES** to your markup _(the **tailwind** solution
  requires you to tediously add the `dark` variant throughout your
  markup)_.

- Because **tailwind** needs to know about your Context Colors,
  **tw-themes** provides a utility that auto-generates the required
  color definitions ... referenced in your `tailwind.config.js` _(part
  of the build process)_.

- As an internal tidbit, the dynamics of run-time color mapping is
  accomplished through the use of CSS Variables _(see
  {{book.guide.howDoItKnow}})_ ... _**inquiring minds want to know!**_

**tw-themes** promotes a <mark>**clean and simple approach**</mark> to
 _**dynamic color themes**_ that yields <mark>**powerful
 results**</mark>.


## At a Glance

- {{book.guide.install}} ... _installation instructions_

- {{book.guide.start}} ... _introduction and basic usage patterns_

- {{book.guide.seeItLive}} ... _see a real **tw-themes** app_

- {{book.guide.concepts}} ... _basic concepts concepts and terminology_

- {{book.api.api}} ... _full API reference_

- {{book.misc.history}} ... _peruse the various revisions of **feature-u**_

- {{book.misc.LICENSE}} ... _legal stuff_
