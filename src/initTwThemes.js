import twColors        from 'tailwindcss/colors'; // ... peerDependency: tailwindcss
import check           from './util/check.js';
import {isArray,
        isBoolean,
        isPlainObject,
        isString}      from './util/typeCheck';

//***
//*** NOTE: see docs for complete and thorough descriptions!
//***


// the prefix of all CSS Variables - 'twt': tw-themes
const prefix = 'twt';

// the standard shades supported by tailwindcss colors out-of-the-box
const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

// parameter indicator to apply run-time defaults
const runtimeDefault = 'runtimeDefault';

//***
//*** + initTwThemes(schema, themes, [initialThemeName], [initialInvertShade]): TwThemes
//***
export default function initTwThemes(schema, themes, initialThemeName=runtimeDefault, initialInvertShade=false) {

  // carve out our "crucial" TwThemes object state
  // NOTE: all TwThemes object state begins with underbar (as a convention)
  const _schema = schema; // active schema ... alias to initTwThemes() param, making underbar state consistent
  const _themes = themes; // active themes ... ditto
  let _activeThemeName;   // active themeName   ... maintained by activateTheme()
  let _activeInvertShade; // active invertShade ... ditto

  // provide basic parameter validation
  // ... additional validation is applied when setup our value-added structures (below)
  const checkParam = check.prefix('initTwThemes() parameter violation: ');
  // ... schema
  checkParam(schema,          'schema is required');
  checkParam(isArray(schema), 'schema must be an array of strings (context color names)');
  // ... themes
  checkParam(themes,                'themes is required');
  checkParam(isPlainObject(themes), 'themes must be a JSON structure');


  // setup our value-added schema structure
  // ... applying additional validation
  // EX: 
  //     const _schemaStruct = {
  //       contextColor1: {
  //         multiColorViaShades: true,  // can be supplied by: 'red'
  //     //  singleColor:         false, // OPPOSITE (not used)
  //       },
  //       contextColor2: {
  //         multiColorViaShades: false, // can be supplied by: 'red-700', 'white', HANDLE '#ff52c3' (NOTE: tailwinds 'black'/'white' is inconsistent as it is a single color)
  //     //  singleColor:         true,  // OPPOSITE (not used)
  //       },
  //       ... snip snip
  //     };
  const _totalContextColors = schema.length;
  const _schemaStruct = schema.reduce( (accum, contextColor) => {

    if (isString(contextColor)) {     // a non-shaded single-color contextColor
      checkParam(!accum[contextColor], `schema contains duplicate contextColor: ${contextColor}`);
      accum[contextColor] = {
        multiColorViaShades: false,
      };
    }
    else if (isArray(contextColor)) { // a multi-color shaded contextColor
      checkParam(contextColor.length===1,   `schema element for shaded contextColor must be a single element "inner" array, NOT: ${contextColor.length} element(s) ... EX: ['primary', 'secondary', ['error']]`);
      checkParam(isString(contextColor[0]), `schema element for shaded contextColor must be a single element "inner" array of type string, NOT: ${contextColor[0]} ... EX: ['primary', 'secondary', ['error']]`);
      checkParam(!accum[contextColor[0]], `schema contains duplicate contextColor: ${contextColor[0]}`);
      accum[contextColor[0]] = {
        multiColorViaShades: true,
      };
    }
    else {
      checkParam(false, `invalid schema element: ${contextColor} ... expecting a string -or- a string wrapped in an "inner" array ... EX: ['primary', 'secondary', ['error']]`);
    }
    return accum;
  }, {}); // ... initial value

  // insure our schema has at least one context color
  checkParam(schema.length > 0, `schema must contain at least one context color`);

  // setup our value-added themes structure
  // ... applying additional validation
  // EX: 
  //     const _themesArr = [
  //       {
  //         themeName:     'emerald',  // ADDED: field added by US
  //         `clientProps`: `clientValues`,
  //         contextColors: {
  //           primary:   '#046307',    // EX 1: a single custom color via CSS
  //           secondary: 'coolGray',   // EX 2: multiple colors via: a shaded tailwind color
  //           error:     'red-500',    // EX 3: a single color via a tailwind color shade
  //         },
  //         resolvedRealColors: {      // ADDED: field/structure added by US
  //           primary: {               // EX 1: a single custom color via CSS
  //             customColor: "#ff52c3",
  //           },
  //           secondary: {             // EX 2: multiple colors via: a shaded tailwind color
  //             twColorName:  "red",
  //           },
  //           error: {                 // EX 3: a single color via a tailwind color shade
  //             twColorName:  "red",
  //             twColorShade: "200",   // ... ONLY supplied for a single shaded color (for black/white use "dummy-black-white" because it is NOT referenced in getRealTWColor())
  //           },
  //         },
  //       },
  //       {
  //         ... more themes
  //       },
  //     ];
  const _themesArr = Object.entries(themes).map( ([themeName, themeStruct]) => {
    const checkWithTheme = checkParam.prefix(`theme: '${themeName}' `);
    checkWithTheme(isPlainObject(themeStruct), `must reference a JSON structure`);
    themeStruct.themeName = themeName; // ADDED: field added by US
    checkWithTheme(themeStruct.contextColors,                `must contain a contextColors property`);
    checkWithTheme(isPlainObject(themeStruct.contextColors), `contextColors field must reference a JSON structure`);

    const resolvedRealColors = themeStruct.resolvedRealColors = {}; // ADDED: field/structure added by US
    
    // validate each contextColor entry in the contextColors structure
    let numContextColorsDefined = 0;
    Object.entries(themeStruct.contextColors).forEach( ([contextColor, realColor]) => {
      const checkWithContextColor = checkWithTheme.prefix(`contextColor: '${contextColor}' `);

      const realColorStruct = resolvedRealColors[contextColor] = {};

      // verify realColor is a string
      checkWithContextColor(isString(realColor), `must reference a string-based realColor`);
      const checkWithRealColor = checkWithContextColor.prefix(`realColor: '${realColor}' `);
      realColor = realColor.trim();

      // verify contextColor is defined in the schema
      checkWithRealColor(_schemaStruct[contextColor], `the contextColor is NOT defined in the schema`);
      numContextColorsDefined++;

      // interpret the realColor string (various syntaxes: 'red', 'red-400', '#ffd3b9')
      const [colorName, shade, tooManyDashes] = realColor.split('-');
      const checkWithInvalidRealColor = checkWithRealColor.prefix(`invalid realColor: `);

      // ... EX: 'red-500-ouch': invalid realColor - too many dashes
      if (tooManyDashes) {
        checkWithInvalidRealColor(false, `only a single suffix dash is supported (for a color shade)`);
      }

      // ... EX: 'red-400': a specific shade of a tailwind color
      else if (shade) {

        // verify the schema (context color) matches the shade/non-shade indicator (of this real color)
        checkWithInvalidRealColor(_schemaStruct[contextColor].multiColorViaShades===false, `references a single tailwind shaded color (with a dash -), but the schema requires a multi-color shaded context color (without a dash)`);

        // resolve the twColor/twColorShade to use
        const twColor = twColors[colorName];
        checkWithInvalidRealColor(twColor, `references an invalid tailwind color ... ${colorName} does NOT exist`);
        const twColorShade = twColor[shade];
        checkWithInvalidRealColor(twColorShade, `references an invalid tailwind color shade ... ${shade} does NOT exist`);

        // VALID: retain our run-time setting
        realColorStruct.twColorName  = colorName;
        realColorStruct.twColorShade = shade;
      }

      // ... EX: 'red'/'black'/'#ff52c3'
      else if (colorName) {
        // resolve the twColor to use
        const twColor = twColors[colorName];

        // ... EX: '#ff52c3': NOT a TW color
        if (!twColor) {
          // verify the schema (context color) matches the shade/non-shade indicator (of this real color)
          checkWithInvalidRealColor(_schemaStruct[contextColor].multiColorViaShades===false, `references a single CSS color: '${colorName}', but the schema requires a multi-color shaded context color (which can only be supplied by a tailwind color)`);

          // ASSUME a VALID CSS Color, and use as-is
          realColorStruct.customColor = colorName;
        }

        // ... EX: 'black': a special case 'black'/'white' a single color
        else if (isString(twColor)) {
          // verify the schema (context color) matches the shade/non-shade indicator (of this real color)
          checkWithInvalidRealColor(_schemaStruct[contextColor].multiColorViaShades===false, `references a single tailwind color (black/white), but the schema requires a multi-color shaded context color`);

          // VALID: retain our run-time setting
          realColorStruct.twColorName  = colorName;
          realColorStruct.twColorShade = 'dummy-black-white'; // triggers single color BUT NOT referenced in getRealTWColor() (because of special black/white logic)
        }
        // ... EX: 'red': a shaded tailwind color (or special case 'black'/'white' a single color)
        else {
          // verify the schema (context color) matches the shade/non-shade indicator (of this real color)
          checkWithInvalidRealColor(_schemaStruct[contextColor].multiColorViaShades===true, `references multiple tailwind shaded colors (without a dash -), but the schema requires a single-color non-shaded context color (with a dash)`);

          // VALID: retain our run-time setting
          realColorStruct.twColorName  = colorName;
        }
      }
      // ... EX: ''
      else {
        checkWithInvalidRealColor(false, `the realColor has NO content`);
      }

    }); // ... end of contextColors iteration

    // insure this contextColors section has definitions for all schema colors
    if (numContextColorsDefined !== schema.length) {
      // NOTE: we have already handled contextColor entries that are NOT defined in the schema (above)
      //       ... only thing left is missing contextColor entries (from the schema)
      const themeContextColors = Object.keys(themeStruct.contextColors);
      const missingContextColors = schema.filter( e => !themeContextColors.includes(e) );
      checkWithTheme(false, `theme is missing the following context color definitions: ${missingContextColors}`);
    }

    // add to our value-added themes array (via map())
    return themeStruct;

  }); // ... end of themes iteration

  // insure our themes have at least one theme
  checkParam(_themesArr.length > 0, `themes must contain at least one theme`);

  // validate initialThemeName parameter, applying run-time defaults (as needed)
  if (initialThemeName === runtimeDefault) {
    initialThemeName = _themesArr[0].themeName; // ... run-time default: first theme
  }
  checkParam(isString(initialThemeName), `initialThemeName (when supplied) must be a string`);
  checkParam(_themes[initialThemeName], `supplied initialThemeName: '${initialThemeName}' IS NOT defined in themes`);

  // validate initialInvertShade parameter
  checkParam(isBoolean(initialInvertShade), `initialInvertShade (when supplied) must be a boolean`);


  //***
  //***   INTERNAL Helper: interpret the real color of a single tailwind color reference (relative to our _activeInvertShade state)
  //*** - getRealTWColor(twColorName, [shade]) realColor
  //***

  function getRealTWColor(twColorName, shade='500') {

    // NOTE: Due to the pre-checks done in initTwThemes(), 
    //       there is NO need to check `twColors` error conditions
    //       ... this is a tightly controlled internal helper

    // resolve the twColor
    // ... will be one of the following:
    //     - '#000'/'#fff': the special TW single colors ('black'/'white' IS: '#000'/'#fff')
    //     - a TW JSON object wrapper of shaded colors: { '50': '#f9fafb', '100': '#f3f4f6', ... }
    // N/A - undefined: a CSS color reference <<< NOT in the context of our usage (see NOTE above)
    const twColor = twColors[twColorName];

    // the special TW single colors ('black'/'white' IS: '#000'/'#fff')
    // ... when used, we ignore shade
    const twSingleColor = isString(twColor) ? twColor : undefined;

    // when in `_activeInvertShade` state: invert the color shades
    if (_activeInvertShade) {
      // ... invert TW's single black/white color
      if (twSingleColor) {
        const realColor = invertTWSingleColors[twSingleColor];
        if (!realColor) {
          // UNEXPECTED: expecting to invert black/white, but there is something else in the mix
          //             ... just PUNT and return the un-inverted single color
          console.warn(`tw-themes: UNEXPECTED CONDITION in getRealTWColor(twColorName: '${twColorName}', shade: '${shade}) when inverting color ` + 
                       `... expecting to invert black/white, but there is apparently an additional tailwind single color in the mix ` +
                       '... PUNT and use the un-inverted single color');
          return twSingleColor;
        }
        return realColor;
      }
      else {
        // ... invert TW's shaded color
        const realColor = twColor[ invertTWColorShades[shade] ];
        return realColor;
      }
    }

    // when NOT in `_activeInvertShade` state: use the color as-is
    else {
      const realColor = twSingleColor || twColor[shade];
      return realColor;
    }
  }


  //***
  //*** register our app on-load to activate our initialThemeName/initialInvertShade
  //***
  
  // ... conditionally, when executing in browser container
  //     can also run in the Node build process via tailwind.config.js
  if (typeof window !== 'undefined') {
    // use `window.addEventListener()` vs. `window.onload = () => {`
    // ... more robust, allowing client app logic to register their own window.onload events
    window.addEventListener('load', (e) => {
      activateTheme({themeName: initialThemeName, invertShade: initialInvertShade});
    });
  }


  //***
  //*** + activateTheme({[themeName], [invertShade]}): [activeThemeName, activeInvertShade]
  //***

  function activateTheme(namedParams={}) {

    // validate parameters, applying run-time defaults (as needed)
    const checkParam = check.prefix('activateTheme() parameter violation: ');
    checkParam(isPlainObject(namedParams), `uses named parameters (check the API)`);
    let {themeName=runtimeDefault, invertShade=runtimeDefault, ...unknownNamedArgs} = namedParams;

    // ... themeName
    if (themeName === runtimeDefault) { // ... apply run-time default: currently active themeName
      themeName = _activeThemeName;
    }
    checkParam(isString(themeName), `themeName (when supplied) must be a string`);
    checkParam(_themes[themeName],  `supplied themeName: '${themeName}' IS NOT defined in themes`);
    // ... invertShade
    if (invertShade === runtimeDefault) { // ... apply run-time default: currently active invertShade setting
      invertShade = _activeInvertShade;
    }
    checkParam(isBoolean(invertShade), `invertShade (when supplied) must be a boolean`);
    // ... unrecognized named parameter
    const unknownArgKeys = Object.keys(unknownNamedArgs);
    checkParam(unknownArgKeys.length === 0,  `unrecognized named parameter(s): ${unknownArgKeys}`);
    // ... unrecognized positional parameter
    //     NOTE: when defaulting entire struct, arguments.length is 0
    checkParam(arguments.length <= 1, `unrecognized positional parameters (only named parameters may be specified) ... ${arguments.length} positional parameters were found`);

    // NO-OP if NO change has been requested
    if (themeName   === _activeThemeName &&
        invertShade === _activeInvertShade) {
      return [_activeThemeName, _activeInvertShade];
    }

    // retain the latest state
    _activeThemeName   = themeName;
    _activeInvertShade = invertShade; // IMPORTANT: set this prior to getRealTWColor() invocation (uses this setting)

    // process the request:
    // set the context-based CSS Vars to the real colors defined by the active theme

    const theme = _themes[themeName];  // ... our current active theme
    const style = document.body.style; // ... our document's <body> in-line style (used to set CSS Vars)

    // ... apply changes to our CSS VARS
    Object.entries(theme.resolvedRealColors).forEach( ([contextColorName, realColorStruct]) => {

      // for a "real" CSS customColor: use as-is: a non-shaded single color where inversion is NOT supported
      if (realColorStruct.customColor) {
        style.setProperty(`--${prefix}-${contextColorName}`, realColorStruct.customColor);
      }

      // for a "real" tailwind single color (where shade is provided): promote that single color SUPPORTING inversion
      else if (realColorStruct.twColorShade) {
        style.setProperty(`--${prefix}-${contextColorName}`, getRealTWColor(realColorStruct.twColorName, realColorStruct.twColorShade));
      }

      // for a "real" tailwind multi-color color (where NO shade is provided): promote multi-colors via shade SUPPORTING inversion
      else {
        // ... the DEFAULT ('500' shade)
        style.setProperty(`--${prefix}-${contextColorName}`, getRealTWColor(realColorStruct.twColorName));
        // ... all shades
        shades.forEach( (shade) => {
          style.setProperty(`--${prefix}-${contextColorName}-${shade}`, getRealTWColor(realColorStruct.twColorName, shade));
        });
      }
    });

    // that's all folks :-)
    return [_activeThemeName, _activeInvertShade];
  }


  //***
  //*** + activateNextTheme(): activeThemeName
  //***

  function activateNextTheme() {
    const activeThemeIndx = _themesArr.findIndex( (theme) => theme.themeName === _activeThemeName );

    // advance to the next theme (wrapping at end)
    const nextThemeIndx = (activeThemeIndx+1) % _themesArr.length;
    const nextThemeName = _themesArr[nextThemeIndx].themeName;
    activateTheme({themeName: nextThemeName});

    // beam me up Scotty :-)
    return _activeThemeName; // ... our state has now been updated (via activateTheme())
  }


  //***
  //*** + activatePriorTheme(): activeThemeName
  //***

  function activatePriorTheme() {
    const activeThemeIndx = _themesArr.findIndex( (theme) => theme.themeName === _activeThemeName );

    // advance to the prior theme (wrapping at start)
    const priorThemeIndx = activeThemeIndx===0 ? _themesArr.length-1 : activeThemeIndx-1;
    const priorThemeName = _themesArr[priorThemeIndx].themeName;
    activateTheme({themeName: priorThemeName});

    // beam me up Scotty :-)
    return _activeThemeName; // ... our state has now been updated (via activateTheme())
  }


  //***
  //*** + toggleInvertShade(): activeInvertShade
  //***

  function toggleInvertShade() {
    activateTheme({invertShade: !_activeInvertShade});

    // that was easy :-)
    return _activeInvertShade; // ... our state has now been updated (via activateTheme())
  }


  //***
  //*** + getThemes(): Theme[]
  //***

  function getThemes() {
    // dohhh ...
    return _themesArr;
  }


  //***
  //*** + getActiveThemeName(): activeThemeName
  //***

  function getActiveThemeName() {
    // this is too easy ...
    // ... conditional resolves app-initialization window.onload race condition
    return _activeThemeName===undefined ? initialThemeName : _activeThemeName;
  }


  //***
  //*** + getActiveInvertShade(): activeInvertShade
  //***

  function getActiveInvertShade() {
    // need I say more ...
    // ... conditional resolves app-initialization window.onload race condition
    return _activeInvertShade===undefined ? initialInvertShade : _activeInvertShade;
  }


  //***
  //*** + colorConfig(): TwColors
  //***

  function colorConfig() {
    // generate our JSON color structure ... see: TwColors in docs
    const colors = {};
    _schema.forEach( (contextColorRef) => {
      const contextColorName   = isString(contextColorRef) ? contextColorRef : contextColorRef[0];
      const contextColorStruct = _schemaStruct[contextColorName];

      // for multi-color shaded contextColor ... inject all supported shades
      if (contextColorStruct.multiColorViaShades) {
        const colorNode = colors[contextColorName] = {
          DEFAULT: `var(--${prefix}-${contextColorName})`, // color default
        };
        shades.forEach( (shade) => { // color shades
          colorNode[shade] = `var(--${prefix}-${contextColorName}-${shade})`;
        });
      }
      // for a single-color contextColor ... inject a single color
      else {
        colors[contextColorName] = `var(--${prefix}-${contextColorName})`; // the single color
      }
    });
    
    // that's all folks :-)
    return colors;
  }


  //***
  //*** end of initTwThemes()
  //***

  // that's all folks :-)
  // ... return our TwThemes object, from which from which all remaining functionality is promoted :-)
  return {
    activateTheme,
    activateNextTheme,
    activatePriorTheme,
    toggleInvertShade,
    getThemes,
    getActiveThemeName,
    getActiveInvertShade,
    colorConfig,
  };

} // ... end of: initTwThemes()



//***
//*** helper tables
//***

// color inverter table for tailwind color shades
const invertTWColorShades = {
  "50":  "900", // use a "close" entry (we don't have a corresponding entry for 50)
  "100": "900", 
  "200": "800", 
  "300": "700", 
  "400": "600", 
  "500": "500", 
  "600": "400", 
  "700": "500", 
  "800": "600", 
  "900": "100",
};

// color inverter table for tailwind's special single colors ('black'/'white' IS: '#000'/'#fff')
const invertTWSingleColors = {
  [twColors.black]: twColors.white,
  [twColors.white]: twColors.black,
}
