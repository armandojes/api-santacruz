import { database, snapShotParser } from 'core/index'
import firebase from 'firebase-admin'

const webhookpaypal = async (requests, response) => {
  var data = null
  console.log('requests', requests.body)

  // check ebent type
  console.log('condition::false', requests.body.event_type !== 'CHECKOUT.ORDER.APPROVED')
  if (requests.body.event_type !== 'CHECKOUT.ORDER.APPROVED') return response.success({})

  // get document data
  try {
    var documentsPath = requests.body.resource.purchase_units[0].custom_id
    data = await database.doc(documentsPath).get()
    data = snapShotParser(data)
    console.log('data', data)
  } catch (error) {
    return response.success()
  }

  // verify status
  if (data.status === 'payed') {
    return response.success()
  }

  // update status to payed
  await database.doc(documentsPath).update({
    status: 'payed',
    isViewed: false
  })

  // update counter when isViewd is true
  if (data.isViewed !== false) {
    try {
      await database.doc('/Ordenes/Pedidos').update({ counter: firebase.firestore.FieldValue.increment(1) })
    } catch (error) {
      await database.doc('/Ordenes/Pedidos').set({ counter: 1 })
    }
  }

  response.success({})
}

export default webhookpaypal
