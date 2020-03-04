declare module 'ua-parser-js';

/**
 *  React Component Interface
 *
 * @interface FComponent
 * @template P
 */
declare interface FComponent<P = {}> {
  (props: P & { children?: ReactNode }, context?: any): ReactElement | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}