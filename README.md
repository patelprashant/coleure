Choosing a colour with ease
===========================

**Coleure** is a color picker that combines a curated colors stack (inspired by PANTONE®) with the simple of use:

- Clicking on a color adds it to the palette (and displays the second).
- Pressing `host+c` copies the color to the clipboard.

Features
--------

### Formats & outputs

It is possible to choose (by pressing `f`) between 3 formats in Coleure:

- **HEX:** Default.
  - Outputs: `#ffffff`, `ffffff`, `0xffffff`
- **RGB:**
  - Outputs: `rgba(255, 255, 255, 1)`, `rgb(255, 255, 255)`, `255, 255, 255`
- **HSL:**
  - Outputs: `hsla(360, 100%, 100%, 1)`, `hsl(360, 100%, 100%)`, `360, 100%, 100%`

Outputs can be changed by pressing `t`.

### Palette

Clicking on a color adds it to the palette, which will appear by doing so or pressing `e`.

The palette does not have a limit, which is a feature either.

Click on a color inside the palette for remove it.

### Responsive layout

There's no need to use Coleure as a normal web-app. It is a color picker in the end. Coloure will work the best way possible in any window size.

#### Handled multi-touch devices

Since Coleure is designed to be used while working and relies totally on shortcuts the responsive layout will behave differently for gadgets like the iPad or iPhone.

### Coleure. Stores. Everything.

- The exact position where you scrolled to.
- The colors you've added to the palette.
- The chosen format.
- The chosen output for each format.
- The appearance of the palette if you shown it before.

And it will be doing that for every future feature (if any).

Running Coleure
--------

Open `app/index.html`. The `config.ru` file is only used for production under Heroku. You really don't need Ruby nor Rack in order to run Coleure.