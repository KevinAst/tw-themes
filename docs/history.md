# Revision History

The **tw-themes** project adheres to [Semantic
Versioning](http://semver.org/).  Each release is documented on this
page and contains migration instructions _(as needed)_.

<!-- 

*-----------------------------------------------
* Adorn bullets with following bolded prefix
*-----------------------------------------------

**Added**:      ... for new features
**Changed**:    ... for changes in existing functionality
**Deprecated**: ... for soon-to-be removed features
**Removed**:    ... for now removed features
**Fixed**:      ... for any bug fixes
**Enhanced**:   ... for enhancements
**Security**:   ... in case of vulnerabilities
**Docs**:       ... changes in documentation
**Review**:     ... requires review
**Internal**:   ... internal change NOT affecting user/client

*-----------------------------------------------
* PROCEDURE for maintaining LINKS in history.md
*-----------------------------------------------

1. for latest running work-in-progress: it is OK to use the gitbook templates
   - EX:       bla bla {{book.api.aFunction}}
   - template: bla bla [`aFunction()`](/api.md#aFunction)
   - gens:     bla bla <a href="api.html#aFunction"><code>aFunction()</code></a>
   - NOTES:
     a) clicking link STAYS ON SAME PAGE (as for all links of this type)

   KJB: N/A I THINK (for non-versioned docs) ... IF SO (once I release) NIX THIS COMMENT 
2. for RELEASE: expand them in-line using a VERSION RELATIVE SYNTAX -AND- change .md to .html:
   - EX:       bla bla [`aFunction()`](../v.v.v/api.html#aFunction)
               NOTES:
                - start with template definition
                - pre-pend ../v.v.v/
                - change .md to .html (BECAUSE WE ARE TAKING the generation process out-of-the-picture)
   - gens:     bla bla <a href="../v.v.v/api.html#aFunction"><code>aFunction()</code></a>
   - NOTES:
     a) clicking link STAYS ON SAME PAGE
     b) because these notes are copied to all release history.md, 
        they MUST reference the appropriate version
        so they will be guaranteed the reference has not been removed/changed
 
   KJB: N/A I THINK (for non-versioned docs) ... IF SO (once I release) NIX THIS COMMENT 
3. for GITHUB release page (when copying these notes), fully qualify the VERSIONED relative references
   - EX:       bla bla [`aFunction()`](https://tw-themes.js.org/v.v.v/api.html#aFunction)
               NOTES:
                - from prior rendition
                - REPLACE ../v.v.v WITH https://tw-themes.js.org/v.v.v
                - change .md TO .html
   - NOTES:
     a) this allows it to stand alone (in the external github page)
     b) because these notes reference a versioned site
        they will be guaranteed the reference has not been removed/changed

   KJB: CONSIDER THIS INSTEAD
3. for GITHUB release page, 
   - DECIDE if I want to copy these notes,
   - OR simply reference the web-version of this release notes

-->


## Summary:

Release           | What                 | *When*
------------------|----------------------|------------------
[v0.1.1](#v0_1_1) | Finalize Tooling     | *March 19, 2021*
[v0.1.0](#v0_1_0) | Initial Release      | *March 17, 2021*


## Details:

<!-- ************************************************************* -->
<br/>
<h3 id="v0_1_1" style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  v0.1.1 - Finalize Tooling <i>(March 19, 2021)</i>
</h3>

[GitHub Release](https://github.com/KevinAst/tw-themes/releases/tag/v0.1.1)
&bull;
[GitHub Content](https://github.com/KevinAst/tw-themes/tree/v0.1.1)
&bull;
[Diff](https://github.com/KevinAst/tw-themes/compare/v0.1.0...v0.1.1)

**NOTE**: This release is a **non-breaking change** _(i.e. no API was affected)_.

1. **Docs**: The {{book.guide.seeItLive}} section was introduced.

1. **Docs**: An improved **tw-themes** logo was introduced.

1. **Internal**: Project tooling was finalized.

   - The following sections were added to TOOLING.md:
     * "Setup Lib Packaging"
     * "Deploy Project"
     * "Setup New Feature Branch"

   - Devised a MUCH IMPROVED work-around for the docs:server npm script.

   - Remove unit test modules from deployment bundle
     _(by moving `.npmignore` into `src/` directory)_.



<!-- ************************************************************* -->
<br/>
<h3 id="v0_1_0" style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  v0.1.0 - Initial Release <i>(March 17, 2021)</i>
</h3>

[GitHub Release](https://github.com/KevinAst/tw-themes/releases/tag/v0.1.0)
&bull;
[GitHub Content](https://github.com/KevinAst/tw-themes/tree/v0.1.0)

**This is where it all began ...**

1. Holy Guacamole Batman! ... _This commit has no parents!!_
