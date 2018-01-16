import React from 'react'
import ProductItem from '../../components/ProductItem'
import { isEmpty } from 'react-redux-firebase'

export default ({
    products,
    hasDelete,
    hasEdit,
    showOnlyUser,
    uid
  }) => (
  <div className="product-list">
    {!isEmpty(products) ?
      Object.keys(products).map((key) => (
        <div key={key}>
          {showOnlyUser && uid !== products[key].createdBy
            ? null
            : <div className="col-xs-6 col-sm-4 col-md-3">
                <ProductItem
                  hasDelete={hasDelete}
                  hasEdit={hasEdit}
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
