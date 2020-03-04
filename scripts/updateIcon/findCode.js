const path = require('path')
const fs = require('fs')
 
 function findCode () {
  let argv = process.argv
  let code = ''
  argv.map((item)=>{
    if (/--code=/.test(item)) {
      code = item.replace('--code=', '').replace(/\s/g, '')
    }
  })
  let oldCode = fs.readFileSync(path.join(__dirname, '.old.code.txt'))
  if(oldCode == code) {
    console.log('请更新code后再执行')
    return null
  }
  return code
}

function saveCode (code){
  fs.writeFileSync(path.join(__dirname, '.old.code.txt'), code)
}


module.exports = {
  findCode,
  saveCode
}