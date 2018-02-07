import * as React from 'react';
import TetrisBlock from './TetrisBlock';
import './tetris.scss';
import * as $ from 'jquery';
// 测试socket.io
// const io = require('socket.io-client');
// const socket = io.connect('http://localhost:3001');
// socket.on('test', (data: any) => {
//   console.log(data);
// });
const SQUARES = [
  // 竖杠
  [
    [
      [0, 20, 0, 0],
      [0, 20, 0, 0],
      [0, 20, 0, 0],
      [0, 20, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [20, 20, 20, 20],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 20, 0, 0],
      [0, 20, 0, 0],
      [0, 20, 0, 0],
      [0, 20, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [20, 20, 20, 20],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 正7
  [
    [
      [21, 21, 0, 0],
      [0, 21, 0, 0],
      [0, 21, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 21, 0],
      [21, 21, 21, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [21, 0, 0, 0],
      [21, 0, 0, 0],
      [21, 21, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [21, 21, 21, 0],
      [21, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 反7
  [
    [
      [22, 22, 0, 0],
      [22, 0, 0, 0],
      [22, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [22, 22, 22, 0],
      [0, 0, 22, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 22, 0, 0],
      [0, 22, 0, 0],
      [22, 22, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [22, 0, 0, 0],
      [22, 22, 22, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // T
  [
    [
      [0, 23, 0, 0],
      [23, 23, 23, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 23, 0, 0],
      [0, 23, 23, 0],
      [0, 23, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [23, 23, 23, 0],
      [0, 23, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 23, 0, 0],
      [23, 23, 0, 0],
      [0, 23, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 正2
  [
    [
      [24, 24, 0, 0],
      [0, 24, 24, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 24, 0, 0],
      [24, 24, 0, 0],
      [24, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [24, 24, 0, 0],
      [0, 24, 24, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 24, 0, 0],
      [24, 24, 0, 0],
      [24, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 反2
  [
    [
      [0, 25, 25, 0],
      [25, 25, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [25, 0, 0, 0],
      [25, 25, 0, 0],
      [0, 25, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 25, 25, 0],
      [25, 25, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [25, 0, 0, 0],
      [25, 25, 0, 0],
      [0, 25, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 田
  [
    [
      [26, 26, 0, 0],
      [26, 26, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [26, 26, 0, 0],
      [26, 26, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [26, 26, 0, 0],
      [26, 26, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [26, 26, 0, 0],
      [26, 26, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
];
class Next {
  constructor(public type: number = 0,
              public directive: number = 0, // 旋转的方向
              public squares: number[][] = Array(4).fill(Array(4).fill(0)),
              public origin: Origin = {x: 0, y: 3}) {
  }
  move(dir: Dir) {
    if (dir === 'down') {
      this.origin.x++;
    } else if (dir === 'left') {
      this.origin.y--;
    } else if (dir === 'right') {
      this.origin.y++;
    } else if (dir === 'rotate') {
      this.directive = (this.directive + 1) % 4;
      this.squares = SQUARES[this.type][this.directive];
    }
  }
  getRotateData() {
    return SQUARES[this.type][(this.directive + 1) % 4];
  }
}
function generateNext(type = Math.floor(Math.random() * 7), directive = Math.floor(Math.random() * 4)) {
  return new Next(type, directive, SQUARES[type][directive]);
}
interface TetrisState {
  squares: number[][];
  next: Next;
  current: Next;
  isGameOver: boolean;
}
interface Origin {
  x: number;
  y: number;
}
declare type Dir = 'down' | 'left' | 'right' | 'rotate';
let timer: NodeJS.Timer;
const INTERVAL = 20;
const velocity = 1000;
let count = 0;
const openProjection = true;
export default class Tetris extends React.Component<any, TetrisState> {
  constructor(props: any) {
    super(props);
    this.state = {
      squares: Array(20).fill(Array(10).fill(0)),
      next: generateNext(),
      current: generateNext(),
      isGameOver: false,
    };
  }
  componentDidMount() {
    this.bindKeyEvent();
  }
  bindKeyEvent() {
    $(document).off('keydown.tetris').on('keydown.tetris', (e) => {
      const keyCode = e.which;
      if (keyCode === 13) {
        this.start();
      } else {
        this.calcKeyEvent();
        if (keyCode === 37) {
          this.move('left');
        } else if (keyCode === 38) {
          this.move('rotate');
        } else if (keyCode === 39) {
          this.move('right');
        } else if (keyCode === 40) {
          this.move('down');
        } else if (keyCode === 32) {
          this.fall();
        }
      }
    });
  }
  fall() {
    while (this.move('down')) {}
  }
  calcKeyEvent() {

  }
  start() {
    this.setData();
    timer = setInterval(() => this.autoDown(), INTERVAL);
  }
  autoDown() {
    ++count;
    // 进行下降操作
    if ((count * INTERVAL) % velocity === 0) {
      this.move('down');
    }
    // 每20毫秒检测1次是否停止下降，进行固化操作(只检测)
    if (!this.move('down', true)) {
      // 固定
      this.setData(1);
      // 消行
      this.checkClear();
      // 判断游戏是否结束
      const isGameOver = this.checkGameOver();
      if (isGameOver) {
        this.stop();
        this.setState({isGameOver: true});
      } else {
        // 下一块
        this.preformNext();
      }

    }
  }
  checkClear() {
    let data = deepClone(this.state.squares);
    let line = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      let clear = true;
      for (let j = 0; j < data[0].length; j++) {
        // 判断fixed
        if (data[i][j] < 10 || data[i][j] >= 20) {
          clear = false;
          break;
        }
      }
      if (clear) {
        line++;
        for (let m = i; m > 0; m--) {
          for (let n = 0; n < data[0].length; n++) {
            data[m][n] = data[m - 1][n];
          }
        }
        for (let n = 0; n < data[0].length; n++) {
          data[0][n] = 0;
        }
        i++;
      }
    }
    this.setState({squares: data});
    return line;
  }
  checkGameOver() {
    let data = this.state.squares;
    let gameOver = false;
    for (let i = 0; i < 10; i++) {
      // 判断fixed
      if (data[1][i] >= 10 && data[1][i] < 20) {
        gameOver = true;
      }
    }
    return gameOver;
  }
  preformNext() {
    this.setState({
      current: this.state.next,
      next: generateNext()
    })
  }
  move(dir: Dir, onlyCheck = false): boolean {
    let nextPlace = {x: 0, y: 0};
    let currentSquares = this.state.current.squares;
    let x = this.state.current.origin.x;
    let y = this.state.current.origin.y;
    if (dir === 'down') {
      nextPlace = {
        x: x + 1,
        y: y
      }
    } else if (dir === 'left') {
      nextPlace = {
        x: x,
        y: y - 1
      }
    } else if (dir === 'right') {
      nextPlace = {
        x: x,
        y: y + 1
      }
    } else if (dir === 'rotate') {
      currentSquares = this.state.current.getRotateData();
    }
    if (this.isValid(nextPlace, currentSquares)) {
      if (!onlyCheck) {
        this.setData(0); // 清除游戏画面
        let current: Next = deepClone(this.state.current);
        current.move(dir);
        this.setState({current});
        this.setData();
      }
      return true;
    }
    return false;
  }
  isValid(pos: Origin, currentSquares?: number[][], squares?: number[][]) {
    const data = currentSquares || this.state.current.squares;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] > 0 && !this.check(pos, i, j, squares)) {
          return false;
        }
      }
    }
    return true;
  }
  setData(state?: number) {
    let squares = deepClone(this.state.squares);
    const current = this.state.current;
    if (openProjection) {
      // 清除投影
      for (let m = 0; m < squares.length; m++) {
        for (let n = 0; n < squares[m].length; n++) {
          let dataItem = squares[m][n];
          if (dataItem <= -20) {
            squares[m][n] = 0;
          }
        }
      }
      if (!state) {
        let projection: any = this.setProjection(squares);
        // 渲染投影
        if (projection) {
          for (let i = 0; i < projection.squares.length; i++) {
            for (let j = 0; j < projection.squares[i].length; j++) {
              let projectionItem = projection.squares[i][j];
              if (projectionItem > 2) {
                squares[projection.origin.x + i][projection.origin.y + j] = - projectionItem;
              }
            }
          }
        }
      }
    }
    for (let i = 0; i < current.squares.length; i++) {
      for (let j = 0; j < current.squares[i].length; j++) {
        if (this.check(current.origin, i, j)) {
          if (state === 1) {
            const item = squares[current.origin.x + i][current.origin.y + j];
            if (item >= 20) {
              squares[current.origin.x + i][current.origin.y + j] = + ('1' + (item + '')[1])
            }
          } else {
            squares[current.origin.x + i][current.origin.y + j] = (state === 0 ? state : current.squares[i][j]);
          }
        }
      }
    }
    this.setState({
      squares
    });
  }
  setProjection(squares: number[][]) {
    const current = this.state.current;
    let projection = this.checkDown(squares, current);
    let projections = [];
    while (projection) {
      projection = this.checkDown(squares, projection);
      projections.push(projection);
    }
    return projections.slice(-2, -1)[0];
  }
  checkDown(data: number[][], current: any) {
    let nextPlace = {x: current.origin.x + 1, y: current.origin.y};
    let nextData = current.squares;
    if (this.isValid(nextPlace, nextData, data)) {
      return {
        origin: nextPlace,
        squares: nextData
      };
    } else {
      return false;
    }
  }
  check(pos: Origin, x: number, y: number, squares?: number[][]) {
    let data = squares || this.state.squares;
    if (
      pos.x + x < 0 ||
      pos.x + x >= data.length ||
      pos.y + y < 0 ||
      pos.y + y >= data[0].length ||
      (data[pos.x + x][pos.y + y] >= 10 && data[pos.x + x][pos.y + y] < 20)
    ) {
      return false;
    }
    return true;
  }
  stop() {
    clearInterval(timer);
  }
  render() {
    return (
      <div>
        <h1>火拼俄罗斯</h1>
        <div className={'tetris-box'}>
          <div className={'host-box'}>
            <TetrisBlock squares={this.state.squares}/>
          </div>
          <div className={'next-box'}>
            <TetrisBlock squares={this.state.next.squares}/>
          </div>
        </div>
        <div className={'cb'}/>
        <div>
          <button onClick={this.stop.bind(this)}>停止</button>
          <button onClick={this.start.bind(this)}>开始</button>
        </div>
      </div>
    );
  }
}
function deepClone(obj: any) {
  let newObj = obj instanceof Array ? [] : {};
  if(typeof obj !== 'object') {
    return obj;
  } else {
    for(const i in obj) {
      newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
    }
  }
  return newObj;
}