import { getAllDeals } from './pipedrive'
import { postOrder } from './bling'
import OrderSchema from '../modules/orders/models/schema'

const castDealToOrderClient = ({ person_name, person_id }) => {
  const fone = person_id && person_id.phone
    ? person_id.phone.find(({ primary }) => primary).value
    : ''
  const email = person_id && person_id.email
    ? person_id.email.find(({ primary }) => primary).value
    : ''
  const id = person_id && person_id.value
    ? person_id.value
    : null
  return {
    id,
    nome: person_name,
    tipoPessoa: 'F',
    fone,
    email
  }
}

const castDealToOrderProducts = ({ products = [] }) => (
  products.map(({
    product_id, name, unit, quantity, item_price
  }) => ({
    codigo: product_id,
    descricao: name,
    un: unit,
    qtde: quantity,
    vlr_unit: item_price
  }))
)

const castDealToOrder = (deal) => ({
  cliente: castDealToOrderClient(deal),
  itens: {
    item: castDealToOrderProducts(deal)
  }
})

const castProductsToSave = (products = []) => (
  products.map(({
    product_id, item_price, ...product
  }) => ({
    id: product_id,
    price: item_price,
    ...product
  }))
)

const castDealAndOrderToSave = (deal, order) => {
  const {
    id, title, value, currency, won_time, products
  } = deal
  const { idPedido, numero, cliente } = order
  return {
    pipedriveId: id,
    blingId: idPedido,
    orderNumber: numero,
    client: {
      id: cliente.id,
      name: cliente.nome,
      email: cliente.email,
      phone: cliente.fone
    },
    title,
    value,
    currency,
    date: won_time ? new Date(won_time) : undefined,
    products: castProductsToSave(products)
  }
}

const dealsPipedriveToBlingOrders = async () => {
  try {
    const deals = await getAllDeals()
    await Promise.all(deals.map(async (deal) => {
      try {
        const jsonOrder = castDealToOrder(deal)
        console.log('Saving Order -', deal.title)
        const order = await postOrder(jsonOrder)
        const orderToSave = castDealAndOrderToSave(deal, { ...jsonOrder, ...order })
        await OrderSchema(orderToSave).save()

        console.log('Order Save Success -', deal.title)
      } catch (error) {
        console.log('Order Save Error -', deal.title, '\nReason: ', error)
      }
    }))
  } catch (error) {
    console.log(error)
  } finally {
    console.log('Deals Pipedrive To Bling Orders - Finalized')
  }
}

export {
  dealsPipedriveToBlingOrders
}
