# Color Systems

In consideration of defining your application's
{{book.guide.contextColors}}, there are a number of **Color System**
design philosophies that provide insight on this topic.

This is a rather large topic.  You can choose to follow one of these
designs, or simply derive your own.  Regardless, it is worth a quick
review, to get a better feel for some of the concepts.

<!--- ARTICLE NOT REFERENCED:
Designing Systematic Colors <<< PROB NOT REFERENCE
... https://uxplanet.org/designing-systematic-colors-b5d2605b15c
 ---> 

I do not claim to be an expert on this topic.  However a quick web
search reveals a few **Color Systems**:

- {{book.ext.Material}}
- {{book.ext.IBM}}
- {{book.ext.OpenColor}}

<!--- Material General Desc: https://material.io/archive/guidelines/style/color.html#color-color-system ---> 

I am most familiar with Material, where they define:

- Primary Color:
      
  A primary color is the color displayed most frequently across your
  app’s screens and components. It can also be used to accent
  elements, if you don’t have a secondary color.
  
  To create contrast between elements, you can use lighter or darker
  tones of your primary color. The contrast between lighter and darker
  tones helps show division between surfaces, such as between the
  status bar and a toolbar.
  
- Secondary Color
  
  A secondary color is used to accent select parts of your UI. It can
  be complementary or analogous to your primary color, but it should
  not simply be a light or dark variation of your primary color. It
  should contrast with elements that surround it and be applied
  sparingly as an accent.
  
  Secondary colors are best used for:
  
  - Buttons, floating action buttons, and button text
  - Text fields, cursors, and text selection
  - Progress bars
  - Selection controls, buttons, and sliders
  - Links
  - Headlines
  
  Using a secondary color is optional. It’s not necessary if you use
  variations of your primary color to accent elements.

**Color Tools**

<!--- Material UI Playground: https://material-ui.com/customization/color/#official-color-tool ---> 
<!--- Material IO Playground: https://material.io/resources/color ---> 

You can find find a number of interactive tools that will assist you
in getting started.  This will help define the {{book.guide.contextColor}}
structure you wish to use.

As an example, the {{book.ext.MaterialIOColorConfigTool}} is a sandbox
playground that allows you to interact with various colors and see how
they look in various scenarios.  Once you are happy with your color
selection, you can simply translate your chosen colors to "close"
colors in the **tailwind** color pallet.

**Accent Colors**

Ever wondered how designers find the perfect color combinations?  Well
there is a formula for that!  It uses a color wheel invented by Isaac
Newton in 1666!

There are several color combinations that you can use, to ensure your
colors are in harmony ... read all about it here: {{book.ext.ColorTheory}}.

You can use a {{book.ext.ColorCalculator}} to assist in the process.  Simply
seed it with one of **tailwind**'s base colors, calculate your accent
color, and translate it back to a "close" **tailwind** color ...
**Easy Peasy**!
