import classNames from 'classnames';
const memoize = require('lodash/memoize');

interface initParams {
  prefix: string;
  suffix?: string;
  theme?: string;
}

export function classnames(params: initParams): Function {
  const { prefix, suffix, theme } = params;

  return memoize(function(value: string, className?: string): string {
    return classNames(
      {
        [`${prefix}`]: !!prefix && !value,
        [`${prefix}-${suffix}`]: !!prefix && !value && !!suffix,
        [`${prefix}-${theme}`]: !!prefix && !value && !!theme,
        [`${prefix}-${theme}-${suffix}`]:
          !!prefix && !value && !!theme && !!suffix,
        [`${prefix}-${value}`]: !!prefix && !!value,
        [`${prefix}-${value}-${suffix}`]: !!prefix && !!value && !!suffix,
        [`${prefix}-${theme}-${value}`]: !!prefix && !!value && !!theme,
        [`${prefix}-${theme}-${value}-${suffix}`]:
          !!prefix && !!value && !!theme && !!suffix
      },
      className
    );
  });
}

export default classnames;
