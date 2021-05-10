import React from 'react';
import {BetterURL} from '@flayyer/better-url';
import {Variable as V, Validator, Static} from '@flayyer/variables';
import {TemplateProps} from '@flayyer/flayyer-types';
import clsx from 'clsx';

import '../styles/tailwind.css';

import logo from '../static/logo.png';

import {Layer} from '../components/layers';

/**
 * Export to enable variables UI on Flayyer.com
 */
export const schema = V.Object({
  title: V.String({
    default: 'flayyer'
  }),
  description: V.Optional(
    V.String({
      examples: ['Official Flayyer.com profile on Flayyer.com']
    })
  ),
  url: V.Optional(
    V.URL({
      description: 'Profile URL'
    })
  ),
  image: V.Optional(
    V.Image({
      title: 'Profile image'
    })
  ),
  command: V.String({
    default: '$ npm create flayyer-app',
    examples: ['$ yarn create flayyer-app', '$ npm create flayyer-app@latest'],
    description: 'Bottom text in monospace'
  })
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function ProfileTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables, locale = 'en'} = props;
  if (!validator.validate(variables)) {
    // Return <img className="w-full h-full object-cover" src={img1} />; // Fallback for invalid variables
    return null;
  }

  const {title, description, command, image, url} = variables;

  const betterURL = url && new BetterURL(url);

  return (
    <Layer
      className={clsx(
        {dark: false}, // TODO: Think about "dark-mode" variable
        'antialiased overflow-hidden',
        'bg-gray-50 dark:bg-gray-900',
        'story:py-storysafe',
        'flex flex-col items-center justify-center'
      )}
    >
      <div
        className={clsx(
          'w-full px-4 py-1 hidden banner:block',
          'bg-indigo-600 dark:bg-white'
        )}
      >
        <p
          className={clsx(
            'text-center text-xs font-semibold text-white dark:text-gray-700'
          )}
        >
          Create images with JavaScript
        </p>
      </div>
      <div
        className={clsx(
          'banner:px-8 sq:px-10 sq:pt-10',
          'flex-1',
          'flex flex-row space-x-4 space-y-0 sq:space-x-0 sq:space-y-2 sq:flex-col items-center sq:items-start justify-center sq:justify-start'
        )}
      >
        {image ? (
          <img
            className={clsx(
              'w-20 h-20 sq:w-24 sq:h-24',
              'rounded-md',
              'ring-4 ring-offset-8 ring-offset-gray-200 ring-indigo-600 dark:ring-offset-gray-900 dark:ring-gray-200'
            )}
            src={image}
          />
        ) : (
          <img
            className={clsx(
              'banner:hidden',
              'w-20 h-20',
              'rounded-md',
              'ring-4 ring-offset-8 ring-offset-gray-200 ring-indigo-600 dark:ring-offset-gray-900 dark:ring-gray-200'
            )}
            src={logo}
          />
        )}
        <header className="space-y-1 hidden banner:block">
          <h1
            className={clsx(
              'font-extrabold tracking-tight leading-tight text-2xl sq:text-3xl text-gray-900 dark:text-white',
              'line-clamp-1 story:line-clamp-none'
            )}
          >
            {title}
          </h1>
          <p
            className={clsx(
              'text-font-semibold text-base story:text-lg leading-tight story:leading-tight',
              'text-gray-700 dark:text-gray-400',
              'line-clamp-3 story:line-clamp-none'
            )}
          >
            {description}
          </p>
          {betterURL && (
            <p
              className={clsx(
                'text-xs story:text-sm leading-none',
                'text-gray-600 dark:text-gray-500'
              )}
            >
              {betterURL.format({hostname: true, pathname: true})}
            </p>
          )}
        </header>
      </div>
      <div
        className={clsx(
          'w-full px-4 py-1 hidden banner:block',
          'bg-gray-200 dark:bg-gray-800'
        )}
      >
        <p
          className={clsx(
            'text-center font-mono text-xs font-light text-gray-800 dark:text-gray-400'
          )}
        >
          {command}
        </p>
      </div>
    </Layer>
  );
}
