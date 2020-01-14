import Loader from 'react-loader-spinner'
import React from 'react'
 export default class Spinner extends React.Component {
  //other logic
    render() {
       const {type,height,width,marginTop,marginLeft}=this.props
     return(
      <Loader style={{marginTop:marginTop,marginLeft:marginLeft}}
         type={type}
         color="#FFAE00"
         height={height}
         width={width}
         timeout={1000}
      />
     );
    }
 }
