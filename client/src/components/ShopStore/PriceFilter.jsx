import React from 'react'

export default () => {
    return (
        <aside className="wedget__categories pro--range">
            <h3 className="wedget__title">Filter by price</h3>
            <div className="content-shopby">
                <div className="price_filter s-filter clear">
                    <form action="#" method="GET">
                        <div id="slider-range"></div>
                        <div className="slider__range--output">
                            <div className="price__output--wrap">
                                <div className="price--output">
                                    <span>Price :</span><input type="text" id="amount"/>
                                </div>
                                <div className="price--filter">
                                    <a href="#">Filter</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </aside>
    )
}
