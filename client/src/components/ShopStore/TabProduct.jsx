import React from 'react'
import SingleProduct from '../Products/SingleProduct'

export default (props) => {
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
        <SingleProduct product = {props.product} like={props.like} length={props.length}/>
    </div>
  )
}
