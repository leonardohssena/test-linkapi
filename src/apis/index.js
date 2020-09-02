import { getAllDeals } from './pipedrive'
import { postOrder } from './bling'

const castDealToOrderClient = ({ person_name, person_id }) => {
  const fone = person_id && person_id.phone
    ? person_id.phone.find(({ primary }) => primary).value
    : ''
  const email = person_id && person_id.email
    ? person_id.email.find(({ primary }) => primary).value
    : ''
  return {
    nome: person_name,
    tipoPessoa: 'F',
    fone,
    email
  }
}

const castDealToOrderProducts = ({ products = [] }) => (
  products.map(({
    product_id, description, unit, quantity, item_price
  }) => ({
    codigo: product_id,
    descricao: description,
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

const dealsPipedriveToBlingOrders = async () => {
  try {
    const deals = await getAllDeals()
    for (const deal of deals) {
      try {
        const jsonOrder = castDealToOrder(deal)
        const order = await postOrder(jsonOrder)
        // TODO Save Order
        console.log(order)
      } catch (error) {
        console.log(error)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export {
  dealsPipedriveToBlingOrders
}
