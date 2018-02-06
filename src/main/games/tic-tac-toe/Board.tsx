import * as React from 'react';
interface BoardProps {
  squares: Array<string | null>;
  onClick: Function;
  winnerLine: number[] | null;
}
interface BoardState {
}

/**
 * 函数定义简单组件
 */
function Square(props: any) {
  return (
    <button className={`square ${props.isWinnerLine ? 'red-6' : ''}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
export default class Board extends React.Component<BoardProps, BoardState> {
  render() {
    let isWinnerLine = (index: number) => {
      if (this.props.winnerLine) {
        return this.props.winnerLine.some(value => value === index);
      } else {
        return false;
      }
    };
    // let getSquareClassName = (index: number) => {
    //   if (isWinnerLine(index)) {
    //     return 'red-6';
    //   } else {
    //     return '';
    //   }
    // }
    return (
      <div>
        {
          ...(Array(3).fill(null).map((value, index) => {
            return (
              <div key={index} className={'board-row'}>
                {
                  ...(Array(3).fill(null).map((v, i) => {
                    return (
                      <Square isWinnerLine={isWinnerLine(i + index * 3)} key={i + index * 3} value={this.props.squares[i + index * 3]}
                              onClick={() => this.props.onClick(i + index * 3)}/>
                    );
                  }))
                }
              </div>
            );
          }))
        }
      </div>
    );
  }
}


