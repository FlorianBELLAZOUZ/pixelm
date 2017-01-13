// const {view,model,reducer} = require('./panel')
const Pixi = require('pixi.js')
const Tabs = require('./tabs')
const App = require('../..')
const Mute = require('muuute').mute

const pixiOpts = {width:1920,heigth:1080}

const model = ()=>({currentPath:'/shop'})

const reducer = (model,action)=>{
  if(action.type==='newPath') return Object.assign({},model,{currentPath:action.path})
}

const tabs = [
  {path:'/news',name:'news'},
  {path:'/shop',name:'shop'},
  {path:'/cointributors',name:'cointributors'},
]

const animation = {
  animations:[
    {
      property:'x',
      keys:[0,300,0],
      duration:5000,
      iterations:Infinity,
      interpolation:'catmullrom',
    }
  ]
}

const view = (model,prev,send)=>{
  const container = new Pixi.Container()
  container.name = 'main'
  const tabsView = Tabs.view(Tabs.model({tabs,currentPath:model.currentPath}),{},send)
  tabsView.name = 'tabs'

  Mute(tabsView,animation)

  container.addChild(tabsView)
  return container
}

App({model:model(),reducer,view,pixiOpts})
