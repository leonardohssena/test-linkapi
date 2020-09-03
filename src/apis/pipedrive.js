import axios from 'axios'
import config from '../config'

const { pipedrive } = config

const requestApi = async (method, url, params = {}) => {
  const response = await axios({
    method,
    headers: {
      Accept: 'application/json'
    },
    baseURL: pipedrive.baseUrl,
    url,
    params: { ...params, api_token: pipedrive.apiToken, limit: 1 }
  })

  let { data } = response.data

  if (response.data.additional_data && response.data.additional_data.pagination) {
    const { more_items_in_collection, next_start } = response.data.additional_data.pagination
    data = more_items_in_collection
      ? [ ...data, ...(await requestApi(method, url, { ...params, start: next_start })) ]
      : data
  }
  return data
}

const getProductDetails = async (productId) => {
  const product = await requestApi('GET', `/products/${productId}`)
  return product
}

const getProductsInDeal = async (dealId) => {
  let products = (await requestApi('GET', `/deals/${dealId}/products`)).filter((product) => product.enabled_flag)
  products = await Promise.all(products.map(async (product) => {
    const productDetails = await getProductDetails(product.product_id)
    return {
      ...productDetails,
      ...product
    }
  }))
  return products
}

const getAllDeals = async () => {
  console.log('Finding Deals')
  const params = {
    status: 'won'
  }
  let deals = await requestApi('GET', '/deals', params)
  deals = await Promise.all(deals.map(async (deal) => {
    const products = await getProductsInDeal(deal.id)
    return {
      ...deal,
      products
    }
  }))
  console.log('Finded', deals.length, 'Deals')
  return deals
}

export {
  getAllDeals
}
