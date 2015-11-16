Packages
---

- webpack
- babel-core 6 with es2015 presets
- react and react-dom 0.14.2
- flux 2.1.1
- mocha + chai + sinon

JS Structure
---

- `source/javascripts/entry.js` as the webpack entry file
- `source/javascripts/bundle.js` as the compiled js file
- `source/javascripts/flux` as the flux base dir
  - `actions`
  - `components`
  - `constants`
  - `stores`

Tests
---

test files are inside `tests/javascripts`
run tests with `npm test`

