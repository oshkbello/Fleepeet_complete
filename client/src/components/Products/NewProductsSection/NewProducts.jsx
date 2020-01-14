import React from 'react'
import NewProductCarousel from './NewProductCarousel'
import TopHeading from '../../CommonComponents/TopHeading'
export default () => {
    return (
        <section className="wn__product__area brown--color pt--80  pb--30">
            <div className="container">
                <TopHeading Title="All" Heading="PRODUCTS" Paragraph="There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form" />
                <NewProductCarousel />
            </div>
        </section>
    )
}