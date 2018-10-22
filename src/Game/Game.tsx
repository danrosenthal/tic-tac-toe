import * as React from 'react';
import './Game.scss';

import {
  Board,
  CellProps,
} from './components'

interface IState {
  cells: CellProps[],
  isPlayerXTurn: boolean,
  winner: string | null,
};

class Game extends React.Component<{}, IState> {
  public state: IState = {
    cells: this.initializeCells(3),
    isPlayerXTurn: true,
    winner: null,
  }

  public render() {
    const {cells, isPlayerXTurn, winner} = this.state;
    const currentPlayerValue = getUIValue(isPlayerXTurn);

    const feedbackMarkup = winner
      ? (<span><strong>{winner}</strong> is the winner</span>)
      : (<span>it's <strong>{currentPlayerValue}</strong>'s turn</span>)

    return (
      <div className="Game">
        <h1>tic tac toe</h1>
        <p>{feedbackMarkup}</p>
        <Board cells={cells} onClick={this.handleClick}/>
      </div>
    );
  }

  public handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    const {id} = target;
    const {cells, isPlayerXTurn} = this.state;

    cells[id].value = getUIValue(isPlayerXTurn);

    this.setState({
      cells,
      isPlayerXTurn: !isPlayerXTurn,
    }, this.setWinner);
  }

  private setWinner = () => {
    const {cells} = this.state;

    const horizontalConfigurations = [
      [cells[0], cells[1], cells[2]],
      [cells[3], cells[4], cells[5]],
      [cells[6], cells[7], cells[8]],
    ];

    const verticalConfigurations = [
      [cells[0], cells[3], cells[6]],
      [cells[1], cells[4], cells[7]],
      [cells[2], cells[5], cells[8]],
    ];

    const diagonalConfigurations = [
      [cells[0], cells[4], cells[8]],
      [cells[2], cells[4], cells[6]],
    ];

    const arrayFromConfigurations = [
      ...horizontalConfigurations,
      ...verticalConfigurations,
      ...diagonalConfigurations
    ];

    arrayFromConfigurations.forEach((configuration) => {
      const values = [
        configuration[0].value,
        configuration[1].value,
        configuration[2].value
      ];

      if (
        values[0] &&
        values[0] === values[1] &&
        values[1] === values[2]
      ) {
        this.setState({winner: values[0]});
      }
    });
  }

  private initializeCells(dimension: number) {
    const cells = []
    for (let i = 0; i < (dimension * dimension); i++) {
      cells.push(
        {
          id: i,
          onClick: this.handleClick,
          value: null,
        }
      )
    }
    return cells;
  }
}

function getUIValue(isPlayerXTurn: boolean) {
 return isPlayerXTurn ? 'x' : 'o';
}

export default Game;
