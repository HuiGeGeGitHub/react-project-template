import React,{ Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
class Tablist extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }
    static propTypes = {
        headerData: PropTypes.object,
        current: PropTypes.number
    }
    handleClick(i) {
        if(this.props.current !== i) {
            this.props.setHeader({
                ...this.props.headerData,
                current: i
            });
        }
    }
    render() {
        let { list, current } = this.props.headerData;
        let listItems = list.map((v,i) =>{
            return <li className={"tab_item "+(current === i ? "active":"")} key={v.type} onClick={() => this.handleClick(i)}>
                <Link to={`${i>0?"/home_next":""}`}>{v.title}</Link>
            </li>
        });
        return (
            <ul className="right">
                {listItems}
                <li className="underline" style={{transform: `translateX(${current*26+10}vw)`}} ></li>
            </ul>
        )
    }
}
export default Tablist; 