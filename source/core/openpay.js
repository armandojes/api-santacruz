import Openpay from 'openpay'
import { isProduction, openPayCredentials } from '../config'

const openpay = new Openpay(openPayCredentials.clientId, openPayCredentials.key, isProduction)

export default openpay
