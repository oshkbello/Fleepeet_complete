import React from 'react'
import NewProductCarousel from './NewProductCarousel'
import TopHeading from '../../CommonComponents/TopHeading'
export default () => {
    return (
        <section className="wn__product__area brown--color pt--80  pb--30">
            <div className="container">
                <TopHeading Title="All" Heading="PRODUCTS" Paragraph="From art, history, science, mathematics and so much more. You can find books on a range of topics here" />
                <NewProductCarousel />
            </div>
        </section>
    )
}