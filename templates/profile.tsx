import React from 'react';
import {BetterURL} from '@flyyer/better-url';
import {Variable as V, Validator, Static} from '@flyyer/variables';
import {TemplateProps} from '@flyyer/types';
import clsx from 'clsx';

import '../styles/tailwind.css';

import logo from '../static/logo.png';

import {Layer} from '../components/layers';
import {ImageRing, BarTop, BarBottom} from '../components/components';

/**
 * Export to enable variables UI on flyyer.io
 */
export const schema = V.Object({
  title: V.String({
    default: 'flyyer',
  }),
  description: V.Optional(
    V.String({
      examples: ['Official flyyer.io profile on flyyer.io'],
    }),
  ),
  url: V.Optional(
    V.URL({
      description: 'Profile URL',
      examples: ['https://flyyer.io/@/flyyer'],
    }),
  ),
  image: V.Optional(
    V.Image({
      title: 'Profile image',
      examples: ['https://flyyer.io/logo.png'],
    }),
  ),
  command: V.Optional(
    V.String({
      default: '$ npm create flyyer-app',
      examples: ['$ yarn create flyyer-app', '$ npm create flyyer-app@latest'],
      description: 'Bottom text in monospace',
    }),
  ),
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function ProfileTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables, locale = 'en'} = props;
  if (!validator.validate(variables)) {
    // TODO
  }

  const {title, description, command, image, url} = variables;

  const betterURL = url && new BetterURL(url);

  return (
    <Layer
      className={clsx({
        dark: false /* TODO: Think about "dark-mode" variable */,
      })}
    >
      <Layer
        className={clsx(
          'antialiased overflow-hidden',
          'bg-gray-50 dark:bg-gray-900',
          'story:py-storysafe',
          'flex flex-col items-center justify-center',
        )}
      >
        <BarTop>Create images with JavaScript</BarTop>
        <div
          className={clsx(
            'banner:px-8 sq:px-10 sq:pt-10',
            'flex-1',
            'flex flex-row space-x-4 space-y-0 sq:space-x-0 sq:space-y-2 sq:flex-col items-center sq:items-start justify-center sq:justify-start',
          )}
        >
          {image ? (
            <ImageRing
              className={clsx('w-20 h-20 sq:w-24 sq:h-24')}
              src={image}
            />
          ) : (
            <ImageRing
              className={clsx('banner:hidden', 'w-20 h-20')}
              src={logo}
            />
          )}
          <header className="space-y-1 hidden banner:block">
            <h1
              className={clsx(
                'font-extrabold tracking-tight leading-tight text-2xl sq:text-3xl text-gray-900 dark:text-white',
                'line-clamp-1 story:line-clamp-none',
              )}
            >
              {title}
            </h1>
            <p
              className={clsx(
                'text-font-semibold text-base story:text-lg leading-tight story:leading-tight',
                'text-gray-700 dark:text-gray-400',
                'line-clamp-3 story:line-clamp-none',
              )}
            >
              {description}
            </p>
            {betterURL && (
              <p
                className={clsx(
                  'text-xs story:text-sm leading-none',
                  'text-gray-600 dark:text-gray-500',
                )}
              >
                {betterURL.format({hostname: true, pathname: true})}
              </p>
            )}
          </header>
        </div>

        {command && (
          <BarBottom className={clsx('font-mono')}>{command}</BarBottom>
        )}
      </Layer>
    </Layer>
  );
}
