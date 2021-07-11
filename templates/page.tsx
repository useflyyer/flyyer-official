import React from 'react';
import {Variable as V, Validator, Static} from '@flyyer/variables';
import {TemplateProps} from '@flyyer/types';
import {BetterURL} from '@flyyer/better-url';
import inRange from 'lodash/inRange';
import clsx from 'clsx';

import '../styles/tailwind.css';

import bubbles from '../static/bubbles.svg';
import {Layer} from '../components/layers';

/**
 * Export to enable variables UI on flyyer.io
 */
export const schema = V.Object({
  url: V.Optional(
    V.URL({
      description: 'Page URL',
      default: 'https://flyyer.io/',
      examples: ['https://flyyer.io/about']
    })
  )
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function ArticleTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables, locale = 'en'} = props;
  if (!validator.validate(variables)) {
    return <img className="w-full h-full object-cover" src={bubbles} />; // Fallback for invalid variables
  }

  const {url} = variables;
  const betterURL = url && new BetterURL(url);
  const host = betterURL && betterURL.format({hostname: true});
  const path = betterURL && betterURL.format({pathname: true});

  return (
    <Layer className="relative w-full h-full antialiased overflow-hidden">
      <Layer className="bg-white">
        <img className="w-full h-full object-cover" src={bubbles} />
      </Layer>
      <Layer
        className={clsx([
          'hidden',
          'banner:flex flex-col items-center justify-center p-8 flex-nowrap text-center'
        ])}
      >
        {host && path && (
          <h1
            className={clsx(
              'text-4xl font-bold leading-tighter tracking-tight text-gray-800 text-shadow-md'
            )}
          >
            <span className={clsx('mr-0.5')}>{host}</span>
            <wbr />
            <span
              className={clsx('text-indigo-600  leading-tighter', {
                // TODO: Use fit-text or something.
                'text-5xl': inRange(path.length, 0, 8),
                'text-4xl': inRange(path.length, 8, 16),
                'text-3xl': inRange(path.length, 16, 32),
                'text-2xl': inRange(path.length, 64, Number.POSITIVE_INFINITY)
              })}
            >
              {path}
            </span>
          </h1>
        )}
      </Layer>
    </Layer>
  );
}
