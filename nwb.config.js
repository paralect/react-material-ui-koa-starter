const path = require('path');
const Dotenv = require('dotenv-webpack');

const envConfigPath = `./.env.${process.env.NODE_ENV}`;

module.exports = {
  type: 'react-app',
  webpack: {
    aliases: {
      src: path.resolve('src/'),
      services: path.resolve('src/services'),
      constants: path.resolve('src/constants'),
      hooks: path.resolve('src/hooks'),
      helpers: path.resolve('src/helpers'),
      resources: path.resolve('src/resources'),
      layouts: path.resolve('src/layouts'),
      pages: path.resolve('src/pages'),
      components: path.resolve('src/components'),
      styles: path.resolve('src/styles'),
    },
    extra: {
      plugins: [
        new Dotenv({
          path: path.resolve(envConfigPath),
          systemvars: true,
        }),
      ],
    },
  },
};
