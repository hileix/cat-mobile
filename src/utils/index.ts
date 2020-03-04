/**
 * 是否可以使用 dom
 */
export const canUseDOM = (): boolean => {
  return !!(typeof window !== 'undefined');
}
