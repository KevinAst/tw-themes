# Tooling

This document contains resources to help you in both the tooling and
development of the **tw-themes** project.

# At a Glance

- [NPM Scripts]
- [Dependencies]
- [Project Resources]
- [Project Setup]
  - [Setup GitHub Project]
  - [Setup Svelte App Tooling]
  - [Setup Tailwind CSS]
  - [Setup tw-themes]
  - [Setup Absolute Imports]
  - [Setup Node Builtins]
  - [Setup Jest Unit Testing]
  - [Setup Documentation Tooling]
  - [Setup Deployment]

<!--- *** SECTION *************************************************************** --->
# NPM Scripts

??$$ retrofit

This section provides a summary of the available **NPM Scripts**
_(organized by task)_:


```
DEVELOPMENT
===========
app:devServe ... launch dev server, with continuous build (watching for code changes)
                 http://localhost:5000/
                 NOTE: the internals of this script:
                       1. invokes the rollup bundler in a "watch" state (to: public/build)
                       2. implicitly invokes "npm start" to launch the server

docs:serve ..... AI: ?? launch documentation server, continuously watching for docs changes

start .......... start a static file server from the contents of public/
                 http://localhost:5000/
                 NOTE: This is implicitly invoked from app:devServe script
                       As a result, it CANNOT be renamed :-(
                 NOTE: You can invoke this explicitly to server the contents of
                       a production build (i.e. app:prodBuild)


TESTING
=======
test ........... AI: ?? run test suite, one time
test:watch ..... AI: ?? run test suite, continuously watching for module changes


CODE QUALITY
============
app:lint ....... AI: ?? verify code quality, linting BOTH production and test code
                 NOTE: Real-time linting is ALSO available in the VSCode editor.

app:check ...... AI: ?? convenience script to:
                 - verify code quality (lint)
                 - show outdated installed packages
                 - run tests (against our master src)

pkgReview ...... AI: ?? show outdated installed packages


DEPLOYMENT       NOTE: we DEPLOY the application
==========
app:deploy ..... deploy latest application to https://tw-themes.js.org/app/
                 NOTE: This script FIRST builds the app from scratch
                       ... via preapp:deploy

app:prodBuild .. build production bundle (to: public/build)
                 NOTE: This is implicitly invoked from app:deploy


app:clean ...... AI: ?? clean all machine-generated app/build directories


PUBLISH          NOTE: we PUBLISH the documentation
=======
docs:publish ... AI: ?? publish the latest documentation to https://tw-themes.js.org/docs/
                 NOTE: this script FIRST builds the docs from scratch
                       ... via predocs:publish

                 >>> OPTIONALLY:
docs:build   ... AI: ?? you can manually build the docs (into the _book/ dir)
                 HOWEVER it is not typically necessary 
                 BECAUSE this build is executed as the first step in docs:publish

docs:clean   ... AI: ?? clean all machine-generated docs directories


MISC
====
clean .......... AI: ?? cleans ALL machine-generated directories
```





<!--- *** SECTION *************************************************************** --->
# Dependencies

??$$ retrofit

This section provides some insight regarding the various dependencies
found in **tw-themes**.

The dependency list can become quite large for a mature project.  In
looking at `package.json`, the inevitable questions are:

- What is this dependency

- Why is it needed

- Is it a dependency for project tooling or application code?

  This last bullet is especially poignant because all Svelte project
  dependencies are `devDependencies`, due to the fact that all run-time
  resources are bundled together by the Svelte compiler.

The following table itemizes the **tw-themes** dependencies,
referencing when/where they were introduced/configured.

Dependency                        | Type        | Usage                   | Refer To
--------------------------------- | ----------- | ----------------------- | ----------------
`@rollup/plugin-commonjs`         | **TOOLING** | Svelte Bundler related  | [Setup Svelte App Tooling]
`@rollup/plugin-node-resolve`     | **TOOLING** | Svelte Bundler related  | [Setup Svelte App Tooling]
`rollup`                          | **TOOLING** | Svelte Bundler          | [Setup Svelte App Tooling]
`autoprefixer`                    | **TOOLING** | Tailwind CSS Build      | [Setup Tailwind CSS]
`gh-pages`                        | **TOOLING** | Deployment              | [Setup Deployment]
`rollup-plugin-css-only`          | **TOOLING** | Svelte Bundler related  | [Setup Svelte App Tooling]
`rollup-plugin-livereload`        | **TOOLING** | Svelte Bundler related  | [Setup Svelte App Tooling]
`rollup-plugin-svelte`            | **TOOLING** | Svelte Bundler related  | [Setup Svelte App Tooling]
`rollup-plugin-terser`            | **TOOLING** | Svelte Bundler related  | [Setup Svelte App Tooling]
`sirv-cli`                        | **TOOLING** | A static file server    | [Setup Svelte App Tooling]
`svelte`                          | **TOOLING** | Svelte Compiler         | [Setup Svelte App Tooling]
`svelte-preprocess`               | **TOOLING** | Tailwind CSS Build      | [Setup Tailwind CSS]
`tailwindcss`                     | **TOOLING**<br>**APP**   | Tailwind CSS Build<br>and application code  | [Setup Tailwind CSS]<br>and app code: `src/...`
`tw-themes`                       | **TOOLING**<br>**APP**   | a faux dependency (sourced here but a potential npm lib)  | [Setup tw-themes] and app code: `src/...`


**OLD TEMPLATE:** ?? synced above (remove when complete)

Dependency                        | Type        | Usage                   | Refer To
--------------------------------- | ----------- | ----------------------- | ----------------
`@babel/core`                     | **TOOLING** | Jest Testing related    | [Setup Jest Unit Testing]
`@babel/preset-env`               | **TOOLING** | Jest Testing related    | [Setup Jest Unit Testing]
<del>`@rollup/plugin-alias`</del> | **TOOLING** | Absolute Imports        | [Setup Absolute Imports]
`babel-jest`                      | **TOOLING** | Jest Testing related    | [Setup Jest Unit Testing]
`crc`                             | **APP**     | CRC Hashing Utility     | app code: `src/util/crc.js`
`enumify`                         | **APP**     | Enumeration Utility     | app code: `src/...`
`jest`                            | **TOOLING** | Jest Testing Framework  | [Setup Jest Unit Testing]
`konva`                           | **APP**     | Konva canvas 2D lib     | app code: `src/...`
`lodash.isequal`                  | **APP**     | Validation              | app code: `src/util/typeCheck.js`
`lodash.isfunction`               | **APP**     | Validation              | app code: `src/util/typeCheck.js`
`lodash.isobject`                 | **APP**     | Validation              | app code: `src/util/typeCheck.js`
`lodash.isplainobject`            | **APP**     | Validation              | app code: `src/util/typeCheck.js`
`lodash.isstring`                 | **APP**     | Validation              | app code: `src/util/typeCheck.js`
`rollup-plugin-node-builtins`     | **TOOLING** | Build some npm packages | [Setup Node Builtins]
`rollup-plugin-node-globals`      | **TOOLING** | Build some npm packages | [Setup Node Builtins]
`rollup-plugin-postcss`           | **TOOLING** | UI Kit related          | [Setup UI Kit (SMUI)] ?? TRASH
`sass`                            | **TOOLING** | UI Kit related          | [Setup UI Kit (SMUI)] ?? TRASH
`svelte-material-ui`              | **APP**<br>**TOOLING** | UI Kit       | app code: `src/...`<br>[Setup UI Kit (SMUI)] ?? TRASH



<!--- *** SECTION *************************************************************** --->
# Project Resources

??$$ retrofit

Wondering what some of the top-level file resources are?  Here is a
summary:

```
tw-themes/
  .git/ ................ our local git repo
  .gitignore ........... git repo exclusions (typically machine generated)
  LICENSE.md ........... our MIT License
  node_modules/ ........ install location of dependent packages (maintained by npm)
  package.json ......... project meta data with dependencies
  package-lock.json .... exhaustive dependency list with installed "locked" versions (maintained by npm)
  public/ .............. the app deployment root (with generated build/) see: "Setup Svelte App Tooling"
  README.md ............ basic project docs
  rollup.config.js ..... the rollup bundler configuration (used by Svelte) see: "Setup Svelte App Tooling"
  src/ ................. the app source code
    main.js ............ mainline entry point (redirect to Main.svelte)
    Main.svelte ........ general place to do setup/config (including Tailwind)
    App.svelte ......... our top-most App component (launched from Main.svelte)
    snip snip .......... many more!
  tailwind.config.js ... the tailwind css configuration file
  TOOLING.md ........... this document :-)

  ?? L8TR: (as needed)
  _docs/ ............... machine generated docs see: "AI"
  babel.config.js ...... babel configuration used by jest see: "Setup Jest Unit Testing"
  docs/ ................ master source of our on-line docs see: "AI"
  jest.config.js ....... jest unit testing configuration see: "Setup Jest Unit Testing"
```


<!--- *** SECTION *************************************************************** --->
# Project Setup

??$$ retrofit

This section chronicles the original setup of the **tw-themes**
project.

If you are forking this project, this detail is _unnecessary_, because
you simply `npm install` and then commence your development.

With that said, this section provides valuable insight on how the
project was originally setup and configured, and can be used in other
projects _(where you are starting from scratch)_!

**NOTE**: These sections roughly represent the chronology of when they
were carried out, however in some cases the order can be changed.

**Sub Sections**:
  - [Setup GitHub Project]
  - [Setup Svelte App Tooling]
  - [Setup Tailwind CSS]
  - [Setup tw-themes]
  - [Setup Absolute Imports]
  - [Setup Node Builtins]
  - [Setup Jest Unit Testing]
  - [Setup Documentation Tooling]
  - [Setup Deployment]



<!--- *** SUB-SECTION *************************************************************** --->
# Setup GitHub Project

There are many ways of initiating a new GitHub project. I'll leave the
details to you :-)

At the end of this process you should have:

- A new GitHub project
- A local git repository (for your development)
- Impacted Files:
  ```
    tw-themes/
      .git/ ................ our local git repo
      .gitignore ........... git repo exclusions (typically machine generated)
      LICENSE.md............ MIT License
      README.md ............ basic project docs
  ```

_My personal notes are "hidden" (in comment form) in this doc ..._

<!--- Comment out KJB Notes
**Setup GitHub Project** _(KJB Notes)_:

```
> REFERENCE: Project Check List:
  ... see: openSourcePublishing.txt
           c:/data/tech/dev/openSourcePublishing.txt
> REFERENCE: GitHub Repo:
  ... see: GitHub.txt ... Create a Repository on GitHub (i.e. a project)
           c:/data/tech/dev/GitHub.txt

> ********************************************************************************
- create github repository: tw-themes
  * New Project:
    - Create a Repository on GitHub (i.e. a project)
      * from github page (https://github.com/KevinAst)
      * click + (by user name)
      * New Repository
      * repository name: tw-themes
      * description:     powerful tailwind color themes (dynamically selectable at run-time)
      * Initialize this repository with a README
      * Add MIT License
      * click: Create repository
      * when project complete (very short time)
      * if you have exposed only a few of your github projects,
        expose this one (as needed) by pinning the project
      * click: Clone or download
               - Open with GitHub Desktop
                 * opens in my installed local GitHub Desktop
                 * select my local project directory: c:/dev/      
               - this clones your repository to your local computer
               - skip this step if you’re importing an existing repository
      * now available on my local computer
        - local file system:
          c:/dev/tw-themes> 
        - Github repository:
          https://github.com/KevinAst/tw-themes.git
      * adjust following files:
        > AUTOMATICALLY DONE:
          .git/
          LICENSE ... NOTE: rename to LICENSE.md
          README.md ... add basic notes WITH a work-in-progress indicator
      * check in / sync
        ... readme/license updates
      * verify README content on GitHub
      * NAH: add following topics (to github pages)
        >>> KEYWORDS
        ... tailwind, theme, themes, dark, dark-mode, colors

 > ********************************************************************************
 - create branch: initial-tooling
```
KJB Notes --->



<!--- *** SUB-SECTION *************************************************************** --->
# Setup Svelte App Tooling

??$$ retrofit

This task assumes you are "starting from scratch", setting up the
Svelte tooling _(the compiler, etc.)_, with the basic application code
template.

At the end of this process you should have:

- A running Svelte app _(a very basic template starting point)_

- Impacted Dependencies:
  ```
  @rollup/plugin-commonjs
  @rollup/plugin-node-resolve
  rollup
  rollup-plugin-css-only
  rollup-plugin-livereload
  rollup-plugin-svelte
  rollup-plugin-terser
  sirv-cli
  svelte
  ```

- Impacted Files:
  ```
  tw-themes/
    node_modules/ ........ install location of dependent packages (maintained by npm)
    package.json ......... project meta data with dependencies
    package-lock.json .... exhaustive dependency list with installed "locked" versions (maintained by npm)
    public/ .............. the Svelte app deployment root (with generated build/) [see: "Setup Svelte App Tooling"]
    rollup.config.js ..... the rollup bundler configuration (used by Svelte) [see: "Setup Svelte App Tooling"]
    src/ ................. the app source code (the basic template starting point)
  ```

**Original Instructions**:
- [Getting started with Svelte](https://svelte.dev/blog/the-easiest-way-to-get-started#2_Use_degit)
  _(from the Svelte site - the horses mouth)_
- [Getting Started with Svelte 3](https://www.digitalocean.com/community/tutorials/getting-started-with-svelte-3)
  _(pretty much same instructions)_
- [Svelte Template Repo](https://github.com/sveltejs/template)


**Summary**:

Make a copy of the [Svelte Template Repo](https://github.com/sveltejs/template)
using [degit](https://github.com/Rich-Harris/degit) _(a Rich Harris tool that copies git repositories)_

```
- Summary Instructions:
  $ cd c:/dev
  $ npx degit sveltejs/template tw-themes
  $ cd tw-themes
  $ npm install
  $ npm run dev

  * Update package.json with any additional fields you may desire
    (description, homepage, repository, keywords, license, etc.)

  * Move sirv-cli FROM: dependencies TO: devDependencies (in package.json)
    ... unsure why template registers this as dependencies

- Summary of npm scripts:

  * start .......... start a static file server from the contents of public/
                     http://localhost:5000/
                     NOTE: This is implicitly invoked from app:devServe script
                           As a result, it CANNOT be renamed :-(
                     NOTE: You can invoke this explicitly to server the contents of
                           a production build (i.e. app:prodBuild)

                     >>> renamed FROM: dev
  * app:devServe ... launch dev server, with continuous build (watching for code changes)
                     http://localhost:5000/
                     NOTE: the internals of this script:
                           1. invokes the rollup bundler in a "watch" state (to: public/build)
                           2. implicitly invokes "npm start" to launch the server

                     >>> renamed FROM: build
  * app:prodBuild .. build production bundle (to: public/build)
                     NOTE: This is implicitly invoked from app:deploy
```

_My personal Detailed Notes are "hidden" (in comment form) in this doc ..._

<!--- Comment out KJB Notes
**Details**:
```
- create a new project
  $ cd c:/dev
  # copy template to your project root
  $ npx degit sveltejs/template tw-themes

- setup the new project
  $ cd tw-themes
  * edit package.json
    "name": "tw-themes",
    "version": "0.1.0",
  $ npm install
    added 74 packages from 130 contributors and audited 104 packages in 4.591s

    KJB NOTE: Svelte is the latest V3 (specified in template pkg: "svelte": "^3.0.0")
              Installed Svelte IS: 3.20.1

- configure static resources
  * public/index.html
    - change Title: tw-themes
    - change resource resolution FROM absolute TO relative, making it deployable in a relative directory
  * change the public/favicon.png to be tw-themes specific
    - define the various tw-themes icons
      public/
        tw-themes.png            ... our favicon
        tw-themes-logo.png       ... our logo
        tw-themes-logo-eyes.jpg  ... prying eyes
    - update index.html
      * reference tw-themes.png
    - delete template favicon.png

- configure VSCode <<< DONE 3/11/2021
  * setup VSCode workspace file (and edit):
    c:/dev/tw-themes.code-workspace 
  * launch this workspace
  * N/A: ONE TIME: NOW load the VSCode "svelte" extension

- run the dev app
  $ npm run dev
  > NAVIGATE TO http://localhost:5000/

- you can now change code, and it is rebuilt

- ONE TIME: setup Svelte Dev Tools
  * install from chrome web store
  * KJB: has some visibility of props and state within the DOM
         * doesn't appear to have var names associated with each (they are like array indices ... hmmmm)

- FOR PRODUCTION BUILDS
  # build optimized lib
  $ npm run build
    ... creates:
        public/
          build/ <<< creates this new
            bundle.css
            bundle.css.map
            bundle.js
            bundle.js.map
  # can now run this production build
    ... uses sirv that includes your dependencies ... hmmm 
  $ npm run start
```
KJB Notes --->



<!--- *** SUB-SECTION *************************************************************** --->
# Setup Tailwind CSS

??$$ retrofit

The **tw-themes** demo app styles it's components based on
[Tailwind CSS].

This utility requires a build process that:

  1. Enables tailwind in general _(the `@tailwind` directives found in
     `src/Main.svelte`)_.

  2. Enable tailwind advanced directives _(`@apply`, `@layer`, etc.)_.

  3. Purging unneeded styles _(for production builds)_. The number of
     tailwind css classes are massive (over 1.5 meg).  A "production"
     build can prune this large resource to only what is used by a
     given application.  This is employed for "production" builds
     only, because it would be too time consuming to apply this for
     every development change.

Enabling and configuring the tailwind-portion of the build can be a
bit confusing, due to the large number of frameworks.  These
instructions are specific to [Svelte].

At the end of this process you should have:

- [Tailwind CSS] fully integrated in our [Svelte] app

- Impacted Dependencies:
  ```
  svelte-preprocess - A Svelte preprocessor with sensible defaults and support for: 
                      PostCSS, SCSS, Less, Stylus, CoffeeScript, TypeScript, Pug and much more.
                      ... Svelte's own parser understands only JavaScript, CSS and its HTML-like
                          syntax. To make it possible to write components in other languages,
                          such as TypeScript or SCSS, Svelte provides the preprocess API, which
                          allows to easily transform the content of your markup and your
                          style/script tags.

  tailwindcss       - A PostCSS plugin for tailwind
                      ... A utility-first CSS framework for rapidly building custom user interfaces.
                      ... this is what we are here for
  
  autoprefixer      - A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values
                      from "Can I Use"
                      ... like: -webkit- (Chrome, Android, iOS, Safari),
                                -moz- (FireFox),
                                -ms- (IE),
                                -o- (Opera)
  
  NOT CURRENTLY INSTALLED/USED: ---------------------------------------------------------------
  
  postcss-nesting   - A PostCSS Nesting plugin, letting you nest style rules inside each other, 
                      following the CSS Nesting specification. ... KJB: hmmmm
                        /* THIS: */
                        a, b {
                          color: red;
                         
                          & c, & d {
                            color: white;
                          }
                        }
                        /* BECOMES: */
                        a, b {
                          color: red;
                        }
                        a c, a d, b c, b d {
                          color: white;
                        }
  
  @tailwindcss/ui   - OPTIONAL tailwind ui plugin <<< NO README ... 50K downloads / week
                      * KJB: I think this is a package of tailwind defs for pre-packaged components
                             MAY BE a PURCHASED PRODUCT (found a site for that)
                             ... https://tailwindui.com/
  ```

- Impacted Files:
  ```
  tw-themes/
    tailwind.config.js ... the tailwind configuration file
    rollup.config.js ..... modified in support of tailwind
    src/
      main.js ............ mainline entry point (redirect to Main.svelte)
      Main.svelte ........ general place to do setup/config (including Tailwind)
      App.svelte ......... our top-most App component (launched from Main.svelte)
  ```

**Instructions**:

- [Official Install Docs](https://tailwindcss.com/docs/installation) ... _not svelte specific_
- [How to Set Up Svelte with Tailwind CSS](https://dev.to/swyx/how-to-set-up-svelte-with-tailwind-css-4fg5) ... _what I followed_
- [Svelte & Tailwind Css, minimal install](https://dev.to/paul42/svelte-tailwind-css-minimal-install-ia2) ... _hmmm_


**Installation Summary**:

- NOTE: Tailwind build process requires Node.js 12.13.0 or higher.

- install dependencies:
  ```
  $ npm install --save-dev svelte-preprocess tailwindcss autoprefixer
    + autoprefixer@10.2.4
    + tailwindcss@2.0.3
    + svelte-preprocess@4.6.9
  ```
- add `tailwind.config.js` at root:
  ```js
  tailwind.config.js
  ==================
                                                // KJB: same as in rollup.config.js
  const production = !process.env.ROLLUP_WATCH; // or some other env var like NODE_ENV
  export default {
    future: { // for tailwind 2.0 compatibility
      purgeLayersByDefault: true, 
      removeDeprecatedGapUtilities: true,
    },
    plugins: [
      // for tailwind UI users only
      // require('@tailwindcss/ui'), KJB: not using @tailwindcss/ui (can't find info on this)
      // other plugins here
    ],
    purge: {
      content: [
        "./src/**/*.svelte",
        // may also want to include base index.html
      ], 
      enabled: production // disable purge in dev
    },
  };
  ```

- setup rollup.config.js WITH svelte-preprocess MANAGING tailwindcss and autoprefixer
  ```diff
  rollup.config.js
  ================
    ...
  + import sveltePreprocess from 'svelte-preprocess'; // KJB: supporting tailwindCSS
    ...
    plugins: [
      svelte({
        ...
  +     // KJB: supporting tailwindCSS
  +     preprocess: sveltePreprocess({
  +       // https://github.com/kaisermann/svelte-preprocess/#user-content-options
  +       sourceMap: !production,
  +       postcss: {
  +         plugins: [
  +           require("tailwindcss"), 
  +           require("autoprefixer"),
  +         //require("postcss-nesting"),
  +         ],
  +       },
  +     }),
        ...
      }),
    ],
    ...
  ```

- configure Tailwind in our Svelte App

  ```js
  src/main.js <<< have it direct to Main.svelte
  ===========
  import Main from './Main.svelte';
  
  const main = new Main({
    target: document.body,
  });
  
  export default main;
  ```

  ```html
  src/Main.svelte <<< general place to do setup/config (including Tailwind)
  ===============
  <script>
   import App from './App.svelte'
  </script>
  
  <!-- launch our App -->
  <App/>
  
  <!-- setup Tailwind CSS (NOTE: do NOT believe lang="postcss" is needed) -->
  <style global lang="postcss">
  
   /* only apply purgecss on utilities, per Tailwind docs */
   /* purgecss start ignore */
   @tailwind base;
   @tailwind components;
   /* purgecss end ignore */
  
   @tailwind utilities;
  </style>
  ```

  ```html
  src/App.js <<< our top-level App component
  ==========
  app specific (whatever is needed for our app)
  ```

- Disable the global.css _(from the svelte template)_ so as to NOT
  interfere with tailwind css.  Simply remove it from `index.html`.
  ```diff
  public/index.html
  =================
  - <link rel='stylesheet' href='global.css'>
  ```

- **TEST:**
  ```html
  <p class="bg-red-500">Styled with tailwind ... should be red!</p>
  ```

- **NOTE:** when changing `Main.svelte` the build is **slow**
  _(upwards of 20 sec)_ ... **because** of the processing of the
  `@tailwind` directives.  This overhead is also incurred at the build
  startup.  **Fortunately**, this file rarely changes.


- **NOTE:** A prior rendition of these instructions involved
  additional npm scripts to run postcss-cli, but Chris Dhanaraj
  realized that this was NOT needed, since Svelte already had a way
  to inject CSS and svelte-preprocess that runs on every Svelte
  file.

- **UNRESOLVED:**
  FOR PURGING: Svelte has a `class:` binding syntax that isn't supported by
  Tailwind out of the box. There is an open discussion for this.

  - [Open Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/1731)
    Currently Tailwind’s default purge doesn’t match Svelte’s class: directive.
    <div class:bg-red-500={true} />
    SO: bg-red-500 will be removed in prod:

_My personal Detailed Notes are "hidden" (in comment form) in this doc ..._

<!--- Comment out KJB Notes
**Details**:
```
- don't understand various <script> qualifiers

  <style global lang="postcss"> ... 
                                ... INTERESTING: global promotes global directives (all components regardless of DOM hierarchy)
  
  <style> ... INTERESTING: I can utilize tailwind function in a <style> tag that is NOT qualified with lang="postcss"

- bundled css output size
  * my public/build/bundle.css is 3 MEG (3,221,102) <<< on a DEV build
  *                               5 K   (    5,046) <<< on a PROD build <<< KOOL
```
--->




<!--- *** SUB-SECTION *************************************************************** --->
# Setup tw-themes

??$$ retrofit

Our application color themes are provided through the **tw-themes**
utility.  This is currently a faux dependency _(i.e. simulated)_,
because it is **sourced here**.  However it has the potential of being
published as a full fledged npm library.  Please refer to the
[tw-themes README](./src/util/ui/tw-themes/README.md) for full
details.

As a general rule, it is configured by following the "Getting Started"
README instructions.

- The key aspect is we create an application module _(see
  `src/layout/colorTheme.js`)_ that promotes the `TwThemes` object, from which
  the remainder of the API is gleaned.

- From a **tooling perspective**, we must inform tailwind of our
  **Context Colors**, by referencing this `TwThemes` object in
  `tailwind.config.js`, through the following snippet:

  ```js
  tailwind.config.js
  ==================
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

  **ISSUE:**

  There is an **issue** here in that we are importing application code
  in this configuration file, which means it must support **ES
  Modules**.

  Currently, tailwind does NOT support ES Modules in it's
  configuration file.

  **FIX:**

  To work around this, our `rollup.config.js` resolves this
  configuration file, and passes it directly to the tailwindcss
  plugin function:

  ```js
  rollup.config.js
  ================
  import tailwindcss    from 'tailwindcss';          // NEW: in support of ES Modules
  import tailwindConfig from './tailwind.config.js'; //      (found in tailwind.config.js)
  ... snip snip
  export default {
    ... snip snip
    plugins: [
      svelte({
        ... snip snip
        preprocess: sveltePreprocess({
          ... snip snip
          postcss: {
            plugins: [
              ... snip snip
           // require("tailwindcss"),      // ... NEW: normal usage
              tailwindcss(tailwindConfig), // ... NEW: in support of ES Modules (in tailwind.config.js)
  ```



<!--- *** SUB-SECTION *************************************************************** --->
# Setup Absolute Imports

??$$ retrofit

TODO: ?? update this when we start using it

**NOTE**: Due to a bug in the [alias rollup
plugin](https://www.npmjs.com/package/@rollup/plugin-alias), resulting
in duplicate JS class definitions, we are currently **NOT** using
Absolute Imports _(details
[here](https://github.com/rollup/plugins/issues/296)
and
[here](https://stackoverflow.com/questions/61756633/svelte-compiler-generating-multiple-javascript-class-definitions))_

To alleviate the pain of relative path imports (for example):

```js
import TreeView  from "../../../../util/comp/TreeView.svelte";
```

We enable absolute imports, where tilde (`~/`) is the src root
(`src/`):

```js
import TreeView  from "~/util/comp/TreeView.svelte";
```


**Notes**:

- When using defined aliases, **you must supply the extensions**
  _(`.js`, `.svelte`, etc.)_

- You cannot prefix with `src/` out of the box _(without this
  alias utility)_.

- Currently our unit tests may not import any code that uses alias imports
  ... _because jest **does NOT** utilize rollup_

- You can define as many aliases as you like

- You can even employ regexp _(see [alias
  docs](https://www.npmjs.com/package/@rollup/plugin-alias) for
  details)_


**Links**:
- [Absolute Paths in Svelte](https://dev.to/sjafferi/absolute-paths-in-svelte-488c)
- [npm: @rollup/plugin-alias](https://www.npmjs.com/package/@rollup/plugin-alias)

At the end of this process you should have:

- The ability to utilize absolute imports.

- Impacted Dependencies:
  ```
  @rollup/plugin-alias
  ```

- Impacted Files:
  ```
  tw-themes/
    rollup.config.js ... modified to include alias configuration (Absolute Imports)
  ```


**Installation Details**:

- Install required dependencies (@rollup/plugin-alias):
  ```
  $ npm install --save-dev @rollup/plugin-alias
    + @rollup/plugin-alias@3.1.0
      added 1 package from 1 contributor and audited 266253 packages in 7.754s
  ```

- Configure `rollup.config.js` _(in support of **Absolute Imports**)_

  * For details, see embedded comments (`Absolute Imports`) in `rollup.config.js`

  * **rollup.config.js** _sample_
    ```js
    import alias from '@rollup/plugin-alias';  // KJB: in support of: Absolute Imports

    export default {
      ...
      plugins: [
        ...
        // KJB: Absolute Imports
        alias({
          entries: [
            // allow:      import TreeView  from "~/util/comp/TreeView.svelte";
            // instead of: import TreeView  from "../../../../util/comp/TreeView.svelte";
            { find: '~', replacement: 'src' },
          ]
        }),
      ]
    };
    ```


<!--- *** SUB-SECTION *************************************************************** --->
# Setup Node Builtins

??$$ retrofit

TODO: ?? WHAT?

Some npm packages utilize node builtins.  This requires some
additional rollup configuration!

I ran across this using the `crc` npm package, which uses `buffer`
internally, **which in turn requires this setup**.

Without this rollup configuration, you will receive the following
error from the svelte build process:

```
(!) Missing shims for Node.js built-ins
Creating a browser bundle that depends on 'buffer'.
You might need to include https://www.npmjs.com/package/rollup-plugin-node-builtins       
(!) Plugin node-resolve: preferring built-in module 'buffer' over local alternative at 
    'C:\dev\tw-themes\node_modules\buffer\index.js', pass 'preferBuiltins: false'
    to disable this behavior or 'preferBuiltins: true' to disable this warning
(!) Unresolved dependencies
https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency

buffer (imported by 
        node_modules\crc\crc1.js,
        node_modules\crc\crc8.js,
        node_modules\crc\crc16xmodem.js,
        node_modules\crc\crc16modbus.js,
        node_modules\crc\crc16.js,
        node_modules\crc\crc16ccitt.js,
        node_modules\crc\crc16kermit.js,
        node_modules\crc\crc24.js,
        node_modules\crc\crcjam.js,
        node_modules\crc\crc32.js,
        node_modules\crc\crc81wire.js,
        node_modules\crc\create_buffer.js)

(!) Missing global variable name
Use output.globals to specify browser global variable names corresponding to external modules
buffer (guessing 'buffer')
```

**Links**:
- [use node builtins in browser with rollup](https://openbase.io/js/rollup-plugin-node-builtins)
- [npm rollup-plugin-node-builtins](https://www.npmjs.com/package/rollup-plugin-node-builtins)
- [npm rollup-plugin-node-globals](https://www.npmjs.com/package/rollup-plugin-node-globals)


At the end of this process you should have:

- The ability to use npm packages that utilize node builtins _(such as
  `buffer`, used by `crc`)_.

- Impacted Dependencies:
  ```
  rollup-plugin-node-builtins
  rollup-plugin-node-globals
  ```

- Impacted Files:
  ```
  tw-themes/
    rollup.config.js ... modified to include Node Builtin configuration
  ```

**Installation Details**:

- Install required dependencies:
  ```
  $ npm install --save-dev rollup-plugin-node-builtins
    + rollup-plugin-node-builtins@2.1.2
      added 99 packages from 57 contributors and audited 267136 packages in 12.685s
      found 2 moderate severity vulnerabilities

  $ npm install --save-dev rollup-plugin-node-globals
    + rollup-plugin-node-globals@1.4.0
      added 5 packages from 79 contributors and audited 267145 packages in 9.376s
      found 2 moderate severity vulnerabilities
  ```


- Configure `rollup.config.js` _(in support of **Node Builtins**)_

  * For details, see embedded comments (`Node Builtins`) in `rollup.config.js`

  * **rollup.config.js** _sample_
    ```js
    // KJB: in support of: Node Builtins, used by some npm packages (e.g. crc/buffer), requiring built-in shim for modules designed for Browserfy
    import globals   from 'rollup-plugin-node-globals';
    import builtins  from 'rollup-plugin-node-builtins';

    export default {
      ...
      plugins: [
        ...
        // KJB: in support of: Node Builtins, used by some npm packages (e.g. crc/buffer), requiring built-in shim for modules designed for Browserfy
        globals(),
        builtins(),
      ]
    };
    ```


<!--- *** SUB-SECTION *************************************************************** --->
# Setup Jest Unit Testing

??$$ retrofit

TODO: ?? update when in-use

**tw-themes** uses [Jest](https://jestjs.io/en/) as it's unit
testing framework.  Svelte is **not** pre-configured with any testing
solution, so you must configure this yourself.


**Links**:
- [Jest](https://jestjs.io/en/)
- [Jest Installation](https://jestjs.io/docs/en/getting-started.html)
- [Testing Svelte components with Jest](https://dev.to/jpblancodb/testing-svelte-components-with-jest-53h3)
- [How to test Svelte components](https://timdeschryver.dev/blog/how-to-test-svelte-components)

At the end of this process you should have:

- The ability to use Jest in testing your JavaScript modules _(**not**
  GUI)_.

- Impacted Dependencies:
  ```
  @babel/core
  @babel/preset-env
  babel-jest
  jest
  ```

- Impacted Files:
  ```
  tw-themes/
    babel.config.js ...... babel configuration used by jest  [see: "Setup Jest Unit Testing")
    jest.config.js ....... jest unit testing configuration [see: "Setup Jest Unit Testing")
  ```

**Installation Details**:

**NOTE**: Jest requires babel, which not available in Svelte
          out-of-the-box, so you must install it manually.

**SideBar**: **tw-themes** does **not** systematically test the GUI
             itself, only business logic in JavaScript modules.  As a result, any
             UI related dependency found in the linked instructions were omitted.

- Install required dependencies (Jest and Babel):
  ```
  $ npm install --save-dev @babel/core @babel/preset-env jest babel-jest
    + jest@25.4.0
      added 620 packages from 281 contributors and audited 260964 packages in 36.954s
    + babel-jest@25.4.0
    + @babel/core@7.9.0
    + @babel/preset-env@7.9.5
      added 68 packages from 7 contributors and updated 2 packages in 21.756s
  ```

- Configure Jest/Babel by adding two files _(in project root)_:
  * **jest.config.js**:
    ```js
    // configuration of jest unit tests
    module.exports = {
      transform: {
        "^.+\\.js$": "babel-jest"
      },
      moduleFileExtensions: ["js"],
    
      // KJB: other UNNEEDED (I think)
      // testPathIgnorePatterns: ["node_modules"],
      // bail: false,
      // verbose: true,
      // transformIgnorePatterns: ["node_modules"],
    };
    ```
  * **babel.config.js**:
    ```js
    // babel needed for jest unit tests :-(
    // ... Svelte has it's own ES6 mechanism :-)
    module.exports = {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current"
            }
          }
        ]
      ]
    };
    ```

- Setup the **Testing NPM Scripts**:

  **babel.config.js**:
  ```js
  ... snip snip

  "scripts": {
    ...
    "test":       "jest src",
    "test:watch": "npm run test -- --watch"
  },

  ... snip snip
  ```


<!--- *** SUB-SECTION *************************************************************** --->
# Setup Documentation Tooling

??$$ retrofit

TODO: ?? details to follow



<!--- *** SUB-SECTION *************************************************************** --->
# Setup Deployment

??$$ retrofit

**tw-themes** is deployed on [GitHub Pages] (both the demo
web-app and our documentation).

At the end of this process you should have:

- A github pages `js.org` sub-domain: 
  * FROM: https://kevinast.github.io/tw-themes/
  * TO:   https://tw-themes.js.org/

- AI: ?? The ability to deploy the formal docs (to github pages)

- The ability to deploy the demo app (to github pages)
  ```
  $ npm run app:deploy
  ```

- Impacted Dependencies:
  ```
  gh-pages
  ```

- Impacted Scripts:
  ```
  app:deploy
  docs:publish ?? AI
  ```


**Install gh-pages**

All deployment scripts use the `gh-pages` utility, that simplifies publishing resources
to [GitHub Pages].  Install as follows:

```
$ npm install --save-dev gh-pages
```


**Establish `js.org` sub-domain**

Both our app and docs are deployed to [GitHub Pages].  To accommodate a
more professional URL, [js.org] supports a sub-domain, so that our
site is transformed:

- **from this**: https://kevinast.github.io/tw-themes/
- **to this**:   https://tw-themes.js.org/

Simply follow the instructions on [js.org].  Here is my summary _(more
notes hidden here in comment form)_:

```
 - create a temporary dir to deploy content to the gh-pages branch.
   * EX: _docs/
   * NOTE: can deploy to gh-pages branch at any time with:
           $ npx gh-pages --dist _docs

 - create a temporary index.html page at gh-pages root:
   * NOTE: this must convey enough content to be accepted as a legit npm package

 - create a CNAME file at gh-pages root:
   * CNAME
     =====
     tw-themes.js.org
   * NOTE: Once this is done, you will not be able to browse your gh-pages
           till js.org processes PR (below)

 - issue a js.org PR to introduce our sub-domain
   * new entry in: cnames_active.js
     ... "tw-themes": "kevinast.github.io/tw-themes",
   * monitor PR acceptance (will take 24 hrs)

 - once complete the sub-domain should be active
   * NOTE: the original gh-pages link to the new sub-domain
```

**Relative App Resources**

Because our app is deployed to a sub-directory of github pages, all
startup html resource references should be relative.  Simply change
`public/index.html` as follows:

```diff
public/index.html
=================
-   <link rel='icon' type='/image/png' href='/favicon.png'>
+   <link rel='icon' type='/image/png' href='favicon.png'>

-   <link rel='stylesheet' href='/global.css'>
+   <link rel='stylesheet' href='global.css'>

-   <link rel='stylesheet' href='/build/bundle.css'>
+   <link rel='stylesheet' href='build/bundle.css'>

-   <script defer src='/build/bundle.js'></script>
+   <script defer src='build/bundle.js'></script>
```

**Add `app:deploy` Script**

Add the following scripts to `package.json`:

```
package.json
============
{
  ...
  "scripts": {
    "preapp:deploy": "npm run app:prodBuild",
    "app:deploy": "gh-pages --dist public --dest app",
    ... snip snip
  }  
}
```


**Add `docs:publish` Script** ?? AI



<!--- Comment out KJB Notes

**Deploy App VIA gh-pages** _(KJB Notes)_:

```
> REFERENCE: Create React App (Deployment)
  ... see: https://create-react-app.dev/docs/deployment/#github-pages-https-pagesgithubcom
> REFERENCE: CreateReactApp.txt
  ... see: CreateReactApp.txt (see: "deploy app VIA gh-pages")
           c:/data/tech/dev/ReactJS/notes/CreateReactApp.txt

> ********************************************************************************
- AI: retrofit this

      ********************************
      * SUMMARIZE DEPLOYMENT PROCESS *
      ********************************

      > KEY: We are deploying BOTH docs and app on the same site

      * setup js.org sub-domain web alias (takes time to resolve)
        - for detailed steps see: "setup js.org" below 
        - FROM: https://kevinast.github.io/tw-themes
          TO:   https://tw-themes.js.org
        - you can actually do this at ANY TIME (first or last)
          BECAUSE: there is NO build dependency on the deployment domain
          EVERYTHING IS USING RELATIVE RESOURCES!!!

      > following steps assume the js.org sub-domain is in place
        ... but (again) you can actually do this first or last

      > GENERAL
      * site organization:
        /              ... root
          CNAME        ... the gh-pages custom domain
          index.html   ... a redirector to our docs
                           ex: FROM: https://tw-themes.js.org/
                               TO:   https://tw-themes.js.org/docs

          docs/        ... app documentation
            bla            FROM: {project}/_docs ... machine generated from {project}/docs (via gitbook)
            bla            ex:   https://tw-themes.js.org/docs

          app/         ... app deployment
            bla            FROM: {project}/build ... machine generated from {project}/ (via create-react-app)
            bla            ex:   https://tw-themes.js.org/app


      > GENERAL -and- DOCS-RELATED
      * setup deployment root
        - this is MANUALLY done ONE TIME
          ... using temporary local dirs
          ... mastered in gh-pages only
          ... should never change
              ... if (for some reason) a change is needed
                  you can edit via github web on gh-pages branch

        - define temporary local files
          {project}/
            _docs/
              CNAME
              =====
              tw-themes.js.org

              index.html  ... redirector to docs
              ==========
              <!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="refresh" content="1; url=./docs">
                  <script>
                    window.location.href = "./docs"
                  </script>
                  <title>tw-themes docs redirect</title>
                </head>
                <body>
                  <h1>tw-themes docs redirect</h1>
                  <p>
                    If you are not redirected automatically, follow this link to the
                    <a href="./docs">tw-themes docs</a>
                  </p>
                </body>
              </html>

              docs/
                index.html ... temporary file JUST to see it work (will be replaced with gitbook soon)

        - publish docs to gh-pages MANUALLY
          $ npx gh-pages --dist _docs

        - WORKS: test redirection to docs
          https://tw-themes.js.org/

        - you can now discard {project}/_docs
          ... should never change
              ... if (for some reason) a change is needed
                  you can edit via github web on gh-pages branch
          ... and the sub-dirs are published from other sources


      > GENERAL
      > DOCS-RELATED
      > APP-RELATED
      * setup the deployment scripts (in package.json)
        - TERMINOLOGY:
          "terminology:COMMENT":   "app is DEPLOYED, and docs are PUBLISHED",
        - DEPLOY APP (NOTE: see CRA for setup required to deploy to a sub-directory ... there is a bit of config)
          "preapp:deploy": "npm run app:prodBuild",
          "app:deploy": "gh-pages --dist public --dest app",
        - PUBLISH DOCS
          "l8tr:docs:prepare:do:once":  "gitbook install",
          "l8tr:docs:build:COMMENT":    "NOTE: for gitbook build/serve, following diagnostics are useful: --log=debug --debug",
          "l8tr:docs:build":            "gitbook build",
          "l8tr:docs:serve":            "gitbook serve",
          "l8tr:predocs:publish":       "npm run docs:build",
KEY       "docs:publish":          "gh-pages --dist _docs --dest docs",
          "docs:gitbook:help":     "gitbook help",

      > DOCS-RELATED
      * change {project}/_docs to something different -and- test script: docs:publish
        - NOTE: just reposition the docs root down and modify
        - NOTE: this will eventually be machine generated
        - run script
          $ npm run docs:publish
        - WORKED: verify root has NOT changed
        - WORKED: verify root/docs HAS changed

      > APP-RELATED
      * setup app deployment

        > BACKGROUND:
          - KEY: important concept: we are deploying our app in a sub-directory of our server
                 ... this is a bit different than we have done before
                 ... sidebar: and we are deploying our docs in a different sub-directory
          - CRA (Create React App) has a new option that makes it EASY to deploy apps in a sub-directory of our server
            * we can simply plop our app into ANY dir
            * KEY: for us, this is a viable option BECAUSE we are NOT using the:
                   - HTML5 pushState history API
                   - or not using client-side routing (KJB: they mean routing with history)
            * SUMMARY: this is accomplished by:
DO THIS       - using the following "homepage" in our package.json
                  package.json
                  ============
                  "homepage": ".", ... CRA makes all asset paths relative to index.html
DO THIS       - AND making all our run-time resource retrievals RELATIVE (no starting slash)
                ... this is the resources found in {project}/public
                ... ex: 
                        * KonvaSandboxScreen.js
                          <img src="tw-themes-logo.png" width="300" alt="Logo" className={classes.entry} /> ... NOT: /tw-themes-logo.png
                        * initializeFirebase.js
                          const resp = await fetch('fbac'); ... NOT: '/fbac'
          
              - BOTTOM LINE:
KEY: GREAT      * by using this deployment technique (package.json directive of "homepage": ".")
                  AND employing relative resource paths (in fetch() and <img/> etc)
                      NOTE: I did in fact test absolute paths
                            > these absolute paths WORK in dev, but BREAK in production (when deployed to a sub-dir)
                            > ... SO the relative paths are a required technique
KEY: GREAT        - we can deploy the app to ANY sub-directory
                    * in addition BECAUSE we are NOT using:
                      * HTML5 pushState history API
                      * or not using client-side routing (KJB: they mean routing with history)
KEY: GREAT        - we can use same heuristic for dev and prod deployment


        - DO THIS:
          * apply the "DO THIS" (above)
          * test app
            - in dev
              $ npm run app:start
                ... http://localhost:3000/
            - in prod
              $ npm run app:deploy
                ... https://tw-themes.js.org/app/

      > GENERAL
      * check in / sync
        ... finalize app deployment process (supporting BOTH docs and app on the same site)

      > GENERAL
      * once app is deployed in production,
        - setup shortcut to run as an app (not in browser)
          * this chrome procedure has changed (since last chrome version)
            > YES: this is what we want
              - create a shortcut -AND- check the "Open as window"
                ... THIS DOES IT ALL!!!
            > NO:  this is a bit quirky
              - create a shortcut
              - manually alter the properties target, adding the following option AT THE END (delimited with space)
                  -app=http://localhost:3000/
              - works pretty well, but is missing some ... hamburger menu

        - bookmark app
          

      ****************
      * setup js.org * ... can be done FIRST OR LAST
      ****************

      * I am going to be deploying BOTH app and docs to gh-pages

        - prime the pump by putting a dummy page in the root:

          * create _docs directory where our machine generated gitbook will eventually be placed
            - .gitignore it
              # machine generated docs (from GitBook)
              /_book/
              /_docs/

          * add following temporary html file to this _docs 
            - NOTE: has to be "reasonable content"
                    - per their README, their focus is on granting subdomain requests to
                      projects with a clear relation to the JavaScript ecosystem and
                      community (NOT personal pages, blogs, etc.).
                    - Projects such as NPM packages, libraries, tools that have a clear
                      direct relation to JavaScript, will be accepted when requesting a
                      JS.ORG subdomain.
                    - KJB: My experience is that by a) placing limited content in, and b) referencing other project docs and your README
                           IT WILL BE ACCEPTED

            _docs/index.html
            ================
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
                <title>tw-themes</title>
              </head>
              <body>
                <h1>tw-themes</h1>
            
                <p><i>... minimalist form validation with powerful results</i></p>
                <p>
                  Validating forms has notoriously been a painful development
                  experience. Implementing client side validation in a user friendly way
                  is a tedious and arduous process • you want to validate fields only at
                  the appropriate time (when the user has had the chance to enter the
                  data) • you want to present validation errors in a pleasing way • you
                  may need to apply custom validation (specific to your application
                  domain) • etc.
                </p>
            
                <p>
                  Even with the introduction of HTML5's Form Validation, it is still
                  overly complex, and doesn't address many common scenarios (mentioned
                  above). Without the proper approach, form validation can be one of the
                  most difficult tasks in web development.
                </p>
            
                <p>
                  This sub-domain is currently work-in-progress and will
                  eventually hold BOTH the formal documentation and the deployed app
                  <i>(similar to other projects under my control: e.g. <a href="http://feature-u.js.org/">http://feature-u.js.org/</a>)</i>
                </p>
            
                <p>
                  For now you may wish to take a look at the initial <a href="https://github.com/KevinAst/tw-themes/blob/main/README.md">Design Docs</a>.
                </p>
            
              </body>
            </html>

          * deploy file to gh-pages
            $ npx gh-pages --dist _docs

          * test site
            ... https://KevinAst.github.io/tw-themes

        - setup the js.org sub-domain alias: https://tw-themes.js.org/
          ... see: c:/data/tech/dev/GitHub.txt (configure the js.org subdomain) ... prob a bit stale
          * KEY:  js.org offers sub-domain that points to GitHub Pages
          * NICE: https://tw-themes.js.org/
                  https://kevinast.github.io/tw-themes

          * setup CNAME file at root and deploy to gh-pages
              CNAME
              =====
              tw-themes.js.org

             - issue a PR that adds my sub-domain to js.org
               * all done from the web
               * IF NEED BE (in lue of syncing old repo - which is a major deal), simply delete your copy of an old dns.js.org fork
                 - from your github dns.js.org fork
                 - click settings
                 - at bottom click delete repository
               * from the github js-org/dns.js.org project
                 ... https://github.com/js-org/js.org     <<< FYI: used to be dns.js.org
               * click the FORK button
                 ... this adds the dns.js.org to MY github
                 ... https://github.com/KevinAst/js.org    <<< FYI: used to be dns.js.org
                   * via the web, edit the cnames_active.js file
                   * add your entry:
                         "tw-themes": "kevinast.github.io/tw-themes",
                   * check in commit:
                     >>> KEY: use this description (they will change it to this if you don't):
                     ... NOT: adding tw-themes sub-domain
                     ... YES: tw-themes.js
                   * issue New Pull Request
                   * back in the dns.js.org, monitor your Pull Request
                     ... https://github.com/js-org/js.org/pulls
                         https://github.com/js-org/js.org/pull/5555
                     ... should take effect within 24 hrs
                     - confirm: web site NO LONGER SERVES till they enact this
                       https://kevinast.github.io/tw-themes/
                     - wait for sub-domain to go live (24 hrs)
                       * FIRST they will approve it
                       * THEN they will apply the domain
                       * ONCE ACCEPTED & MERGED 
                       * WORKS: should be able to now see the url:
                         ... https://tw-themes.js.org/

KJB Notes --->





<!--- *** LINKS ***************************************************************** --->

[NPM Scripts]:                    #npm-scripts
[Dependencies]:                   #dependencies
[Project Resources]:              #project-resources
[Project Setup]:                  #project-setup
  [Setup GitHub Project]:         #setup-github-project
  [Setup Svelte App Tooling]:     #setup-svelte-app-tooling
  [Setup Tailwind CSS]:           #setup-tailwind-css
  [Setup tw-themes]:              #setup-tw-themes
  [Setup Absolute Imports]:       #setup-absolute-imports
  [Setup Node Builtins]:          #setup-node-builtins
  [Setup Jest Unit Testing]:      #setup-jest-unit-testing
  [Setup Documentation Tooling]:  #setup-documentation-tooling
  [Setup Deployment]:             #setup-deployment

[GitHub Pages]:                   https://pages.github.com/
[js.org]:                         https://js.org/
[npm]:                            https://www.npmjs.com/
[Svelte]:                         https://svelte.dev/
[sveltejs/template]:              https://github.com/sveltejs/template
[sveltejs/component-template]:    https://github.com/sveltejs/component-template
[Tailwind CSS]:                   https://tailwindcss.com/
