import * as React from 'react';
import {Page, Navbar, ContentBlockTitle, Swiper, SwiperSlide} from 'framework7-react';


const swiperItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const swiperHeight = {
    height: "200px"
};

const swiperParams = {
    slidesPerView: 3, 
    spaceBetween: 20  
}

const swiperMap = (item: number) => {
    return (<SwiperSlide key={item} className="bg-white color-black">{`Slide ${item}`}</SwiperSlide>);
}

export const SwiperPage = () => {
    return (
        <Page>
            <Navbar backLink="Back" title="Swiper" sliding />

            <ContentBlockTitle>Default</ContentBlockTitle>
            <Swiper style={swiperHeight}>
                {
                    swiperItems.map(item => {
                        return <SwiperSlide key={item} className="bg-white color-black">{`Slide ${item}`}</SwiperSlide>;
                    })
                }
            </Swiper>

            <ContentBlockTitle>Navigation</ContentBlockTitle>
            <Swiper pagination next-button prev-button scrollbar style={swiperHeight}>
                {
                    swiperItems.map(item => {
                        return <SwiperSlide key={item} className="bg-white color-black">{`Slide ${item}`}</SwiperSlide>;
                    })
                }
            </Swiper>

            {/*<ContentBlockTitle>Slides Per View</ContentBlockTitle>
            <Swiper params={swiperParams} pagination next-button prev-button scrollbar style={swiperHeight}>
                {
                    swiperItems.map((item) => {
                        swiperMap(item);
                    })
                }
            </Swiper>*/}
        </Page>
    );
}