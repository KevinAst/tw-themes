# Pulling it all together

Your {{book.guide.contextColors}} _(i.e. {{book.api.Schema}})_ and
{{book.guide.realColors}} _(i.e. {{book.api.Themes}})_ are closely
related within your application.  Each theme maps real colors to your
context colors.

The fusion of this relationship is accomplished through the
{{book.api.initTwThemes}} function, which accepts both
{{book.api.Schema}} and {{book.api.Themes}} parameters, providing a
central place where these two aspects can be affirmed and validated.

Interestingly enough, this is the only public function promoted by
**tw-themes**.  It however returns a {{book.api.TwThemes}} object
which in turn promotes the remaining API.  The reason for this is to
fuse the relationship between the {{book.api.Schema}} and
{{book.api.Themes}}.  

The {{book.api.TwThemes}} object contains functions to:

- change the active theme at run-time ... see:
  {{book.api.activateNextTheme}},
  {{book.api.activatePriorTheme}},
  {{book.api.activateTheme}}, 
  {{book.api.toggleInvertShade}}

- miscellaneous API in support of the app's theme selection UI
  control ... see:
  {{book.api.getActiveInvertShade}}
  {{book.api.getActiveThemeName}},
  {{book.api.getThemes}},

- auto configure the **tailwind** context colors in
  `tailwind.config.js` _(part of the build process)_ ... see:
  {{book.api.colorConfig}}
