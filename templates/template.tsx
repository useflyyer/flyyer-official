import React from 'react';
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
    default: 'Flyyer Template',
  }),
  description: V.Optional(
    V.String({
      default: 'Created with create-flyyer-app',
    }),
  ),
  authorUsername: V.Optional(
    V.String({
      description: 'Author username',
      default: 'flyyer',
    }),
  ),
  thumb: V.Optional(
    V.Image({
      title: 'Thumbnail image',
      examples: [
        'https://flyyer.io/v2/flyyer/default/main.jpeg?_w=400&_h=400&_ua=&image=%2Falternative.a1d20d64.jpeg',
      ],
    }),
  ),
  banner: V.Optional(
    V.Image({
      title: 'Banner image',
      examples: [
        'https://flyyer.io/v2/flyyer/default/main.jpeg?_w=1200&_h=630&_ua=&image=%2Falternative.a1d20d64.jpeg',
      ],
    }),
  ),
  sq: V.Optional(
    V.Image({
      title: 'Square image',
      examples: [
        'https://flyyer.io/v2/flyyer/default/main.jpeg?_w=1080&_h=1080&_ua=&image=%2Falternative.a1d20d64.jpeg',
      ],
    }),
  ),
  story: V.Optional(
    V.Image({
      title: 'Story image',
      examples: [
        'https://flyyer.io/v2/flyyer/default/main.jpeg?_w=1080&_h=1920&_ua=&image=%2Falternative.a1d20d64.jpeg',
      ],
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

export default function TemplateTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables, locale = 'en'} = props;
  if (!validator.validate(variables)) {
    // TODO
  }

  const {
    title,
    description,
    command,
    authorUsername,
    thumb,
    banner,
    sq,
    story,
  } = variables;

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
          'flex flex-col items-stretch justify-center',
        )}
      >
        <div className={clsx('block banner:hidden w-full h-full p-2')}>
          <ImageRing className={clsx()} src={thumb || logo} />
        </div>

        <BarTop>Create images with JavaScript</BarTop>

        <div
          className={clsx(
            'hidden banner:flex flex-row sq:flex-col story:flex-row justify-center items-center sq:items-start story:items-center',
            'flex-1',
            'p-4 sq:p-6 space-x-4 space-y-0 sq:space-x-0 sq:space-y-3 story:space-x-4 story:space-y-0',
          )}
        >
          <div className={clsx('flex-shrink-0')}>
            {banner && (
              <ImageRing
                style={{width: width * 0.5, height: height * 0.5}}
                className={clsx('hidden banner:block sq:hidden story:hidden')}
                src={banner}
              />
            )}
            {sq && (
              <ImageRing
                style={{width: width * 0.45, height: height * 0.45}}
                className={clsx('hidden banner:hidden sq:block story:hidden')}
                src={sq}
              />
            )}
            {story && (
              <ImageRing
                style={{width: width * 0.4, height: height * 0.4}}
                className={clsx('hidden banner:hidden sq:hidden story:block')}
                src={story}
              />
            )}
          </div>

          <header className="space-y-1 hidden banner:block">
            {authorUsername && (
              <p
                className={clsx(
                  'text-xs leading-none story:text-sm story:leading-none',
                  'text-gray-600 dark:text-gray-500',
                )}
              >
                {authorUsername}
              </p>
            )}
            <h1
              className={clsx(
                'font-extrabold tracking-tight leading-tight text-lg sq:text-2xl sq:leading-tight text-gray-900 dark:text-white',
                'line-clamp-1 story:line-clamp-none',
              )}
            >
              {title}
            </h1>
            <p
              className={clsx(
                'text-font-semibold text-sm story:text-base leading-tight story:leading-tight',
                'text-gray-700 dark:text-gray-400',
                'line-clamp-3 story:line-clamp-none',
              )}
            >
              {description}
            </p>
          </header>
        </div>

        {command && <BarBottom className="font-mono">{command}</BarBottom>}
      </Layer>
    </Layer>
  );
}
