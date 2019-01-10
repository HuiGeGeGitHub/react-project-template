import React, { Component } from "react";
import PropTypes from "prop-types";
import { Carousel } from "antd-mobile";

class Swiper extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        tableList: PropTypes.any
    };
    data = [
        {
            img: 'https://gw.alicdn.com/tfs/TB169ULzAvoK1RjSZFNXXcxMVXa-1280-520.jpg_720x720Q30s100.jpg_.webp',
            link: 'https://market.m.taopiaopiao.com/markets/TaoBaoMovie/zcqg_copy?wh_ttid=phone&s=tb&spm=dianying.tb.1.1&cityCode=330100',
        },
        {
            img: 'https://gw.alicdn.com/tfs/TB15b4RAyLaK1RjSZFxXXamPFXa-1280-520.jpg_720x720Q30s100.jpg_.webp',
            link: 'https://h5.m.taopiaopiao.com/app/dianying/pages/mini-video/index.html?tbVideoId=217529207887&videoId=984025&s=tb&spm=dianying.tb.1.1&cityCode=330100',
        },
        {
            img: 'https://gw.alicdn.com/tfs/TB1BqwfyFYqK1RjSZLeXXbXppXa-1280-520.jpg_720x720Q30s100.jpg_.webp',
            link: 'https://market.m.taopiaopiao.com/apps/abs/10/441/yshw?psId=1942003&_wvUseWKWebView=YES&wx_navbar_transparent=true&s=tb&spm=dianying.tb.1.1&cityCode=330100',
        }
    ]
    componentDidMount() {
    }
    render() {
        return (
            <Carousel
                autoplay={false}
                infinite
                beforeChange={(from, to) =>
                    console.log(`slide from ${from} to ${to}`)
                }
                afterChange={index => console.log("slide to", index)}
            >
                {this.data.map(val => (
                    <a
                        key={val.img}
                        href={val.link}
                        style={{
                            display: "inline-block",
                            width: "100%",
                            height: "150px"
                        }}
                    >
                        <img
                            src={val.img}
                            alt="导航"
                            style={{ width: "100%", verticalAlign: "top" }}
                            onLoad={(e) => {
                                console.log(e)
                                window.dispatchEvent(new Event("resize"));
                                // this.setState({ imgHeight: "auto" });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        );
    }
}
export default Swiper;