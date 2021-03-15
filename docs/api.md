# API

The primary **tw-themes** API is promoted through a {{book.api.TwThemes}}
object _(returned from {{book.api.initTwThemes}})_.

Here is a summary of the complete **tw-themes** API:

- {{book.api.initTwThemes$}}
- {{book.api.Schema}}
- {{book.api.Themes}}
- {{book.api.TwColors}}
- {{book.api.TwThemes}}:
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
