// Created with create-flyyer-app@1.17.0

const {config} = require('@flyyer/types');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLYYER_KEY,
  deck: 'official',

  // Optionals
  name: 'Flyyer Official',
  description: 'Created with create-flyyer-app',
  homepage: 'https://flyyer.io',
  keywords: ['flyyer', 'react', 'tailwind'],
  private: false,
  repository: 'https:/github.com/useflyyer/flyyer-official',
  sizes: ['THUMBNAIL', 'BANNER', 'SQUARE', 'STORY']
});
