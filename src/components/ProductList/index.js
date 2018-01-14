import React from 'react'
import ProductItem from '../../components/ProductItem'
import { isEmpty } from 'react-redux-firebase'

export default ({
    products,
    hasDelete,
    showOnlyUser,
    uid
  }) => (
  <div className="product-list">
    {!isEmpty(products) ?
      Object.keys(products).map((key) => (
        <div>
          {showOnlyUser && uid !== products[key].uid
            ? null
            : <div className="col-xs-6 col-sm-4 col-md-3">
                <ProductItem
                  key={key}
                  hasDelete={hasDelete}
                  id={key}
                  product={products[key]}
                />
              </div>
            }
        </div>
      ))
    : null}
  </div>
)
