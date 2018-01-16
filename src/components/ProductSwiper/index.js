import React, { Component } from 'react'
import ProductItem from '../../components/ProductItem'
import { isEmpty } from 'react-redux-firebase'
import Swiper from 'react-id-swiper'

export default class ProductSwiper extends Component {
  handleInit(swiper) {
    swiper.update()
  }

  render() {
    const {
      products,
      showOnlyUser,
      uid
    } = this.props

    if (isEmpty(products)) {
      return false
    }

    return(
      <Swiper
        runCallbacksOnInit={false}
        loop={true}
        loopAdditionalSlides={4}
        loopedSlides={products.length}
        paginationClickable={true}
        autoheight={true}
        spaceBetween={10}
        slidesPerView={3}
        centeredSlides={true}
        onInit={this.handleInit}>
          {Object.keys(products).map((key) => (
            <div key={key}>
              {showOnlyUser && uid !== products[key].uid
                ? null
                : <div>
                    <ProductItem
                      id={key}
                      product={products[key]}
                    />
                  </div>
              }
            </div>
          ))}
      </Swiper>
    )
  }
}
