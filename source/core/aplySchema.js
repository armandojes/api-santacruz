const schema = (schema, data) => {
  const dataAllowed = Object.keys(schema)
  const secureData = {}

  Object.keys(data).forEach(keyname => {
    if (dataAllowed.includes(keyname)) {
      secureData[keyname] = data[keyname]
    }

    // apply default value
    dataAllowed.forEach(keyname => {
      const currentDefaultValue = schema[keyname]
      if (!!currentDefaultValue && (secureData[keyname] === null || secureData[keyname] === undefined)) {
        secureData[keyname] = currentDefaultValue
      }
    })
  })

  return secureData
}

export default schema
