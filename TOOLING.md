# Tooling

This document contains resources to help you in both the tooling and
development of the **tw-themes** project.

# At a Glance

- [NPM Scripts]
- [Dependencies]
- [Project Resources]
- [Project Setup]
  - [Setup GitHub Project]
  - [Initialize NPM Project]
  - [Setup Unit Testing]
  - [Setup Docs Tooling]
  - [Setup js.org sub-domain]
  - [Setup Lib Deployment]


<!--- *** SECTION *************************************************************** --->
# NPM Scripts

This section provides a summary of the available **NPM Scripts**
_(organized by task)_:


```
DEVELOPMENT
===========
test:watch ..... run test suite, continuously watching for module changes

docs:serve ..... launch documentation server, continuously watching for docs changes
                 NOTE: adding `--log=debug --debug` to this npm script CAN BE USEFUL

TESTING
=======
test ........... run test suite, one time
test:watch ..... run test suite, continuously watching for module changes


DOCS             NOTE: we PUBLISH our docs
====
docs:serve ..... launch docs server, continuously watching for docs changes
                 NOTE: adding `--log=debug --debug` to this npm script CAN BE USEFUL

docs:publish ... publish the latest docs to https://tw-themes.js.org/
                 NOTE: this script FIRST builds the docs from scratch
                       ... via predocs:publish

                 >>> OPTIONALLY:
docs:build   ... you can manually build the docs (into the _book/ dir)
                 HOWEVER it is not typically necessary 
                 BECAUSE this build is executed as the first step in docs:publish

docs:clean   ... clean all machine-generated docs directories


BUNDLE/DEPLOY    NOTE: we DEPLOY our bundled library to NPM
=============
lib:deploy ..... AI: ?? deploy latest library to NPM
                 NOTE: This script FIRST builds the app from scratch
                       ... via prelib:deploy

lib:prodBuild .. AI: ?? build production bundle (to: public/build)
                 NOTE: This is implicitly invoked from lib:deploy


lib:clean ...... AI: ?? clean all machine-generated app/build directories


MISC
====
clean .......... AI: ?? cleans ALL machine-generated directories
```





<!--- *** SECTION *************************************************************** --->
# Dependencies

This section provides some insight regarding the various dependencies
found in **tw-themes**.

The dependency list can become quite large for a mature project.  In
looking at `package.json`, the inevitable questions are:

- What is this dependency

- Why is it needed

- Is it a dependency for project tooling or application code?

The following table itemizes the **tw-themes** dependencies,
referencing when/where they were introduced/configured.

Dependency                        | Type        | Usage                     | Refer To
--------------------------------- | ----------- | ------------------------- | ----------------
`@babel/core`                     | **TOOLING** | Jest Testing related      | [Setup Unit Testing]
`@babel/preset-env`               | **TOOLING** | Jest Testing related      | [Setup Unit Testing]
`babel-jest`                      | **TOOLING** | Jest Testing related      | [Setup Unit Testing]
`gh-pages`                        | **TOOLING** | Docs Deployment           | [Setup Docs Tooling]
`gitbook-cli`                     | **TOOLING** | Docs Generation           | [Setup Docs Tooling]
`jest`                            | **TOOLING** | Jest Testing Framework    | [Setup Unit Testing]
`rimraf`                          | **TOOLING** | Various NPM Clean Scripts | [Setup Docs Tooling]
`tailwindcss`                     | **TOOLING**<br>**APP** | our peerDependency<br>(what tw-themes is built on) | [Initialize NPM Project]<br>and app code: `src/...`


<!--- *** SECTION *************************************************************** --->
# Project Resources

Wondering what some of the top-level file resources are?  Here is a
summary:

```
tw-themes/
  .git/ ................ our local git repo
  .gitignore ........... git repo exclusions (typically machine generated)
  _book/ ............... machine generated docs (output of GitBook)  see: "Setup Docs Tooling"
  babel.config.js ...... babel configuration used by jest (see: "Setup Unit Testing")
                         and library build (see: "Setup Lib Deployment")
  book.json ............ GitBook configuration see: "Setup Docs Tooling"
  docs/ ................ master source of GitBook project docs  see: "Setup Docs Tooling"
    *.md ............... various Markdown files making up our docs
  jest.config.js ....... jest unit testing configuration see: "Setup Unit Testing"
  LICENSE.md ........... our MIT License
  node_modules/ ........ install location of dependent packages (maintained by npm)
  package.json ......... project meta data with dependencies
  package-lock.json .... exhaustive dependency list with installed "locked" versions (maintained by npm)
  README.md ............ basic project docs
  src/ ................. the app source code
    index.js ........... promotes all tw-themes PUBLIC API
    snip snip .......... many more!
  TOOLING.md ........... this document :-)
```


<!--- *** SECTION *************************************************************** --->
# Project Setup

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
  - [Initialize NPM Project]
  - [Setup Unit Testing]
  - [Setup Docs Tooling]
  - [Setup js.org sub-domain]
  - [Setup Lib Deployment]



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
        ... tailwind, theme, themes, dark, dark-mode, colors, web

 > ********************************************************************************
 - create branch: initial-tooling
```
KJB Notes --->



<!--- *** SUB-SECTION *************************************************************** --->
# Initialize NPM Project

This task will initialize the project as an NPM project.

At the end of this process you should have:

- **tw-themes** initialized as an NPM project, with it's `tailwindcss`
  peerDependency.

- Impacted Dependencies:
  ```
  tailwindcss ... our peerDependency (what tw-themes is built on)
  ```

- Impacted Files:
  ```
  tw-themes/
    .gitignore ........... modified as needed
    node_modules/ ........ install location of dependent packages (maintained by npm)
    package.json ......... project meta data with dependencies
    package-lock.json .... exhaustive dependency list with installed "locked" versions (maintained by npm)
  ```

**Summary**:

1. Create `package.json` file at project root, with following the
   characteristics _(this contains our `tailwindcss` peerDependency)_:

   ```js
   {
     "name": "tw-themes",
     "version": "0.1.0",
     "description": "powerful tailwind color themes (dynamically selectable at run-time)",
     "homepage": "https://tw-themes.js.org/",
     "repository": {
       "type": "git",
       "url": "https://github.com/KevinAst/tw-themes.git"
     },
     "keywords": [
       "tailwind",
       "themes",
       "theme",
       "dark",
       "dark-mode",
       "colors",
       "web",
       "utility",
       "geeku",
       "astx"
     ],
     "author": "Kevin J. Bridges <kevin@wiiBridges.com> (https://github.com/KevinAst)",
     "license": "MIT",
     "scripts": {
       "L8TR": "L8TR"
     },
     "devDependencies": {
       "tailwindcss": ">=2.0.0"
     },
     "peerDependencies": {
       "tailwindcss": ">=2.0.0"
     }
   }
   ```

2. Initialize Node/NPM:

   ```
   $ cd c:/dev/tw-themes
   $ npm install
   ```

3. Update `.gitignore` with following:

   ```
   # node dependencies (defined via "npm install")
   /node_modules/

   # not really interested in package-lock.json in repo
   /package-lock.json

   ... snip snip
   ```

_My personal Detailed Notes are "hidden" (in comment form) in this doc ..._

<!--- Comment out KJB Notes
**Details**:
```
In addition to above:

- configure VSCode
  * setup VSCode workspace file (and edit):
    c:/dev/tw-themes.code-workspace 
  * launch this workspace
  * N/A: ONE TIME: NOW load the VSCode "svelte" extension
```
KJB Notes --->


<!--- *** SUB-SECTION *************************************************************** --->
# Setup Unit Testing

**tw-themes** uses [Jest](https://jestjs.io/en/) as it's unit
testing framework.

**Links**:
- [Jest](https://jestjs.io/en/)
- [Jest Installation](https://jestjs.io/docs/en/getting-started.html)

At the end of this process you should have:

- The ability to use Jest in running the test suite.

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
    babel.config.js
    jest.config.js
  ```

**Installation Details**:

- Install required dependencies (Jest and Babel).

  NOTE: Some of these dependencies overlap with other setup (ex:
          "Setup Unit Testing").  Install what is missing.

  ```
  $ npm install --save-dev @babel/core @babel/preset-env jest babel-jest
    + babel-jest@26.6.3
    + jest@26.6.3
    + @babel/preset-env@7.13.10
    + @babel/core@7.13.10
      added 576 packages from 365 contributors and audited 658 packages in 37.522s
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
  **package.json**:
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
# Setup Docs Tooling

**tw-themes** promotes it's documentation through [GitHub Pages],
using [GitBook], which is a [Markdown] based solution.  This
configuration setup is patterned after the following article _(minus
the JSDoc)_: [Integrating GitBook with JSDoc to Document Your Open
Source Project].

At the end of this process you should have:

- Documentation setup through [Markdown] files, deployable to [GitHub Pages].

- Impacted Dependencies:
  ```
  gh-pages
  gitbook-cli
  rimraf
  ```

- Impacted Files:
  ```
  package.json ...... enhance docs dependencies -and- docs scripts
  book.json ......... GitBook configuration
  docs/ ............. master source of GitBook project docs
    toc.md .......... the summary TOC (seen in the left nav)
    intro.md ........ the Guide Introduction
    *.md ............ various Markdown files making up our docs
    sectionN/ ....... optional docs dirs (as required)
      *.md
    styles/
      website.css ... gitbook style overrides
  _book/ ............ machine generated docs (output of GitBook)
    *.html
    *.js
    *.css
  ```

**Installation Details**:

1. Install the [GitBook command-line interface]

   ```
   $ npm install --save-dev gitbook-cli
     + gitbook-cli@2.3.2
       added 577 packages from 672 contributors and audited 1234 packages in 32.693s
   ```

   KJB: Yikes: this is the same version installed 3 years ago (in feature-u).

   It has 10K downloads / week, but was last published 4 years ago ... hmmm

2. Define following doc-related project files

   **NOTE**: To find the installed gitbook version (referenced in `book.json` below):
   ```
   $ npx gitbook ls
     GitBook Versions Installed:
     * 3.2.2
       2.5.2
   ```

   ```
   book.json (GitBook configuration)
   =========
     {
       "gitbook":     "3.2.2",
       "root":        "./docs",
       "title":       "tw-themes",
       "description": "powerful tailwind color themes (dynamically selectable at run-time)",
       "author":      "Kevin J. Bridges <kevin@wiiBridges.com> (https://github.com/KevinAst)",
       "structure": { 
         "readme":  "intro.md",
         "summary": "toc.md" 
       }
     }

   docs/

     toc.md (defines the left-nav)
     ======
       # Table of content 
       
       ### tw-themes (0.1.0)
       * [Getting Started](start.md)
       
       ----

     intro.md (docs introduction)
     ========
       # tw-themes

       **tw-themes** is a tailwindcss utility that facilitates _**dynamic
       color themes that are selectable at run-time**_.

     start.md (our getting started)
     ========
       # Getting Started
       This is the **Getting Started** section.
       Here are some references to the [Introduction](intro.md)
       and [API](api.md).
   ```

3. Install gh-pages (used in npm scripts below)

   ```
   $ npm install --save-dev gh-pages
     + gh-pages@3.1.0
       added 28 packages from 10 contributors and audited 1262 packages in 10.237s
   ```

4. Install rimraf (used in npm scripts below)

   ```
   $ npm install --save-dev rimraf
     + rimraf@3.0.2
       updated 1 package and audited 1263 packages in 7.012s
   ```

5. Define the following **docs-related NPM scripts**:

   **package.json**:
   ```js
   ... snip snip
   "scripts": {
     ...
     "docs:build":            "gitbook build",
     "docs:serve":            "gitbook serve",
     "predocs:publish":       "npm run docs:build",
     "docs:publish":          "gh-pages --dist _book",
     "docs:gitbook:help":     "gitbook help",
     "docs:clean":            "rimraf _book"
     ...
   },
   ... snip snip
   ```

6. Prep/Initialize gitbook plugins.  This step is needed whenever you
   add gitbook plugins via `book.json`. As an example the `toolbar`
   plugin (mentioned below).

   ```
   $ npx gitbook install
         info: nothing to install!
               KJB: This command only needs to be run when gitbook plugins
                    are added to book.json
   ```

7. Serve up docs to test our setup

   ```
   $ npm run docs:serve
   ```

   And browse: http://localhost:4000/

   **Resolve Issues**
   ```
   - It appears that gitbook-cli is so old that it has issues running
     in a modern node/npm.

     Starting to question is gitbook is the best option for documentation
     ... at least in future projects

   - When running either "docs:build"/"docs:serve" receive follow error:
     $ npx gitbook build
       C:\dev\tw-themes\node_modules\npm\node_modules\graceful-fs\polyfills.js:287
             if (cb) cb.apply(this, arguments)
                        ^
       TypeError: cb.apply is not a function
           at C:\dev\tw-themes\node_modules\npm\node_modules\graceful-fs\polyfills.js:287:18
           at FSReqCallback.oncomplete (fs.js:184:5)

     * found several mentions of this:

       1. Gitbook-cli install error TypeError: cb.apply is not a function inside graceful-fs
          ... https://stackoverflow.com/questions/64211386/gitbook-cli-install-error-typeerror-cb-apply-is-not-a-function-inside-graceful
          * they talk about gitbook-cli working in node v12 and NOT in node v14
          * they install a newer version of graceful-fs@latest IN gitbook-cli
            $ cd /usr/local/lib/node_modules/gitbook-cli/node_modules/npm/node_modules/
            $ npm install graceful-fs@latest --save

       2. How I fixed a "cb.apply is not a function" error while using Gitbook
          ... https://flaviocopes.com/cb-apply-not-a-function/
          > a real hack:
          * this guy commented out code in node_modules:
            node_modules/gitbook-cli/node_modules/npm/node_modules/graceful-fs/polyfills.js

              >>> PUNT and DO THIS (this is how I got it working):
            - in MY case the problem code is found here:
              c:/dev/tw-themes/node_modules/npm/node_modules/graceful-fs/polyfills.js
              * comment out the lines 62-64:
                // KJB: HACK to fix STALE gitbook-cli (see: TOOLING.md)
                // fs.stat = statFix(fs.stat)
                // fs.fstat = statFix(fs.fstat)
                // fs.lstat = statFix(fs.lstat)
              * IT WORKS!

   - The docs server will crash when any docs files change.
     ... this was even happening when I developed my other project's docs.
     >>> JUST PUNT and live with this.
   ```

8. Follow customization suggestions found in [Integrating GitBook with
   JSDoc to Document Your Open Source Project].  

   Specifically:

   - Setup `docs/styles/website.css`
   - Disable livereload via "-livereload" option in "plugins" section of `book.json`
   - Disable social media sharing in toolbar via "-sharing" option in "plugins" section of `book.json`
   - Adding toolbar links to GitHub/NPM via "toolbar" plugin (configured in `book.json`).
     Don't forget to do your `$ npx gitbook install` to install the
     toolbar plugin referenced in `book.json`.

9. Install [`folding-menu`] GitBook plugin that "tames" large left-nav
   menus by visualizing one section at a time.

   - add following to `book.json`:

     **book.json**
     ```js
     {
       ...
       "plugins": [
         ... other plugins you may be using
         "folding-menu"
       ]
       ...
       "pluginsConfig": {
         "folding-menu":	{
           "animationDuration": 500,
           "sticky":            false
         }
       }
     }
     ```

     There appears to be a bug in the folding-menu plugin "sticky" setting,
     where it is NOT informed of a top-level page change when done via a
     link.  As a result I have disabled this option ("sticky": false).

   - install the new plugins

     ```
     $ npx gitbook install
     
         info: installing 2 plugins using npm@3.9.2 
         info: installing plugin "toolbar" 
         info: install plugin "toolbar" (*) from NPM with version 0.6.0 
         info: >> plugin "toolbar" installed with success 
         info:  
         info: installing plugin "folding-menu" 
         info: install plugin "folding-menu" (*) from NPM with version 1.0.1 
         info: >> plugin "folding-menu" installed with success 
     
     > NOT (OLD):
     $ npm install --save-dev gitbook-plugin-folding-menu
     ```

<!--- *** SUB-SECTION *************************************************************** --->
# Setup js.org sub-domain

To accommodate a more professional URL, [js.org] supports a
sub-domain registration process.

At the end of this process you should have:

- A github pages `js.org` sub-domain: 
  * FROM: https://kevinast.github.io/tw-themes/
  * TO:   https://tw-themes.js.org/

To accomplish this, simply follow the instructions on [js.org].  Here
is my summary _(more notes hidden here in comment form)_:

```
 - First setup a preliminary set of docs that are deployable to
   [GitHub Pages].  `js.org` requires "reasonable content" before
   they will approve your request.  Alternatively you can create
   some temporary content that shows your intent.


 - Create a CNAME file at gh-pages root.  In our case this will live
   in `docs/`:
   
   * docs/CNAME
     ==========
     tw-themes.js.org

   * Deploy your latest docs to [GitHub Pages]:

     ```
     $ npm run docs:publish
     ```

     NOTE: Once this is done, you will not be able to browse your gh-pages
           till js.org processes your PR (below).

 - Fork the `js.org` project and issue a PR to introduce our sub-domain
   * new entry in: cnames_active.js
     ... "tw-themes": "kevinast.github.io/tw-themes",

 - Monitor PR acceptance (will take 24 hrs).

 - Once complete the sub-domain should be active

   NOTE: the original gh-pages link to the new sub-domain
```

<!--- Comment out KJB Notes

****************
* setup js.org * ... can be done FIRST OR LAST
****************

  - either setup a preliminary set of docs -or- put a dummy page in place
    ... needed to be accepted by js.org

    * following temporary html file:
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
               ... YES: tw-themes.js.org
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





<!--- *** SUB-SECTION *************************************************************** --->
# Setup Lib Deployment

This task will setup the basic Node/NPM tooling needed to
package/build/deploy the **tw-themes** library.

At the end of this process you should have:

- The tooling needed to build/deploy the **tw-themes** utility.

- ?? more

??$$ retrofit

NOPE: **tw-themes** app is deployed on [GitHub Pages] <<< NOT

At the end of this process you should have:

- ?? retrofit

- The ability to deploy the demo app (to github pages)
  ```
  $ npm run lib:deploy
  ```

- Impacted Dependencies:
  ```
  gh-pages
  ```

- Impacted Scripts:
  ```
  lib:deploy
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

**Add `lib:deploy` Script**

Add the following scripts to `package.json`:

```
package.json
============
{
  ...
  "scripts": {
    "prelib:deploy": "npm run lib:prodBuild",
    "lib:deploy": "gh-pages --dist public --dest app",
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
          "prelib:deploy": "npm run lib:prodBuild",
          "lib:deploy": "gh-pages --dist public --dest app",
        - PUBLISH DOCS ?? NOW HANDLED IN: [Setup Docs Tooling]
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
              $ npm run lib:start
                ... http://localhost:3000/
            - in prod
              $ npm run lib:deploy
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
          

KJB Notes --->





<!--- *** LINKS ***************************************************************** --->

[NPM Scripts]:                    #npm-scripts
[Dependencies]:                   #dependencies
[Project Resources]:              #project-resources
[Project Setup]:                  #project-setup
  [Setup GitHub Project]:         #setup-github-project
  [Initialize NPM Project]:       #initialize-npm-project
  [Setup Unit Testing]:           #setup-unit-testing
  [Setup Docs Tooling]:           #setup-docs-tooling
  [Setup js.org sub-domain]:      #setup-jsorg-sub-domain
  [Setup Lib Deployment]:         #setup-lib-deployment

[js.org]:                         https://js.org/
[npm]:                            https://www.npmjs.com/
[Svelte]:                         https://svelte.dev/
[sveltejs/template]:              https://github.com/sveltejs/template
[sveltejs/component-template]:    https://github.com/sveltejs/component-template
[Tailwind CSS]:                   https://tailwindcss.com/

[GitHub Pages]:                   https://pages.github.com/

[GitBook]:                         https://docs.gitbook.com/
[GitBook command-line interface]:  https://www.npmjs.com/package/gitbook-cli
[Markdown]:                        https://en.wikipedia.org/wiki/Markdown
[Integrating GitBook with JSDoc to Document Your Open Source Project]: https://medium.com/@kevinast/integrate-gitbook-jsdoc-974be8df6fb3
[`folding-menu`]:                  https://github.com/KevinAst/gitbook-plugin-folding-menu
