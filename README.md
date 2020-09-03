# Test - LinkApi
> Projeto criado para o processo seletivo da empresa LinkApi.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3001
npm run local

# serve for production
npm run start
```
## Endpoint
``` bash
# Base URL
http://localhost:3001/api/v1

# Get Orders
Metodo: GET
http://localhost:3001/api/v1/orders

# Get Orders Paginate
Metodo: GET
http://localhost:3001/api/v1/orders/paginate

# Filters
- title: String contendo o titulo da oportunidade no pipedrive a ser pesquisado, total ou parcial.
- value: Periodo do valor total da oportunidade. Valor inicial e final separados por virgula. Ex: 20,200 - Retornará as oportunidades com valor entre 20 e 200
- date: Periodo da data de ganho da oportunidade. Valor inicial e final separados por virgula. Ex: 2020-08-31,2020-09-07 - Retornará as oportunidades com data entre 31 de Outubro e 7 de Setembro

```