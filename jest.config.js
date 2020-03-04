const path = require('path');
const fs = require('fs-extra');

/**
 * v2 版本存在的组件
 * 只有存在的组件才需要测试
 */
const existComponents = [
  'Avatar',
  'Button',
  'Loading',
  'Icon',
  'notification',
  'message',
  'Scroll',
  'Grid',
  'Tooltip',
  'Popover',
  'PurePortal',
  'Modal',
  'Selection',
  'Search',
  'Select',
  'Pagination',
  'Switch',
  'Radio',
];

function getTestMatch() {
  const testMatch = ['**/hoc/__test__/**/*.[jt]s?(x)'];
  const componentsPath = path.resolve(__dirname, 'src/components');
  const components = fs.readdirSync(componentsPath);
  components.forEach(name => {
    if (existComponents.includes(name)) {
      testMatch.push(`**/${name}/__test__/**/*.[jt]s?(x)`);
    }
  });
  return testMatch;
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: getTestMatch(),
  rootDir: 'src',
  // https://kulshekhar.github.io/ts-jest/user/config/#jest-config-without-helper
  moduleNameMapper: {
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^components/(.*)$': '<rootDir>/components/$1'
  }
};
