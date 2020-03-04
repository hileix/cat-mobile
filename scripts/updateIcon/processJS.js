
const fetch = require('node-fetch');

let jsString = ''
let base64Array = []
let iconSize= {
  width: 32,
  height: 32
}

function svgXmlStringToBase64DataUri(svg) {
  let base64 = 'data:image/svg+xml;utf8;base64,' + Buffer.from(svg).toString('base64');
  return `${base64}${encodeSpaces(` | width=${iconSize.width} height=${iconSize.height}`)}` 
}

function encodeSpaces(content) {
  return content.replace(/ /g, '%20');
}

function findIdBySvg(svg){
  let id = ''
  svg.replace(/id="([^"]+)"/, function(all, _id){
    id = _id
  })
  return id
}


let getIconfontJS = async (code) => {
  if (jsString) return jsString
  return await fetch(`http://at.alicdn.com/t/font_1236545_${code}.js`)
  .then((res)=>{
    jsString = res.text()
    return jsString
  }, err => console.log(err))
}

let getBase64Array = async (code) => {
  if(base64Array.length) return base64Array
  let jsString =  await getIconfontJS(code)
  let svgStr = ''
  jsString.replace(/'(<svg>[^']+)/, function(all, svg){
    svgStr = svg
  })
  svgStr = svgStr.replace(/<svg>|<\/svg>/g, '')
          .replace(/<symbol/g, '<svg xmlns="http://www.w3.org/2000/svg" ')
          .replace(/<\/symbol>/g, '</svg>||').replace(/\|\|$/, '')
  svgStr.split('||').map((svg)=>{
    base64Array.push({
      base64: svgXmlStringToBase64DataUri(svg),
      id: findIdBySvg(svg)
    })
  })
  return base64Array
 }
/**
 * 
 */
 module.exports = {
    getIconfontJS,
    getBase64Array
 }



// call: 
//  getBase64Array("jmuw9sfqs2").then((data)=>{
//      data && data.map((value)=>{
//       console.log('id: ', value.id)
//       console.log('svg: ', value.base64)
//       console.log(':::::::::::::::::::::::::::::: ')
//      })
//  })