import React from 'react';
import './Cell.css';


class Cell extends React.Component{

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        // call up to the board to flip cells around this cell

        this.props.flipCellsAroundMe();
    }


    render(){
        let classes = "Cell " + (this.props.isLit ? "Cell-lit" : "");

        return(
            <td className={classes} onClick={this.handleClick}/>
        )
    }
}

export default Cell;