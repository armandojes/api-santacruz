/* eslint-disable no-useless-escape */
import forEachObject from './forEachObject'

export const required = data => {
  return data !== null && data !== undefined
}

export const oneOfValue = (posibleValies, data) => {
  return posibleValies.includes(data)
}

export const type = (type, data) => {
  if (type === 'arrayOfPhones') return arrayOfPhones(data)
  if (type === 'array') if (Array.isArray(data)) return true
  if (type === 'object') if (!!data && typeof data === 'object' && data.constructor === Object) return true
  if (type === 'string') if (typeof data === 'string') return true
  if (type === 'number') if (typeof data === 'number') return true
  if (type === 'boolean') if (typeof data === 'boolean') return true
  if (type === 'email') if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(data)) return true
  return false
}

export const arrayOfPhones = (data) => {
  if (!Array.isArray(data)) return false
  if (data.length === 0 || data.length > 3) return false
  var hasError = false
  data.forEach(currentPhone => {
    if (!type('number', currentPhone) && !type('string', currentPhone)) hasError = true
    if (!length(10, currentPhone)) hasError = true
  })
  return !hasError
}

export const length = (length, data) => {
  if (!type('number', data) && !type('string', data)) return false
  if (data.toString().length === length) return true
  return false
}

export const minLength = (length, data) => {
  if (!type('number', data) && !type('string', data)) return false
  if (data.toString().length >= length) return true
  return false
}

export const maxLength = (length, data) => {
  if (!type('number', data) && !type('string', data)) return false
  if (data.toString().length <= length) return true
  return false
}

const validators = { type, oneOfValue, length, minLength, maxLength, arrayOfPhones }

/**
 * @param {object} rules schema of rules
 * @param {any} data value to test
 */
const multipleRules = (rules, data) => {
  var error = null
  if (!required(data)) {
    error = {
      error: 'required'
    }
  }
  forEachObject(rules, (ruleValue, ruleName) => {
    if (error) return null
    const validator = validators[ruleName]
    const isValid = validator(ruleValue, data)
    if (!isValid) {
      error = {
        error: ruleName,
        expect: ruleValue
      }
    }
  })
  return error || false
}

/**
 * @param {object} objectOfRules
 * @param {object} objectOfData
 * @return {null || object} object of error or null
 */
const object = (objectOfRules, objectOfData) => {
  const errors = {}
  forEachObject(objectOfRules, (currentRules, keyName) => {
    const currendData = objectOfData[keyName]
    const error = multipleRules(currentRules, currendData)
    if (error) errors[keyName] = error
  })

  return Object.keys(errors).length ? errors : null
}

/**
 *
 * @param {string} errorType
 * @param {string | number} expect
 * @param {string} name keyname error ocurred
 */
const makeParametherMessageError = (errorType, expect, name) => {
  if (errorType === 'type') {
    if (expect === 'email') return (`the parameter \`${name}\` must be of type email`)
    else if (expect === 'string') return (`the parameter \`${name}\` must be of type string`)
    else if (expect === 'array') return (`the parameter \`${name}\` must be of type array`)
    else if (expect === 'object') return (`the parameter \`${name}\` must be of type object`)
    else if (expect === 'number') return (`the parameter \`${name}\` must be of type number`)
    else if (expect === 'boolean') return (`the parameter \`${name}\` must be of type boolean`)
    else if (expect === 'arrayOfPhones') return (`the parameter \`${name}\` must be an array of a maximum of 3 valid phone numbers, each phone number must have 10 digits`)
  }

  if (errorType === 'required') {
    return (`the parameter \`${name}\` is required`)
  }

  if (errorType === 'oneOfValue') {
    const valuesHighLight = expect.map(val => `\`${val}\``)
    return (`the parameter \`${name}\` must have one of the next values ${valuesHighLight.join(', ')}`)
  }

  if (errorType === 'length') {
    return (`the parameter \`${name}\` must be ${expect} characters long`)
  }

  if (errorType === 'minLength') {
    return (`the parameter \`${name}\` must be a minimum of ${expect} characters`)
  }

  if (errorType === 'maxLength') {
    return (`the parameter \`${name}\` must be a maximum of ${expect} characters`)
  }
}
/**
 * @param {object} rules object of schema rules
 * @param {object} data
 * @return { null || array } array of error or null
 */
export const params = (rules, data) => {
  const errors = object(rules, data)
  if (!errors) return null
  const errorsMessages = []
  forEachObject(errors, (describeError, keyname) => {
    const { expect, error } = describeError
    const currentError = makeParametherMessageError(error, expect, keyname)
    errorsMessages.push(currentError)
  })
  return errorsMessages
}
