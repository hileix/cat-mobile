/**
 * 创建 枚举文件
 */
const path = require('path');
const fs = require('fs');
const getBase64Array = require('./processJS').getBase64Array;

let enumFilePath = path.join(__dirname, '../../', 'src', 'components', 'Icon', 'IconTypeEnum.ts');
const iconTypesJsonPath = path.join(__dirname, '../../', 'src/components/Icon/stories/iconTypes.json');

let createEnumFile = async function (code) {
  let arr = await getBase64Array(code)
  let types = [], iconTypes = [];
  types = arr.map((value) => {
    let type = value.id.replace('hmly-icon-', '')
    let key = type.replace(/-(.{1})/g, function (all, _key) {
      return _key.toUpperCase()
    })
    iconTypes.push(type);

    return `
    /**  
     * ![](${value.base64})
     * 
     * ${type}
    */
   '${key}'= '${type}',\n
    `
  })

  let template = `
  export enum IconType {
    ${types.join('')}
  }
  `
  const iconTypesJsonTemplate = JSON.stringify(iconTypes, null, 2);

  fs.writeFileSync(enumFilePath, template);
  fs.writeFileSync(iconTypesJsonPath, iconTypesJsonTemplate);
  console.log('created enum file success');
}

module.exports = {
  createEnumFile
}
