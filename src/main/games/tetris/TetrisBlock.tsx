import * as React from 'react';
interface TetrisBlockProps {
  squares: number[][];
}
export default class TetrisBlock extends React.Component<TetrisBlockProps, any> {

  constructor(props: TetrisBlockProps) {
    super(props);
  }
  render() {
    let blocks = [];
    for (let i = 0; i < this.props.squares.length; i++) {
      for (let j = 0; j < this.props.squares[0].length; j++) {
        let value = this.props.squares[i][j];
        let className = 'tetris-block ';
        if (value <= -20) {
          className += 'block-projection ';
          if (value === -20) {
            className += 'block-projection-0 ';
          } else if (value === -21) {
            className += 'block-projection-1 ';
          } else if (value === -22) {
            className += 'block-projection-2 ';
          } else if (value === -23) {
            className += 'block-projection-3 ';
          } else if (value === -24) {
            className += 'block-projection-4 ';
          } else if (value === -25) {
            className += 'block-projection-5 ';
          } else if (value === -26) {
            className += 'block-projection-6 ';
          }
        } else if (value >= 10 && value < 20) {
          className += 'block-fixed ';
          if (value === 10) {
            className += 'block-fixed-0 ';
          } else if (value === 11) {
            className += 'block-fixed-1 ';
          } else if (value === 12) {
            className += 'block-fixed-2 ';
          } else if (value === 13) {
            className += 'block-fixed-3 ';
          } else if (value === 14) {
            className += 'block-fixed-4 ';
          } else if (value === 15) {
            className += 'block-fixed-5 ';
          } else if (value === 16) {
            className += 'block-fixed-6 ';
          }
        } else if (value >= 20) {
          className += 'block-current ';
          if (value === 20) {
            className += 'block-current-0 ';
          } else if (value === 21) {
            className += 'block-current-1 ';
          } else if (value === 22) {
            className += 'block-current-2 ';
          } else if (value === 23) {
            className += 'block-current-3 ';
          } else if (value === 24) {
            className += 'block-current-4 ';
          } else if (value === 25) {
            className += 'block-current-5 ';
          } else if (value === 26) {
            className += 'block-current-6 ';
          }
        } else if (value === 0) {
          className += 'block-none ';
        }
        if (i === 19) {
          className += 'block-bottom ';
        }
        if (j === 0) {
          className += 'block-left ';
        }
        if (value >= 10 && this.props.squares[i - 1] && this.props.squares[i - 1][j] >= 10) {
          className += 'block-top ';
        }
        if (value >= 10 && this.props.squares[i][j + 1] && this.props.squares[i][j + 1] >= 10) {
          className += 'block-right ';
        }
        blocks.push(
          <div key={`${i}${j}`} className={className}/>
        );
      }
    }
    return (
      <div>
        {...blocks}
      </div>
    );
  }
}