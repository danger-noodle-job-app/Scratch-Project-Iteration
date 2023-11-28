// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { modules: 'auto', targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
