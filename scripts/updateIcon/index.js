const findCode = require('./findCode').findCode
const saveCode = require('./findCode').saveCode
const updateIconStyleFile = require('./processCss').updateIconStyleFile
const getBase64Array = require('./processJS').getBase64Array
const createEnumFile = require('./createEnum').createEnumFile
const createExamplate = require('./createExamplateForMD').createExamplate

async function run (){
  let code = findCode()
  if(!code) {
     console.log('请提供code,去iconfont.cn获取,例如: //at.alicdn.com/t/font_1236545_jmuw9sfqs2.css')
     console.log('code就是jmuw9sfqs2, 需要在package.json script--> update:icon -->  替换--code=jmuw9sfqs2')
     console.log('若只是修改了更新icon的脚本内容，则需手动清除./scripts/updateIcon/.old.code.txt中的code')
     return 
  }
  await updateIconStyleFile(code)
  await getBase64Array(code)
  await getBase64Array(code)
  await createEnumFile(code)
  return code
}

run().then((code)=>{
  if(code) {
    saveCode(code)
    console.log('Icon 组件已更新完毕')
  }
})