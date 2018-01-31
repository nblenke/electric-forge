import React from 'react'
import ProductItem from '../../components/ProductItem'
import { isEmpty } from 'react-redux-firebase'

export default ({
    products,
    hasDelete,
    hasEdit,
    hasPurchaseBtn,
    isListView,
    onDelete,
    showPurchased,
    uid,
  }) => (
  <div>
    {!isEmpty(products) ?
      Object.keys(products).map((key) => (
        products[key].purchased && !showPurchased
          ? null
          : <div key={key} className={`col-xs-12${isListView ? ' list-view' : ' col-sm-4 col-md-3'}`}>
              <ProductItem
                hasDelete={hasDelete}
                hasEdit={hasEdit}
                hasDescription={false}
                hasPurchaseBtn={hasPurchaseBtn}
                id={key}
                product={products[key]}
                purchased={products[key].purchased}
                onDelete={onDelete} />
            </div>
          ))
    : null}
  </div>
)
