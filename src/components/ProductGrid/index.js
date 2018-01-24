import React from 'react'
import ProductItem from '../../components/ProductItem'
import { isEmpty } from 'react-redux-firebase'

export default ({
    products,
    hasDelete,
    hasEdit,
    onDelete,
    showPurchased,
    uid,
  }) => (
  <div className="product-list">
    {!isEmpty(products) ?
      Object.keys(products).map((key) => (
        <div key={key} className="col-xs-12 col-sm-4 col-md-3">
          <ProductItem
            hasDelete={hasDelete}
            hasEdit={hasEdit}
            hasDescription={false}
            id={key}
            product={products[key]}
            onDelete={onDelete}
            showPurchased={showPurchased}
          />
        </div>
      ))
    : null}
  </div>
)
