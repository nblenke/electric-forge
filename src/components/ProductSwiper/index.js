import React, { Component } from 'react'
import ProductItem from '../../components/ProductItem'
import { isEmpty } from 'react-redux-firebase'
import Swiper from 'react-id-swiper'
import './styles.css'

export default class ProductSwiper extends Component {
  handleInit(swiper) {
    swiper.update()
  }

  render() {
    const { hasPrice, products } = this.props

    if (isEmpty(products)) {
      return false
    }

    const params = {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      onInit: this.handleInit,
      runCallbacksOnInit: false,
      loop: true,
      autoheight: true,
      slidesPerView: 4,
      spaceBetween: 20,
      breakpoints: {
        1024: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 1,
        }
      }
    }

    return(
      <div className="product-swiper">
        <Swiper {...params}>
          {Object.keys(products).map((key) => (
            products[key].purchased
              ? null
              : (
                <div key={key}>
                  <ProductItem id={key} product={products[key]} hasPrice={hasPrice} />
                </div>
              )
          ))}
        </Swiper>
      </div>
    )
  }
}
