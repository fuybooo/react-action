import * as React from 'react';
import Board from './Board';
import './game.scss';
interface GameProps {

}
interface GameState {
  history: Array<{
    squares: Array<string | null>,
    position: number[];
  }>;
  xIsNext: boolean;
  stepNumber: number;
  order: number;
}
function List(props: any) {
  return (
    <li key={props.value}>
      <a className={props.value === props.history.length - 1 ? 'bold' : ''} href="#" onClick={() => props.jumpTo(props.value)}>{props.desc}</a>
    </li>
  );
}
export default class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: []
      }],
      xIsNext: true,
      stepNumber: 0,
      order: 1,
    }
  }
  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat({
        squares: squares,
        position: [Math.ceil((i + 1) / 3), (i + 1) % 3 === 0 ? 3 : (i + 1) % 3]
      }),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: !(step % 2)
    });
  }
  sort() {
    this.setState({
      order: (this.state.order % 2) + 1
    });
  }
  render() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let moves;
    if (this.state.order === 1) {
      moves = history.map((step, move) => {
        return (
          <List key={move} value={move} history={history} jumpTo={(j: number) => this.jumpTo(j)} desc={
            move ? `Move #${move}: (${step.position[0]},${step.position[1]})` : 'Game start'
          }/>
        );
      });
    } else {
      moves = [];
      for (let i = history.length - 1; i >= 0; i --) {
        moves.push(
          <List key={i} value={i} history={history} jumpTo={(j: number) => this.jumpTo(j)} desc={
            i ? `Move #${i}: (${history[i].position[0]},${history[i].position[1]})` : 'Game start'
          }/>
        );
      }
    }
    let status;
    if (winner) {
      status = `Winner: ${winner.winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className={'game-wrap'}>
        <div className={'game'}>
          <div className={'game-board'}>
            <Board
              squares={current.squares}
              winnerLine={winner ? winner.line : null}
              onClick={(i: number) => this.handleClick(i)}/>
          </div>
        </div>
        <div className={'game-info'}>
          <div>
            {status}
          </div>
          <ol>
            {moves}
          </ol>
          <div>
            <button onClick={this.sort.bind(this)}>sort</button>
          </div>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares: Array<string | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        line: lines[i],
        winner: squares[a]
      };
    }
  }
  return null;
}