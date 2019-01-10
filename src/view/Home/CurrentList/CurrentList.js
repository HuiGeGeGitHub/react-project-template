import React from "react"
import Movies from "Components/Home/MoviesList/MoviesList";
import Swiper from "Components/Home/Swiper/Swiper";

function CurrentList (props) {
    return (
        <div>
            <Swiper />
            <Movies getlist={props.getlist}></Movies>
        </div>
    )
}
export default CurrentList;