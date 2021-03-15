<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
Schema
</h5>

A `Schema` defines the {{book.guide.contextColors}} that are used in
your application (i.e. referenced in your markup).  A `Schema` is one
of two essential parameters supplied to {{book.api.initTwThemes}}
_(the other is {{book.api.Themes}})_.

To fully understand this topic, please refer to discussions on
{{book.guide.contextColors}} and {{book.guide.contextColorShades}}.

**Structure:**

In it's simplest form, a `Schema` is merely an array of context color
names.

```js
['primaryLight', 'primary', 'primaryDark', 'secondary', 'onLight', 'onDark']
```

This example specifies six single context colors that can be used in
your application.

- As a result, your markup may reference colors such as:
  `bg-primaryDark`, `text-onDark`, etc.

- **NOTE:** your {{book.api.Theme}} may seed these colors with either
  **a tailwind** color shade _(e.g. `'gray-100'`)_, or a custom color
  **_(e.g. `'#E4E4E7'`)_.


> **tailwind's numeric shade scale**:
> 
> If you wish to use **tailwind**'s numeric shade scale in your context
> color, simply wrap the schema's color string in an "inner" array (a
> single element array):
> 
> ```js
> ['primaryLight', 'primary', 'primaryDark', 'secondary', 'onLight', 'onDark', ['error']]
> ```
> 
> This example adds an `error` context color which automatically uses
> the **tailwind** numeric shade scale.
> 
> - As a result your markup can specify _(for example)_ `bg-error` or
>   `bg-error-400` _(**NOTE:** the `error` color reference defaults to the `500`
>   shade)_.
> 
> - **NOTE:** your {{book.api.Theme}} must **must** seed this `error` color with a
>   **tailwind** color that is _shadable_ _(e.g. `'red'`)_.

**Note on Shade Inversion**: 

Regardless of whether you use **tailwind**'s numeric shade scale _or
not_, you may still invert the shades of either approach, providing
the {{book.api.Theme}} is seeding this with **tailwind** colors.  In
other words, custom colors cannot be shade inverted.

For more information and **Best Practices**, please refer to the
discussions on {{book.guide.contextColors}} and
{{book.guide.contextColorShades}}.
