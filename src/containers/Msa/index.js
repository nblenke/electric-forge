import React from 'react'
import ReactIframeResizer from 'react-iframe-resizer-super'
import './styles.css'
import pdf from './msa.pdf'


export default () => (
  <div className="container about-page">
    <div className="row">
      <div className="col-xs-12">
        <ReactIframeResizer
          src={pdf}
          iframeResizerOptions={{
            log: false,
            checkOrigin: false,
            minHeight: 768,
            heightCalculationMethod: 'lowestElement',
          }}
        />
      </div>
    </div>
  </div>
)
