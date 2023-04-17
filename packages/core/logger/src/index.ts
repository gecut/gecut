import { getColor } from './lib/color';
import { stabilizerScopeName } from './lib/stabilizer-scope-name';

import type { Logger } from './type';

export const DEV_MODE = localStorage?.getItem('GECUT_DEBUG') === '1';

const _style = {
  scope: 'color: {{color}};',
  reset: 'color: inherit;',
};

const _keySection = '%c%s%c';

export const createLogger = (scopeName: string, devMode = DEV_MODE): Logger => {
  scopeName = stabilizerScopeName(scopeName);
  
  const color = getColor();
  const styleScope = _style.scope.replaceAll('{{color}}', color);

  const requiredLogger = {
    devMode,
    scopeName,

    warning: console.warn.bind(
        console,
        '%c%s%c.%s() Warning `%s` %s!',
        styleScope,
        scopeName,
        _style.reset
    ),

    error: console.error.bind(
        console,
        '%c%s%c.%s() Error `%s`\n',
        styleScope,
        scopeName,
        _style.reset
    ),
  } as const;

  if (!devMode) {
    return requiredLogger;
  }
  // else
  return {
    ...requiredLogger,

    property: console.debug.bind(
        console,
        _keySection + '.%s = %O;',
        styleScope,
        scopeName,
        _style.reset
    ),

    method: console.debug.bind(
        console,
        _keySection + '.%s();',
        styleScope,
        scopeName,
        _style.reset
    ),

    methodArgs: console.debug.bind(
        console,
        _keySection + '.%s(%O);',
        styleScope,
        scopeName,
        _style.reset
    ),

    methodFull: console.debug.bind(
        console,
        _keySection + '.%s(%O) => %O',
        styleScope,
        scopeName,
        _style.reset
    ),

    other: console.debug.bind(
        console,
        _keySection,
        styleScope,
        scopeName,
        _style.reset
    ),
  } as const;
};