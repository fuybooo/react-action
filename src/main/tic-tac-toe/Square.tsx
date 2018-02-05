import * as React from 'react';

interface SquareProps {
  value: string | null;
  onClick: Function;
}
interface SquareState {
  value: string;
}
export default class Square extends React.Component<SquareProps, SquareState> {
  render() {
    return (
      <button className={'square'} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}