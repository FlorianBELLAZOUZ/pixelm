const Tween = require('tween.js')
const Pixi = require('pixi.js')
const App = require('../../index')

const model = ()=>({color:0xFF000F})

const back = Tween.Easing.Back.Out
const tw = obj=>to=>new Tween.Tween(obj.scale).to(to,200).easing(back)

const pop = obj=>{
  const tweenScale = tw(obj)
  const a = tweenScale({x:1.5,y:1.5})
  const b = tweenScale({x:1,y:1})
  a.chain(b)
  a.start()
}

const view = (model,prev,send)=>{
  const square = new Pixi.Graphics()
  square.beginFill(model.color)
  square.drawRect(-50,-50,100,100)
  square.x = 500
  square.y = 500

  if(model.color!=prev.color) pop(square)

  document.body.onclick = send.bind(0,{type:'change'})

  return square
}

const colors = [0xFF0000,0x00FF00,0x0000FF,0xFFFF00]
const random = max=>Math.floor(Math.random()*max)
const pick = array=>array[random(array.length)]
const pickDiff = last=>array=>{
  const now = pick(array)
  return now===last?pickDiff(last)(array):now
}

const reducer = (model, action)=>{
  if(action.type==='change') return {color:pickDiff(model.color)(colors)}
  return model
}

App({model:model(),view,reducer})
