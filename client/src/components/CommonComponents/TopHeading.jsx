import React from 'react'
export default (props)=>{
    const {Title,Heading,Paragraph} = props;
    return(
        <div className="row">
            <div className="col-lg-12">
                <div className="section__title text-center">
                    <h2 className="title__be--2">{Title} <span className="color--theme">{Heading}</span></h2>
                    <p>{Paragraph}</p>
                </div>
            </div>
        </div>
    )
}