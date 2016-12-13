const Pixi = require('pixi.js')
const Tween = require('tween.js')

// App :: {model:Object, Reducer reducer:Function, View view:Function, Effet effect:Function, el:DomElement}
// Model :: data:Object => model:Object
// Reducer :: model:Object => action:Object => model:Object
// View :: model:Object => prev:Object => send:Function => tree:Pixi.DisplaObject
// Effect :: model:Object => action:Object => send:Function => undefined
// app :: IO App app:Object
const app = ({model,view,reducer,effect=()=>{},el=document.body,pixiOpts={}})=>{
  const width = pixiOpts.width || 1000
  const heigth = pixiOpts.heigth || 1000
  const renderer = Pixi.autoDetectRenderer(width, heigth, pixiOpts)
  let tree
  let rerender

  const dispatch = action =>{
    const newModel = reducer(model, action)
    rerender = newModel != model
    if(rerender){
      tree = view(newModel, model, dispatch)
      model = newModel
    }
  }

  const frame = time=>{
    requestAnimationFrame(frame)
    Tween.update(time)
    if(Tween.getAll().length || rerender){
      renderer.render(tree)
      rerender = false
    }
  }

  tree = view(model,{},dispatch)
  renderer.render(tree)

  requestAnimationFrame(frame)
  el.appendChild(renderer.view)
  return el
}

module.exports = app
