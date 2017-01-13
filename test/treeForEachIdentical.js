const Should = require('chai').Should()
const identical = require('../lib/treeForEachIdentical')

describe('.arrayForEachIdentical :: func=>isSame=>arrayA=>arrayB', ()=>{
  it('should return list of same elements',()=>{
    let i = 0
    const a = [{el:1,c:1},{el:2,c:1},{el:3,c:1},{el:4,c:1},{el:8,c:1}]
    const b = [{el:3,c:2},{el:1,c:2},{el:6,c:2}]
    const isSame = (a,b)=>a&&b&&a.el&&b.el?a.el===b.el:false
    const func = (a,b)=>i++
    const expected = [[{el:1,c:1},{el:1,c:2}],[{el:3,c:1},{el:3,c:2}]]

    const ret = identical.arrayForEachIdentical(func,isSame,a,b)

    ret.should.be.deep.equal(expected)
    i.should.be.equal(2)
  })
})

describe('.treeForEachIdentical :: func=>isSame=>treeA=>treeB', ()=>{
  it('should exec func in each identical node',()=>{
    const treeA = {
      name:'main',
      c:1,
      children:[
        {
          name:'tab1',
          c:1,
          children:[
            {name:'btn1',c:1},
            {name:'btn2',c:1},
            {name:'btn3',c:1}
          ]
        },
        {
          name:'tab2',
          c:1,
          children:[
            {name:'btn1',c:1},
            {name:'btn2',c:1}
          ]
        },
        {
          name:'tab3',
          c:1,
          children:[
            {name:'btn1',c:1},
          ]
        },
      ]
    }

    const treeB = {
      name:'main',
      c:2,
      children:[
        {
          name:'tab2',
          c:2,
          children:[
            {name:'btn2',c:2},
            {name:'btn3',c:2},
          ]
        },
        {
          name:'tab1',
          c:2,
          children:[
            {name:'btn2',c:2},
            {name:'btn3',c:2},
            {name:'btn1',c:2},
          ]
        },
        {
          name:'tab4',
          c:2,
        },
      ]
    }

    let names = []

    const isSame = (a,b)=>a&&b&&a.name&&b.name?a.name===b.name:false
    const func = (a,b)=>names.push(a.name)

    const expected = ['tab1','tab2','btn1','btn2','btn3','btn2']

    identical.treeForEachIdentical(func,isSame,treeA,treeB)

    names.should.be.deep.equal(expected)
  })
})
