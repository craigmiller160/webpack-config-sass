# webpack-config-sass

A webpack addon configuration with support for SASS/SCSS.

## How to Use

Install this library with `yarn add --dev @craigmiller160/webpack-config-sass`. Then setup the `webpack.config.js` file in the root of your project like this:

```javascript
const { merge } = require('webpack-merge');
const sassConfig = require('@craigmiller160/webpack-config-sass');

module.exports = merge([sassConfig, otherConfig1, otherConfig2]);
```
