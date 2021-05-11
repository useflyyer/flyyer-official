import React from 'react';
import clsx from 'clsx';

export function BarTop({className, ...props}: React.ComponentProps<'p'>) {
  return (
    <div
      className={clsx(
        'hidden banner:block',
        'flex-0 w-full px-4 py-1',
        'bg-indigo-600 dark:bg-white'
      )}
    >
      <p
        className={clsx(
          'text-center text-xs font-semibold text-white dark:text-gray-700',
          className
        )}
        {...props}
      />
    </div>
  );
}

export function BarBottom({className, ...props}: React.ComponentProps<'p'>) {
  return (
    <div
      className={clsx(
        'hidden banner:block',
        'flex-0 w-full px-4 py-1',
        'bg-gray-200 dark:bg-gray-800'
      )}
    >
      <p
        className={clsx(
          'text-center text-xs font-light text-gray-800 dark:text-gray-400',
          className
        )}
        {...props}
      />
    </div>
  );
}

export function ImageRing({className, ...props}: React.ComponentProps<'img'>) {
  return (
    <img
      className={clsx(
        // 'hidden banner:hidden sq:hidden story:hidden',
        'rounded-md shadow-lg ring-2 ring-offset-2 ring-gray-300',
        className
      )}
      {...props}
    />
  );
}
