import React from 'react'
import {connect} from 'react-redux'
const BreadCrumb = (props) => {
  let{image} = props;
    return (
        <div className="ht__bradcaump__area breadcrumbset" style={{backgroundImage: `url(${image})`}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bradcaump__inner text-center">
                            <h2 className="bradcaump-title">Shop Grid</h2>
                            <nav className="bradcaump-content">
                                <a className="breadcrumb_item" href="index.html">Home</a>
                                <span className="brd-separetor">/</span>
                                <span className="breadcrumb_item active">Shop Grid</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
return {
    image:state.admin.content.breadcrumbImage
}
}

export default connect(mapStateToProps,{})(BreadCrumb)