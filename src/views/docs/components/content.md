# Components

#### [Overview](/app/components)

[https://next.material-ui.com/customization/theme-components/#global-style-overrides](https://next.material-ui.com/customization/theme-components/#global-style-overrides)

---

Overrides the components of the Material UI in the directory `src/theme/overrides`

```sh
overrides/
  ├── Accordion
  ├── Alert
  ├── Autocomplete
  ├── Avatar
  ├── Backdrop
  ├── ...
...
```

If you customize in file `overrides/Accordion`
you can match with [/app/components/accordion](/app/components/accordion) to see the change.

if you customize in file `overrides/Alert`
you can match with [/app/components/alert](/app/components/alert) to see the change.

> The change will apply globally.

> This helps you to deeply customize your style, to suit your design.

---

### Extending components

**Components extend based on Material-UI.**

Inside the folder `src/components/@material-extend` you can add and edit more components based on Material-UI.

**Example:**

```jsx
<Button variant="contained" color="inherit">Default</Button>
<Button variant="contained">Primary</Button>
<MButton variant="contained" color="info">Info</MButton>
<MButton variant="contained" color="success">Success</MButton>
<MButton variant="contained" color="warning">Warning </MButton>
<MButton variant="contained" color="error">Error </MButton>
```

![img](/static/docs/button.jpg)

**Currently support for the following components:**

- [Avatar](https://minimals.cc/app/components/avatars)
- [Badge](https://minimals.cc/app/components/badges)
- [Breadcrumbs](https://minimals.cc/app/components/breadcrumbs)
- [Buttons](https://minimals.cc/app/components/buttons)
- [Chip](https://minimals.cc/app/components/chips)
- [Progress](https://minimals.cc/app/components/progress)
- [Selection Controls](https://minimals.cc/app/components/selection-controls)
- [Timeline](https://minimals.cc/app/components/timeline)

All have checks with **PropTypes**:

```js
function Buttons() {
  return;
  <>
    <MButton variant="contained" color="secondary">
      Info
    </MButton>
    <MButton variant="contained" color="info">
      Info
    </MButton>
    <MButton variant="contained" color="error">
      Info
    </MButton>
    ...
  </>;
}

MButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'white'
  ]),
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string
  ])
};
```
