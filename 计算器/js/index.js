/**
 * 2021-7-10
 * author:lzn
 * 
 * tips:
 * 1、Math.pow()是求平方的方法；参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
 * 2、eval()函数里面的内容可以作为代码去运行，参考：https://www.w3school.com.cn/js/jsref_eval.asp
 * 3、整个代码逻辑是最简单的顺序逻辑，后面如果考虑到复用性可以把一部分的逻辑抽离出来
 */

let input1 = document.getElementsByClassName('input1')[0]
let input2 = document.getElementsByClassName('input2')[0]
let keyword = document.getElementsByClassName('keyword')[0]

let type = '' // 记录上一步操作是什么，比如说是等于，或者加减乘除
let isInit = true // 判断当输入数字的时候是在后面追加还是直接替换，true为替换，false为追加

// 按键对应的值
let key = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': "=",
  '11': "+",
  '12': "-",
  '13': "*",
  '14': "/",
  '15': "1/x",
  '16': "x*x",
  '17': "-/+",
  '18': ".",
  '19': "clear",
}

// 点击计算器按键触发的函数
keyword.addEventListener('click', (e) => {
  if (e.target.className === 'keyword') return // 点击到包裹容器的div不触发下面的逻辑，只有点击到按键才触发
  let value = e.target.value

  // 按键对应数字的时候
  if (0 <= value && value <= 9) {
    if (isNaN(input2.value)) {
      input1.value = ''
      input2.value = 0
      return
    }
    if (isInit) {
      if (type === '=' ||type === '1/x' || type === 'x*x' ) input1.value = ''
      input2.value = value
    } else {
      if (value === 0 && Number(input2.value) === 0) return
      input2.value = input2.value + value
    }
    type = ''
    isInit = false
    return
  }

  switch(value) {
    case 10: // 等于号
      if (type === '=') return // 连续等号无效
      let str = input1.value + input2.value
      if (type === '1/x' || type === 'x*x') {
        input1.value = input2.value + '='
        input2.value = input2.value
      }  else {
        input1.value = input1.value + input2.value + key[e.target.value]
        input2.value = eval(str)
      }
      type = key[e.target.value]
      isInit = true
    break;
    case 15: // 1/x
      input1.value = `1/${input2.value}`
      input2.value = 1/Number(input2.value)
      type = key[e.target.value]
    break;
    case 16: // 平方
      input1.value = `sqr(${input2.value})`
      input2.value = Math.pow(input2.value, 2)
      type = key[e.target.value]
    break;
    case 17: // +/-
      input2.value = -input2.value
      isInit = false
    break;
    case 18: // 小数点
      if (isInit) {
        if (type === '=') {
          input1.value = ''
        }
        input2.value = '0.'
        isInit = false
      }
      if (!input2.value.includes('.')) {
        input2.value = input2.value + key[e.target.value]
        isInit = false
      }
      type = ''
    break;
    case 19: // 清除
      input1.value = ''
      input2.value = 0
      isInit = true
      type = ''
    break;
    default: // + - * /
      if (isNaN(input2.value)) {
        input1.value = ''
        input2.value = 0
        return
      }
      if (input1.value === '' || type === '=' || type === '1/x' || type === 'x*x' ) {
        input1.value = input2.value + key[e.target.value]
      } else {
        let str = input1.value + input2.value
        console.log(str)
        input2.value = eval(str)
        input1.value = input2.value + key[e.target.value]
      }
      type = key[e.target.value]
      isInit = true
  }
})