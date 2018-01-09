import React from 'react'
import ProductItem from '../../components/ProductItem'
import { isEmpty } from 'react-redux-firebase'
export default ({ products, hasDelete }) => (
  <div>
    {!isEmpty(products) ?
      Object.keys(products).map((key) => (
        <ProductItem
          key={key}
          hasDelete={hasDelete}
          id={key}
          product={products[key]}
        />
      ))
    : null}
  </div>
)
