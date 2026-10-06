# Avatar and role-glyph rules

Load this reference only when a wireframe contains avatars or role indicators.
Use project tokens and component sizes when established. Otherwise keep a small,
consistent size set for the current artifact rather than inventing a new size on
each screen.

## Geometry

For a circular avatar with center `(cx, cy)` and radius `r`:

- center initials with `x="cx"`, `y="cy"`, `text-anchor="middle"`, and
  `dominant-baseline="central"`;
- place any explanatory role label outside the colored circle, centered below it;
- use one gap formula across the set, such as `cy + r + font_size + 4`;
- keep adjacent avatar groups far enough apart that their external labels do not
  overlap;
- check glyph and label bounds after rendering, because text metrics vary by
  platform.

```xml
<g class="avatar" transform="translate(24 24)">
  <circle cx="24" cy="24" r="24" fill="<role-fill>" stroke="<role-stroke>" />
  <text x="24" y="24" text-anchor="middle" dominant-baseline="central">AB</text>
  <text x="24" y="64" text-anchor="middle" class="avatar-label"><Role></text>
</g>
```

Escape the placeholder angle brackets before using the snippet as XML.

## Content and color

- Use a person's initials only when a named user is genuinely visible in the
  screen. Use a short role glyph or neutral placeholder for role-level frames.
- Keep human-readable role text outside the circle. Do not encode several roles
  as split colors in one avatar; use separate indicators or an evidenced combined
  role label.
- Use the project's role tokens when they exist. Otherwise choose distinct,
  contrast-safe fills and add a textual label; color alone never communicates
  role or permission.
- A system actor may use a neutral system glyph. An unknown identity remains
  visibly unknown and is also recorded as a documentation gap.

## Validation

Check consistent diameter, initial font size, center alignment, label position,
role naming, token use, and contrast across every in-scope frame. Real customer
names or images must not be invented to make a wireframe look realistic.
