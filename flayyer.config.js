// Created with create-flayyer-app@1.17.0

const {config} = require('@flayyer/flayyer-types');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLAYYER_KEY,
  deck: 'official',

  // Optionals
  name: 'Flayyer Official',
  description: 'Created with create-flayyer-app',
  homepage: 'https://flayyer.com',
  keywords: ['flayyer', 'react', 'tailwind'],
  marketplace: true,
  repository: 'https:/github.com/flayyer/flayyer-official',
  sizes: ['THUMBNAIL', 'BANNER', 'SQUARE', 'STORY']
});
