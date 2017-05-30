Pixelm
---------
A strudy frontend framework for pixi, inspired by elm.

DataFlow
---------
Simple and powerfull elmish Data flow

```
 action ----<--+---<--+
   |           |    effect
reducer        +-->---+
   |           |
  view -->-----+
```

Feactures
---------
- Css like class
- View state transition
- Photoshop to pixi interface parcing ( with psdtojson & pixi-createfrom )

Exemple
--------
```js
const App = require('pixelm')
const Pixi = require('pixelm/factories')

const model = ()=>({clicks:0})
const reducer = (model, action)=>{
  if(action.type=='inc') return {clicks:model.clicks+1}
  if(action.type=='dec') return {clicks:model.clicks-1}
  return model
}
const view = (model, prev, send)=>{
  const text = Pixi.Text()
  text.text = model.clicks
  text.onclick = ()=>send({type:'inc'})
  text.onblur = send.bind(0,{type:'dec'})
  return text
}

App({model:model(), reducer, view, el:document.body})

```

Api
---------
the api is compose of one function


APP :: {model,view,reducer,effect,el}

App :: APP app:Object => canvas:DomCanvas

**model :: data:Object => model:Object**

Should return the state of the app.

**reducer :: model:Object => action:Object => model:Object**

Receives the current state and returns an updated version of the state which is then sent to the views.

**view :: model:Object => prev:Object => send:Function => tree:Pixi.DisplaObject**

Pure functions that should return a DisplayObject.
They’re receives the current state, the prev state and the send function to call an action.

**effect :: model:Object => action:Object => send:Function => renderer => tree:DisplayObject => undefined**

Effects makes an asynchronous operation and calls another action when it's done.

**el :: element:HtmlElement**

The Dom element here the pixi canvas will be attach.


More exemples
---------

Tween animation
```js
const App = require('pixelm')
const Pixi = require('pixelm/factories')

const tween = obj=>{
  new TWEEN
    .Tween(obj)
    .to({scaleX:'+0.5',scaleY:'+0.5'})
    .easing(TWEEN.Easing.Back.in)
    .start()
}

const model = ()=>({clicks:0})
const reducer = (model, action)=>{
  if(action.type=='inc') return {clicks:model.clicks+1}
  if(action.type=='dec') return {clicks:model.clicks-1}
  return model
}
const view = (model, prev, send)=>{
  const text = Pixi.Text()
  text.text = model.clicks
  text.onclick = send.bind(0,{type:'inc'})
  text.onblur = send.bind(0,{type:'dec'})
  if(model.clicks != prev.clicks) tween(text)
  return text
}

App({model:model(), reducer, view, el:document.body})

```

Class transition
```js
const App = require('pixelm')
const Pixi = require('pixelm/factories')
const Class = require('class')

const style = Class({tran:{transition:0.5},off:{y:'-500'},on:{y:0}})

const model = ()=>({clicks:0})
const reducer = (model, action)=>{
  if(action.type=='inc') return {clicks:model.clicks+1}
  if(action.type=='dec') return {clicks:model.clicks-1}
  return model
}
const view = (model, prev, send)=>{
  const text = Pixi.Text()
  text.text = model.clicks
  text.onclick = send.bind(0,{type:'inc'})
  text.onblur = send.bind(0,{type:'dec'})

  text = style(text, 'tran off')
  return text
}

App({model:model(), reducer, view, el:document.body})

```

Router
```js
const App = require('pixelm')
const Pixi = require('pixelm/factories')

const model = ()=>({clicks:0,path:'/'})
const reducer = (model, action)=>{
  if(action.type=='nav') return {path:action.location}
  if(action.type=='inc') return {clicks:model.clicks+1}
  if(action.type=='dec') return {clicks:model.clicks-1}
  return model
}
const view = (model, prev, send)=>{
  const text = Pixi.Text()
  text.text = model.clicks
  text.onclick = send.bind(0,{type:'inc'})
  text.onblur = send.bind(0,{type:'dec'})

  if(model.path != '/') text.text = 'error 404'
  if(model.path == '/') text.text = 'error 404'
  return text
}

App({model:model(), reducer, view, el:document.body})

```
