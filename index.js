const Pixi = require('pixi.js')
const PixiDom = require('pixi.dom')(Pixi)
const Mute = require('muuute')
const TreeForEachIdentical = require('./lib/treeForEachIdentical').treeForEachIdentical

const properties = ['x','y','alpha','scale.x','scale.y']
const transfert = (a,b)=>Mute.switch(a,properties,b,a.__style__)
const isSame = (a,b)=>a&&b&&a.name&&b.name&&a.name==b.name

// App :: {model:Object, Reducer reducer:Function, View view:Function, Effet effect:Function, el:DomElement}
// Model :: data:Object => model:Object
// Reducer :: model:Object => action:Object => model:Object
// View :: model:Object => prev:Object => send:Function => tree:Pixi.DisplaObject
// Effect :: model:Object => prev:Object => action:Object => send:Function => undefined
// app :: IO App app:Object
const app = ({model,view,reducer,effect=()=>{},el=document.body,pixiOpts={}})=>{
  const width = pixiOpts.width || 1000
  const heigth = pixiOpts.heigth || 1000
  const renderer = Pixi.autoDetectRenderer(width, heigth, pixiOpts)
  let tree
  let rerender

  const send=setTimeout(dispatch,1)

  const dispatch = action =>{
    const newModel = reducer(model, action)
    effect(newModel, model, action, send)
    rerender = newModel !== model
    if(rerender){
      Mute.desactivate()
      destroyDomElements(Pixi.DOM.getAllElements())
      var newTree = view(newModel,model,send)
      Mute.activate()

      TreeForEachIdentical(transfert,isSame,newTree,tree)
      tree = newTree
      model = newModel
    }
  }

  const frame = time=>{
    requestAnimationFrame(frame)
    if(Mute.muted() || rerender){
      Mute.update()
      renderer.render(tree)
      rerender = false
    }
  }

  send({type:'init'})
  tree = view(model,{},send)
  renderer.render(tree)

  requestAnimationFrame(frame)
  el.appendChild(renderer.view)
  return el
}

const destroyDomElements = els=>{
  for(var i = els.length-1; i!=-1; i--){
    els[i].destroy()
  }
}

module.exports = app
