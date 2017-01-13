const Pixi = require('pixi.js')
const Mute = require('muuute').mute
const getAll = require('muuute').muteGetAll
const Tween = require('tween.js')
const Clone = require('clone')

const addChilds = parent=>childs=>childs.forEach(c=>parent.addChild(c))

const model = ({tabs=[],currentPath})=>({tabs,currentPath})

const view = (model, prev, send)=>{
  let container = new Pixi.Container()
  container.name = 'tabs'

  const tabs = model.tabs.map((tab,i)=>{
    const tabModel = modelTab({
      x:125*i,
      path:tab.path,
      currentPath:model.currentPath,
      name:tab.name,
    })

    return viewTab(tabModel,{},send)
  })

  addChilds(container)(tabs)

  return container
}

const style = {fontFamily:'Arial',fontSize:24,fill:0x322419}
const off = {alpha:0}
const on = {alpha:1}

const modelTab = ({path,name,x,y,currentPath})=>({path,name,x,y,currentPath})

const viewTab = (model, prev, send)=>{
  let container = new Pixi.Container()
  container.name = 'tab'+model.name
  container.interactive = true
  container.buttonMode = true

  let tab = new Pixi.Graphics()
  tab.beginFill(0X644a31)
  tab.drawRect(0,0,125,60)
  tab.name = 'tab'

  let tabOver = new Pixi.Graphics()
  tabOver.beginFill(0X322419)
  tabOver.drawRect(0,0,125,60)
  tabOver.name = 'tabOver'

  let text = new Pixi.Text()
  text.text = model.name
  text.style = style

  let textOver = new Pixi.Text()
  textOver.text = model.name
  textOver.style = Object.assign({},style,{fill:0x644a31})

  tab.x = tabOver.x = model.x
  text.x = textOver.x = model.x + 50

  if(model.path===model.currentPath){
    Mute(tab,off)
    Mute(tabOver,on)
  }else{
    Mute(tab,on)
    Mute(tabOver,off)
    container.click = send.bind(0,{type:'newPath',path:model.path})
    container.mouseover = ()=>{Mute(tab,off);Mute(tabOver,on)}
    container.mouseout = ()=>{Mute(tab,on);Mute(tabOver,off)}
  }

  container.addChild(tab)
  container.addChild(tabOver)
  container.addChild(text)
  container.addChild(textOver)

  return container
}

module.exports = {model,modelTab,view}
