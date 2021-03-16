<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
TwThemes
</h5>

The `TwThemes` object _(returned from {{book.api.initTwThemes}})_
fuses the relationship between the {{book.api.Schema}} and
{{book.api.Themes}}, and promotes the following API:

**TwThemes API:**

- change the active theme at run-time:
  - {{book.api.activateNextTheme$}}
  - {{book.api.activatePriorTheme$}}
  - {{book.api.activateTheme$}}
  - {{book.api.toggleInvertShade$}}
- miscellaneous API in support of the app's theme selection UI control:
  - {{book.api.getActiveInvertShade$}}
  - {{book.api.getActiveThemeName$}}
  - {{book.api.getThemes$}}
- auto configure the **tailwind** context colors in
  `tailwind.config.js` _(part of the build process)_:
  - {{book.api.colorConfig$}}

**NOTE**: These **tw-themes** methods are in reality functions _(not
methods)_.  In other words, they can be used without dereferencing the
object at run-time.  The object wrapper (in this case) is simply a
delivery mechanism.

**NOTE**: For additional considerations regarding the {{book.api.TwThemes}} object,
please refer to the discussions on {{book.guide.appState}} and {{book.guide.TwThemesReactivity}}.

