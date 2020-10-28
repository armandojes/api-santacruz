const forEachObject = (object, handler) => {
  const keys = Object.keys(object)
  keys.forEach(currentKey => {
    const currentValue = object[currentKey]
    handler(currentValue, currentKey)
  })
}

export default forEachObject
