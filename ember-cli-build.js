'use strict';

const cjs = require('rollup-plugin-commonjs')
const md = require('rollup-plugin-md')
const replace = require('rollup-plugin-replace')
const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;

module.exports = function(defaults) {
  let app = new GlimmerApp(defaults, {
    rollup: {
      plugins: [
        cjs({
          include: /node_modules/
        }),
        md({
          marked: {}
        }),
        replace({
          "process.env.NODE_ENV": JSON.stringify(process.env.EMBER_ENV)
        })
      ]
    }
  });

  return app.toTree();
};
