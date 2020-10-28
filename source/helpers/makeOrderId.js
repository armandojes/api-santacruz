const makeOrderId = () => {
  const date = new Date()
  const hr = date.getHours()
  const min = date.getMinutes()
  const seg = date.getSeconds()
  const mili = date.getMilliseconds()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear().toString()
  const formatedmonth = month < 10 ? `0${month}` : month.toString()
  const oId = `${year}${formatedmonth}${day}${hr}${min}${seg}${mili}`
  return oId
}

export default makeOrderId
