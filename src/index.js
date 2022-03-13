import React from 'react';
import ReactDom from 'react-dom';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill('_'),
            xIsNext: false,
            winner: null,            
        }
    }
    
    handleClick(i) {
        if (this.state.squares[i] !== '_') {
            return;
        }

        let newSquares = this.state.squares.slice();        
        let xIsNext = this.state.xIsNext;
        newSquares[i] = xIsNext? 'O' : 'X';
        
        this.setState({
            squares: newSquares,
            xIsNext: !xIsNext,
            winner: this.getWinner(newSquares),
        });
    }

    getWinner(squares) {
        if (squares[0] !== '_' && squares[0] === squares[1] && squares[1] === squares[2]) {
            return squares[0];
        }
        if (squares[3] !== '_' && squares[3] === squares[4] && squares[4] === squares[5]) {
            return squares[3];
        }
        if (squares[6] !== '_' && squares[6] === squares[7] && squares[7] === squares[8]) {
            return squares[6];
        }

        if (squares[0] !== '_' && squares[0] === squares[4] && squares[4] === squares[8]) {
            return squares[0];
        }
        if (squares[2] !== '_' && squares[2] === squares[4] && squares[4] === squares[6]) {
            return squares[2];
        }

        if (squares[0] !== '_' && squares[0] === squares[3] && squares[3] === squares[6]) {
            return squares[0];
        }
        if (squares[1] !== '_' && squares[1] === squares[4] && squares[4] === squares[7]) {
            return squares[1];
        }
        if (squares[2] !== '_' && squares[2] === squares[5] && squares[5] === squares[8]) {
            return squares[2];
        }

    }

    renderSquare(i) {
        return <Square 
                value={this.state.squares[i]}
                onClick={() => {this.handleClick(i)}}
                />
    }

    playerStatus() {
        if (this.state.winner) {
            return <div style={{color: 'red'}}>Winner: {this.state.winner}</div>
        }

        return <div>Player: {this.state.xIsNext? 'O' : 'X'}</div>
    }

    render() {        
        return (          
          <>
            {this.playerStatus()}            
            <div>{this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}</div>
            <div>{this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}</div>
            <div>{this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}</div>
          </>              
        );
    }
}


function Square (props) {
    return (
        <button
            className='sqaure'
            onClick={() => {props.onClick()}}>
                {props.value}
        </button>
    )
}

class Game extends React.Component {
    render() {
        return (
                <Board/>           
        );
    }
}

function App() {
    return (
        <Game/>
    );
}

ReactDom.render(<App />, document.getElementById('root'));

