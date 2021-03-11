import initTwThemes from '../initTwThemes';  // module under test

describe('initTwThemes() ERRORS', () => {

  describe('initTwThemes() Schema Issues', () => {

    test('schema required', () => {
      expect( () => initTwThemes() )
        .toThrow(/schema is required/);
      // THROW: initTwThemes() parameter violation: schema is required
    });

    test('basic schema type', () => {
      expect( () => initTwThemes("bad schema type") )
        .toThrow(/schema must be an array of strings/);
      // THROW: initTwThemes() parameter violation: schema must be an array of strings (context color names)
    });

    test('Empty schema', () => {
      expect( () => initTwThemes([], {}) )
        .toThrow(/schema must contain at least one context color/);
      // THROW: initTwThemes() parameter violation: schema must contain at least one context color
    });

    test('bad schema element', () => {
      expect( () => initTwThemes([123], {}) )
        .toThrow(/invalid schema element.*expecting a string.*string wrapped/);
      // THROW: initTwThemes() parameter violation: invalid schema element: 123 ... expecting a string -or- a string wrapped in an \"inner\" array ... EX: ['primary', 'secondary', ['error']]
    });

    test('bad schema shaded ContextColor', () => {
      expect( () => initTwThemes(['context1', ['context2','2nd elm bad']], {}) )
        .toThrow(/shaded contextColor must be a single element/);
      // THROW: initTwThemes() parameter violation: schema element for shaded contextColor must be a single element \"inner\" array, NOT: 2 element(s) ... EX: ['primary', 'secondary', ['error']]
    });

    test('bad schema shaded ContextColor type', () => {
      expect( () => initTwThemes(['context1', [123]], {}) )
        .toThrow(/shaded contextColor must be a single element.*array of type string/);
      // THROW: initTwThemes() parameter violation: schema element for shaded contextColor must be a single element \"inner\" array of type string, NOT: 123 ... EX: ['primary', 'secondary', ['error']]
    });

    test('duplicate schema ContextColor', () => {
      expect( () => initTwThemes(['context1', 'context1'], {myTheme: {contextColors: {context1: 'red-100'}}}) )
        .toThrow(/schema contains duplicate contextColor.*context1/);
      // THROW: initTwThemes() parameter violation: schema contains duplicate contextColor: context1"
    });

    test('duplicate schema ContextColor multi-color', () => {
      expect( () => initTwThemes(['context1', ['context1']], {myTheme: {contextColors: {context1: 'red-100'}}}) )
        .toThrow(/schema contains duplicate contextColor.*context1/);
      // THROW: initTwThemes() parameter violation: schema contains duplicate contextColor: context1"
    });
  });

  describe('initTwThemes() Themes Issues', () => {

    test('themes required', () => {
      expect( () => initTwThemes(['primary']) )
        .toThrow(/themes is required/);
      // THROW: initTwThemes() parameter violation: themes is required
    });

    test('basic themes type', () => {
      expect( () => initTwThemes(['primary'], 'bad themes type') )
        .toThrow(/themes must be a JSON structure/);
      // THROW: initTwThemes() parameter violation: themes must be a JSON structure
    });

    test('empty themes', () => {
      expect( () => initTwThemes(['primary'], {}) )
        .toThrow(/themes must contain at least one theme/);
      // THROW: initTwThemes() parameter violation: themes must contain at least one theme
    });

  });

  describe('initTwThemes() Individual Theme Issues', () => {

    test('basic theme type', () => {
      expect( () => initTwThemes(['primary'], {myTheme: 'bad theme type'}) )
        .toThrow(/theme:.*myTheme.*must reference a JSON structure/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' must reference a JSON structure
    });

    test('theme missing contextColors', () => {
      expect( () => initTwThemes(['primary'], {myTheme: {}}) )
        .toThrow(/theme:.*myTheme.*must contain a contextColors property/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' must contain a contextColors property
    });

    test('themes contextColors bad type', () => {
      expect( () => initTwThemes(['primary'], {myTheme: {contextColors: 'not a JSON struct'}}) )
        .toThrow(/theme:.*myTheme.*contextColors field must reference a JSON structure/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' contextColors field must reference a JSON structure
    });

    test('themes contextColors bad realColor type', () => {
      expect( () => initTwThemes(['primary'], {myTheme: {contextColors: {primary: 123}}}) )
        .toThrow(/theme:.*myTheme.*contextColor:.*primary.*must reference a string-based realColor/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' contextColor: 'primary' must reference a string-based realColor
    });

    test('themes contextColor miss-match to schema', () => {
      expect( () => initTwThemes(['primary'], {myTheme: {contextColors: {dillWeed: 'realColor'}}}) )
        .toThrow(/theme:.*myTheme.*contextColor:.*dillWeed.*realColor:.*realColor.*the contextColor is NOT defined in the schema/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' contextColor: 'dillWeed' realColor: 'realColor' the contextColor is NOT defined in the schema
    });

    test('themes realColor too many dashes', () => {
      expect( () => initTwThemes(['primary'], {myTheme: {contextColors: {primary: 'too-many-dashes'}}}) )
        .toThrow(/theme:.*myTheme.*contextColor:.*primary.*realColor:.*too-many-dashes.*invalid realColor: only a single suffix dash is supported.*for a color shade/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' contextColor: 'primary' realColor: 'too-many-dashes' invalid realColor: only a single suffix dash is supported (for a color shade)
    });

    test('themes realColor should reference multi-color', () => {
      expect( () => initTwThemes([['primary']], {myTheme: {contextColors: {primary: 'red-100'}}}) )
        .toThrow(/theme:.*myTheme.*contextColor:.*primary.*realColor:.*red-100.*invalid realColor:.*references a single tailwind shaded color.*schema requires a multi-color/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' contextColor: 'primary' realColor: 'red-100' invalid realColor: 
      //        references a single tailwind shaded color (with a dash -), 
      //        but the schema requires a multi-color shaded context color (without a dash)
    });

    test('themes realColor references invalid tailwind color', () => {
      expect( () => initTwThemes(['primary'], {myTheme: {contextColors: {primary: 'bad-100'}}}) )
        .toThrow(/theme:.*myTheme.*contextColor:.*primary.*realColor:.*bad-100.*invalid realColor:.*references an invalid tailwind color/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' contextColor: 'primary' realColor: 'bad-100' invalid realColor: 
      //        references an invalid tailwind color ... bad does NOT exist"
    });

    test('themes realColor references invalid tailwind color shade', () => {
      expect( () => initTwThemes(['primary'], {myTheme: {contextColors: {primary: 'red-123'}}}) )
        .toThrow(/theme:.*myTheme.*contextColor:.*primary.*realColor:.*red-123.*invalid realColor:.*references an invalid tailwind color shade.*123 does NOT exist/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' contextColor: 'primary' realColor: 'red-123' invalid realColor: 
      //        references an invalid tailwind color shade ... 123 does NOT exist
    });

    test('themes realColor references single CSS color but requires multi-shaded tailwind color', () => {
      expect( () => initTwThemes([['primary']], {myTheme: {contextColors: {primary: '#ff33b2'}}}) )
        .toThrow(/theme:.*myTheme.*contextColor:.*primary.*realColor:.*#ff33b2.*invalid realColor:.*references a single CSS color.*#ff33b2.*schema requires a multi-color shaded context color.*supplied by a tailwind/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' contextColor: 'primary' realColor: '#ff33b2' invalid realColor: 
      //        references a single CSS color: '#ff33b2', but the schema requires a multi-color shaded context color (which can only be supplied by a tailwind color)
    });

    test('themes realColor references single tailwind color (black/white) but requires multi-shaded tailwind color', () => {
      expect( () => initTwThemes([['primary']], {myTheme: {contextColors: {primary: 'black'}}}) )
        .toThrow(/theme:.*myTheme.*contextColor:.*primary.*realColor:.*black.*invalid realColor:.*references a single tailwind color.*black.*white.*but the schema requires a multi-color shaded context color/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' contextColor: 'primary' realColor: 'black' invalid realColor: 
      //        references a single tailwind color (black/white), but the schema requires a multi-color shaded context color
    });

    test('themes realColor references multi-shaded tailwind color (without a dash) but requires single-color', () => {
      expect( () => initTwThemes(['primary'], {myTheme: {contextColors: {primary: 'red'}}}) )
        .toThrow(/theme:.*myTheme.*contextColor:.*primary.*realColor:.*red.*invalid realColor:.*references multiple tailwind shaded colors.*schema requires a single-color/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' contextColor: 'primary' realColor: 'red' invalid realColor: 
      //        references multiple tailwind shaded colors (without a dash -), but the schema requires a single-color non-shaded context color (with a dash)
    });

    test('no content realColor', () => {
      expect( () => initTwThemes(['primary'], {myTheme: {contextColors: {primary: ' '}}}) )
        .toThrow(/theme:.*myTheme.*contextColor:.*primary.*realColor:.*the realColor has NO content/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' contextColor: 'primary' realColor: '' invalid realColor: the realColor has NO content
    });

    test('missing context colors', () => {
      expect( () => initTwThemes(['primary', 'secondary', 'dillweed'], {myTheme: {contextColors: {primary: 'red-100'}}}) )
        .toThrow(/theme:.*myTheme.*missing the following context color definitions.*secondary.*dillweed/);
      // THROW: initTwThemes() parameter violation: theme: 'myTheme' theme is missing the following context color definitions: secondary,dillweed
    });

  });

  describe('initTwThemes() initial param issues', () => {

    test('initialThemeName NOT string', () => {
      expect( () => initTwThemes(['primary'], { myTheme: { contextColors: { primary: '#ffb2c3' } } }, 123))
        .toThrow(/initialThemeName.*when supplied.*must be a string/);
      // THROW: initTwThemes() parameter violation: initialThemeName (when supplied) must be a string
    });

    test('initialThemeName NOT in themes', () => {
      expect( () => initTwThemes(['primary'], { myTheme: { contextColors: { primary: '#ffb2c3' } } }, 'DillWeed'))
        .toThrow(/initialThemeName.*DillWeed.*IS NOT defined in themes/);
      // THROW: initTwThemes() parameter violation: supplied initialThemeName: 'DillWeed' IS NOT defined in themes
    });

    test('initialInvertShade NOT boolean', () => {
      expect( () => initTwThemes(['primary'], { myTheme: { contextColors: { primary: '#ffb2c3' } } }, 'myTheme', 123))
        .toThrow(/initialInvertShade.*when supplied.*must be a boolean/);
      // THROW: initTwThemes() parameter violation: initialInvertShade (when supplied) must be a boolean
    });

  });


  describe('TwThemes.activateTheme() issues', () => {

    const TwThemes = initTwThemes(['primary'], { myTheme: { contextColors: { primary: '#ffb2c3' } } });

    test('themeName NOT string', () => {
      expect( () => TwThemes.activateTheme({themeName:123}))
        .toThrow(/themeName.*when supplied.*must be a string/);
      // THROW: activateTheme() parameter violation: themeName (when supplied) must be a string
    });

    test('themeName NOT in themes', () => {
      expect( () => TwThemes.activateTheme({themeName: 'DillWeed'}))
        .toThrow(/supplied themeName.*DillWeed.*IS NOT defined in themes/);
      // THROW: activateTheme() parameter violation: supplied themeName: 'DillWeed' IS NOT defined in themes
    });

    test('invertShade NOT boolean', () => {
      expect( () => TwThemes.activateTheme({themeName: 'myTheme', invertShade: 123}))
        .toThrow(/invertShade.*when supplied.*must be a boolean/);
      // THROW: activateTheme() parameter violation: invertShade (when supplied) must be a boolean
    });

    test('unrecognized named parameter', () => {
      expect( () => TwThemes.activateTheme({themeName: 'myTheme', invertShade: true, oops: 'bad param', doodle: 'another bad param'}))
        .toThrow(/unrecognized named parameter.*oops.*doodle/);
      // THROW: activateTheme() parameter violation: unrecognized named parameter(s): oops,doodle
    });

    test('bad positional parameter', () => {
      expect( () => TwThemes.activateTheme({themeName: 'myTheme', invertShade: true}, 123))
        .toThrow(/unrecognized positional parameter.*only named parameters may be specified.*2 positional parameters were found/);
      // THROW: activateTheme() parameter violation: unrecognized positional parameters (only named parameters may be specified) ... 2 positional parameters were found"
    });

    test('bad named parameters', () => {
      expect( () => TwThemes.activateTheme(123))
        .toThrow(/uses named parameters/);
      // THROW: activateTheme() parameter violation: uses named parameters (check the API)
    });

  });

});
