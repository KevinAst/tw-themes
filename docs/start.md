# Getting Started

Out of the starting gate, there are a number of things you must manage
to setup your color themes.  This is not so much a reflection of the
**tw-themes** utility, but rather the nature of the beast.  **tw-themes** itself
is easy to use, and _simplifies a number of burdensome details_.

> Want to see **tw-themes** in action?  Take a peek at my [Svelte
> Native Forms Demo App](https://svelte-native-forms.js.org/app/)
> _([source
> here](https://github.com/KevinAst/svelte-native-forms/tree/main/src))_.
> The theme selection and dark mode controls are in the top-right
> NavBar drop-down.

1. **First**: You must determine the {{book.guide.contextColors}} that
   you will use in your application.

   You use **Context Colors** in your markup.  They are abstract
   _(e.g. `primary`/`secondary`)_ in the sense that they have meaning
   in the context of your application.  The **Context Colors** you use
   is completely up to you.  There are a number of philosophies to
   consider in this process, which are discussed in
   {{book.guide.contextColors}}, {{book.guide.colorShading}},
   {{book.guide.shadeInversion}}, {{book.guide.darkMode}}, and
   {{book.guide.colorSystems}}.
   
   The end result of this step will be your **tw-themes**
   {{book.api.Schema}}.  For sake of example, let's say we will be
   using the following **Context Colors** _(remember this definition
   can be whatever you desire)_:
   
   **Our Schema:**
   ```js
   const schema = ['primaryLight',   'primary',   'primaryDark',
                   'secondaryLight', 'secondary', 'secondaryDark',
                   'onLight',
                   'onDark',
                   'accentBorder',
                   'backdrop',
                  ];
   ```

2. **Next**: We need to apply {{book.guide.realColors}} to the process.  
   
   This is accomplished through {{book.guide.themes}}.  You will
   typically define multiple themes _(that are changeable at
   run-time)_, but starting out we can get by with one.  At least one
   theme is required, else our system would have **no color** at all.

   {{book.api.Themes}} map **Real Colors** to your **Context Colors**
   at run-time.  It's that simple!  In this example, we use the
   **tailwind** color pallet for our **real colors**.
   
   **Our Initial Theme:**
   ```js
   const themes = {
     'Cool Gray': {
       contextColors: {
         'primaryLight':   'coolGray-300',
         'primary':        'coolGray-500',
         'primaryDark':    'coolGray-900',
         
         'secondaryLight': 'orange-300',
         'secondary':      'orange-500',
         'secondaryDark':  'orange-900',
         
         'onLight':        'black',
         'onDark':         'white',
         
         'accentBorder':   'coolGray-600',
         
         'backdrop':       'coolGray-100',
       },
     },
   };
   ```
   
3. **Next**: We must {{book.guide.pullTheseTwoAspectsTogether}} and
   initialize our application with color themes.
   
   This is accomplished through the {{book.api.initTwThemes}}
   function.  This fuses the relationship between our
   {{book.api.Schema}} and {{book.api.Themes}}, and initializes
   **tw-themes** making it available for use in the application.

   We place this in a separate module to provide a **"single source of
   truth"**.
   
   **colorTheme.js**
   ```js
   import {initTwThemes} from 'tw-themes';
   
   const schema = ['primaryLight',   'primary',   'primaryDark',
                   'secondaryLight', 'secondary', 'secondaryDark',
                   'onLight',
                   'onDark',
                   'accentBorder',
                   'backdrop',
                  ];
   
   const themes = {
     'Cool Gray': {
       contextColors: {
         'primaryLight':   'coolGray-300',
         'primary':        'coolGray-500',
         'primaryDark':    'coolGray-900',
         
         'secondaryLight': 'orange-300',
         'secondary':      'orange-500',
         'secondaryDark':  'orange-900',
         
         'onLight':        'black',
         'onDark':         'white',
         
         'accentBorder':   'coolGray-600',
         
         'backdrop':       'coolGray-100',
       },
     },
   };
   
   const TwThemes = initTwThemes(schema, themes);
   export default TwThemes;
   ```

   **Please Note** that our module exports the {{book.api.TwThemes}}
   object _(returned from {{book.api.initTwThemes}})_.  This object
   contains the remaining **tw-themes** API, and can be used by other
   aspects of our application.

   Because this module executes {{book.api.initTwThemes}} in-line
   _(i.e. in module scope)_, the mere act of importing it will
   initialize our system.  As a result, this module must be imported
   very early in our application start-up process.
   
   **main.js**
   ```
   import './layout/colorTheme'; // initialize our color themes EARLY in our app's life-cycle
   ... snip snip
   ```
   
4. **Last**: We must define our new {{book.guide.contextColors}} to **tailwind**.
   
   Remember, **tailwind** requires a build process, that is driven
   from `tailwind.config.js`.  Fortunately **tw-themes** provides a
   utility function you may use to provide this definition.  Because
   our `colorTheme.js` module promotes a **"single source of truth"**,
   we can be assured that **tailwind** has the latest up-to-date
   information.
   
   **tailwind.config.js**
   ```js
   import TwThemes from './src/layout/colorTheme';
   export default {
     ... snip snip
     // define our abstract Context Colors
     theme: {
       extend: {
         colors: TwThemes.colorConfig(),
       },
     },
     ... snip snip
   };
   ```

   **HINT:** Having trouble with this snippet, due to **ES Modules**?
   Please refer to {{book.guide.aNoteOnESModulesInTailwindConfiguration}}.
   
5. **Finally**: You are free to use your **Context Colors** in your markup.
   
   Your **Context Colors** can be used in all the standard
   **tailwind** color directives _(ex: `bg-primaryDark`,
   `text-onDark`, etc.)_.
   
   At this point, you will want to fully flesh out your system,
   insuring that only your abstract **Context Colors** are used.

6. **Bonus**: {{book.guide.shadeInversion}}

   **tw-themes** offers a unique feature that allows you to invert the
   shades of your theme at run-time _(light-to-dark, and
   dark-to-light)_.  This has the effect of **doubling the number of
   color themes available**, and potentially supporting an **automatic
   dark mode theme** _(depending on how your colors are implemented)_.

   If your themes are seeded with **tailwind** colors, you can play
   with this option _(only **tailwind** colors support **shade
   inversion** - custom colors simply no-op)_.  Simply **add a UI
   control** _(somewhere in your app)_ that invokes the
   {{book.api.toggleInvertShade}} function.

7. **Later**: You will want to define multiple color themes.
   
   You can supply additional color themes by simply adding them in
   your {{book.api.Themes}} structure.
   
   Once you do this, you will need to provide a UI Control to change
   the active theme.

   For a quick start, tw-themes provides some convenience functions
   that allow you to quickly toggle through all your themes.  You may
   chose to use these utilities, or build your own UI control.

   **Example** _(in {{book.ext.svelte}})_:
   ```html
   <button on:click={TwThemes.activateNextTheme}>Next Theme</button>
   <button on:click={TwThemes.activatePriorTheme}>Prior Theme</button>
   <button on:click={TwThemes.toggleInvertShade}>Toggle Shade</button>
   ```

   The syntax _(above)_ will vary depending on the front-end framework
   you are using.  The relevant point is: you merely need to invoke
   one of the appropriate {{book.api.TwThemes}} functions.
