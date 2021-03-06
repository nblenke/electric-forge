import { FILES_PATH } from './constants'
import 'whatwg-fetch'
import Moment from 'moment'

export const setProductImagePath = (productId, firebase) => {
  const storageRef = firebase.storage().ref()
  const ref = storageRef.child(`${FILES_PATH}/${productId}`)

  ref.getDownloadURL()
    .then((imgPath) => {
      firebase.update(`/products/${productId}`, { imgPath })
    })
    .catch((err) => {
      console.log(err.code)
    })
}

export const getEthermineData = ( productId, product, firebase) => {
  const { ethermineId, ethermineUpdateNext } = product
  const format = 'YYYY-MM-DD HH:mm Z'
  const timeToUpdateNewEncoded = window.encodeURIComponent(Moment().add(2, 'hours').format(format))
  const timeToUpdateFromStore = Moment(window.decodeURIComponent(ethermineUpdateNext), format)

  // new rig OR its time to update
  if (!ethermineUpdateNext || Moment().isAfter(timeToUpdateFromStore)) {
    // https://api.ethermine.org/miner/59d9418eAa0EE5EAEc7c1AA828071d0C8c24BAd1/currentStats
    fetch(`https://api.ethermine.org/miner/${ethermineId}/currentStats`)
      .then((response) => response.json())
      .then((json) => {
        const { data } = json
        console.log('fetching ethermine data')

        // dev: http://localhost:5001/electric-forge-dev/us-central1/
        // prod: https://us-central1-electric-forge-dev.cloudfunctions.net

        fetch(`https://us-central1-electric-forge-dev.cloudfunctions.net/updateProductEthermineData?productId=${productId}`, {
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ethermineActiveWorkers: data.activeWorkers,
            ethermineBtcPerMin: data.btcPerMin,
            ethermineAverageHashrate: data.averageHashrate,
            ethermineCoinsPerMin: data.coinsPerMin,
            ethermineCurrentHashrate: data.currentHashrate,
            // ethermineLastSeen: data.lastSeen,
            // ethermineTime: data.time,
            ethermineUpdateNext: timeToUpdateNewEncoded,
            ethermineUnpaid: data.unpaid,
            ethermineUsdPerMin: data.usdPerMin,
            ethermineValidShares: data.validShares,
          })
        })
      })
  }
}
