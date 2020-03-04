
/**
 * 根据iconfont code 创建  src/components/Icon/Icon.md文件
 */
const getBase64Array = require('./processJS').getBase64Array
const path = require('path')
const fs = require('fs')

let mdFilePath = path.join(__dirname, '../../', 'src', 'components', 'Icon','Icon.md')

let oldTemplate = `
Example

\`\`\`jsx
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    console.log('Example:handleClick')
  }

  render () {
    return (<div className='icon-box'>
      <div className='icon-item'>
        <Icon type='question-circle' onClick={this.handleClick} />
        question-circle
      </div>
      <div className='icon-item'>
        <Icon type='question' />
        question
      </div>
      <div className='icon-item'>
        <Icon type='share3' />
        share3
      </div>
      <div className='icon-item'>
        <Icon type='share2' />
        share2
      </div>
      <div className='icon-item'>
        <Icon type='share1' />
        share1
      </div>
      <div className='icon-item'>
        <Icon type='more' />
        more
      </div>
      <div className='icon-item'>
        <Icon type='stats' />
        stats
      </div>
      <div className='icon-item'>
        <Icon type='forward' />
        forward
      </div>
      <div className='icon-item'>
        <Icon type='backward' />
        backward
      </div>
      <div className='icon-item'>
        <Icon type='ins' />
        ins
      </div>
      <div className='icon-item'>
        <Icon type='twitter' />
        twitter
      </div>
      <div className='icon-item'>
        <Icon type='facebook' />
        facebook
      </div>
      <div className='icon-item'>
        <Icon type='crown' />
        crown
      </div>
      <div className='icon-item'>
        <Icon type='early-access' />
        early-access
      </div>
      <div className='icon-item'>
        <Icon type='hi-circle' />
        hi-circle
      </div>
      <div className='icon-item'>
        <Icon type='ad-free' />
        ad-free
      </div>
      <div className='icon-item'>
        <Icon type='close' />
        close
      </div>
      <div className='icon-item'>
        <Icon type='upload' />
        upload
      </div>
      <div className='icon-item'>
        <Icon type='delete' />
        delete
      </div>
      <div className='icon-item'>
        <Icon type='edit' />
        edit
      </div>
      <div className='icon-item'>
        <Icon type='up' />
        up
      </div>
      <div className='icon-item'>
        <Icon type='download' />
        download
      </div>
      <div className='icon-item'>
        <Icon type='process' />
        process
      </div>
      <div className='icon-item'>
        <Icon type='filter' />
        filter
      </div>
      <div className='icon-item'>
        <Icon type='enter' />
        enter
      </div>
      <div className='icon-item'>
        <Icon type='drag1' />
        drag1
      </div>
      <div className='icon-item'>
        <Icon type='drag2' />
        drag2
      </div>
      <div className='icon-item'>
        <Icon type='prev' />
        prev
      </div>
      <div className='icon-item'>
        <Icon type='next' />
        next
      </div>
      <div className='icon-item'>
        <Icon type='eye-open' />
        eye-open
      </div>
      <div className='icon-item'>
        <Icon type='eye-close' />
        eye-close
      </div>
      <style>
        {\`
          .icon-box .hmly-icon {
            margin-right: 10px;
          }
          .icon-box .icon-item {
            display: inline-block;
            width: 20%;
            margin-bottom: 20px;
          }
        \`}
      </style>
    </div>
    )
  }
}

<Example />
\`\`\`

`


let createExamplate = async function (code) {
  let arr = await getBase64Array(code)
  let icons = []
  arr.map((value)=>{
    let type = value.id.replace('hmly-icon-', '')
    let key = type.replace(/-(.{1})/g, function(all, _key){
      return _key.toUpperCase()
    })

    icons.push(`
    <div className='icon-item'>
      <Icon type={Icon.Type.${key}} />
      ${type}
    </div>
    `)

  })


  let newTemplate = `
    引入\`Icon\`后

    可以使用\`Icon.Type.\`来查看已有的icon

    \`\`\`jsx
    let NewIcon = () =>{
      return (
        <div className="icon-box">
          ${icons.join('')}
          <style>
            {\`
              .icon-box .hmly-icon {
                margin-right: 10px;
              }
              .icon-box .icon-item {
                display: inline-block;
                width: 20%;
                margin-bottom: 20px;
              }
            \`}
          </style>
        </div>
      )
    }
    <NewIcon />
    \`\`\`

  `
  // 去除每行前面的空格， 以满足markdown  ```语法
  newTemplate = newTemplate.replace(/(\n)(\s{4})/gm, '\n')
  fs.writeFileSync(mdFilePath, `new Examplate \n\n${newTemplate} \n ${oldTemplate}`)
}

module.exports = {
  createExamplate
}