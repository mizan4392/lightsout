import React from 'react';
import './Board.css';
import Cell from './Cell/Cell';

class Board extends React.Component{

    static defaultProps ={
        nrows:5,
        ncols:5,
        chanceLightStartsOn:.25
    }
    
    constructor(props){
        super(props);

        //set Initial state
        this.state={
            hasWon:false,
            board:this.createBoard()
        }

    }

    /** create a bord nrows high / ncols wide,each cell randomly lit or unlit*/

    createBoard(){
        let board = [];
        //create array-of-arraays of true/false
         
        for(let y=0;y < this.props.nrows;y++){
            let row = [];
            for(let x=0;x < this.props.ncols;x++){
                row.push(Math.random() < this.props.chanceLightStartsOn)
            }
            board.push(row);
            
        }

        return board;
    }
    flipCellsAround(coord){

        let { ncols, nrows } = this.props;

        let board = this.state.board;
        let [y,x] = coord.split("-").map(Number);

        function flipCell(y,x){
            //if the corrd is actually on board ,flip it

            if(x >= 0 && x < ncols && y >= 0 && y < nrows){
                board[y][x] = !board[y][x];
            }
        }
        //Flip initial cell
        flipCell(y,x); //flip initial cell
        flipCell(y,x-1); //flip left
        flipCell(y,x+1); //flip right
        flipCell(y-1,x); //flip below
        flipCell(y+1,x); //flip above

       let hasWon =  board.every(row => row.every(cell => !cell));
       this.setState({board:board,hasWon:hasWon});
    }

    render(){

        let tbleBoard=[];

        for(let y=0;y < this.props.nrows;y++){
            let row = [];
            for(let x=0;x < this.props.ncols;x++){
                let coord =  `${y}-${x}`;
                row.push(<Cell key={coord} isLit={this.state.board[y][x]} flipCellsAroundMe={() => this.flipCellsAround(coord)}/>);
            }
            tbleBoard.push(<tr key={y}>{row}</tr>);  
        }
        

        return(

            <div>
                {this.state.hasWon ? (
                    <div className="Board-title">
                        <div className="Winner">
                            <span className="neon-orange">YOU</span>
                            <span className="neon-blue">WIN!</span>
                        </div>  
                    </div>
                ) : (
                <div>
                    <div className="Board-title">
                        <div className="neon-orange">LIGHTS</div>
                        <div className="neon-blue">OUT</div>
                    </div>
                    <table className="Board">
                        <tbody>
                            {tbleBoard}
                        </tbody>
                    </table>
                 </div>
                )}
            </div>

        )
    }

}

export default Board;