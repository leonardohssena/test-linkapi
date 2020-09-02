import axios from 'axios'
import config from '../config'

const js2xmlparser = require('js2xmlparser')

const { bling } = config

const requestApi = async (method, url, params = {}) => {
  const response = await axios({
    method,
    headers: {
      Accept: 'application/json'
    },
    baseURL: bling.baseUrl,
    url,
    params: { ...params, apikey: bling.apiToken }
  })

  const { erros, ...retorno } = response.data.retorno
  if (erros) throw erros[0]
  return retorno
}

const postOrder = async (jsonPedido) => {
  const params = {
    xml: js2xmlparser.parse('pedido', jsonPedido)
  }
  const response = await requestApi('POST', '/pedido/json', params)
  return response.pedidos[0].pedido
}

export {
  postOrder
}
