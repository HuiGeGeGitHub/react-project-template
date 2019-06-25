import React,{Component} from "react"
import { NavLink } from 'react-router-dom'
import { makeSnow } from "../../utils/tools";
import './NotFound.scss'

export default class NotFound extends Component{
    componentDidMount() {
        var canvas = document.getElementById('snow');
		makeSnow(canvas);
    }
    render () {
        return (
            <div className="content">
                <canvas className="snow" id="snow"></canvas>
                <div className="main-text">
                    <p>这个页面不存在啦~</p>
                    <NavLink to="/app" className="home-link">返回首页</NavLink>
                </div>
                <div className="ground">
                    <div className="mound">
                    <div className="mound_text">404</div>
                    <div className="mound_spade"></div>
                    </div>
                </div>
            </div>
        )
    }
}