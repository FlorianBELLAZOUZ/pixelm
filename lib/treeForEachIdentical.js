const isArray = Array.isArray

const arrayForEachIdentical = (func,isSame,arrayA,arrayB)=>{
  var sames = []
  var arrayBSames = []

  for(var i = 0; i<arrayA.length; i++) {
    var el = arrayA[i]
    if(isSame(el,arrayB[i])) {
      whenIsSame(el,y)
    }else{
      for(var y = 0; y<arrayB.length; y++){
        if(arrayBSames[y]) continue
        if(isSame(el,arrayB[y])) whenIsSame(el,y)
      }
    }
  }

  function whenIsSame (el,i){
    sames.push([el,arrayB[i]])
    arrayBSames[i]=true
    func(el,arrayB[i])
  }

  return sames
}

const treeForEachIdentical = (func,isSame,treeA,treeB)=>{
  if(!(isArray(treeA.children)||isArray(treeB.children))) return

  const sames = arrayForEachIdentical(func,isSame,treeA.children,treeB.children)

  for(var i = 0; i<sames.length; i++){
    var same = sames[i]
    treeForEachIdentical(func,isSame,same[0],same[1])
  }
}

module.exports = {arrayForEachIdentical,treeForEachIdentical}
