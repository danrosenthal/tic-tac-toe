import * as React from 'react';
import './Board.scss';

import {
  Cell,
  CellProps,
} from '../index';

export interface IProps {
  cells: CellProps[];
  onClick(event: React.MouseEvent<HTMLButtonElement>): any
}

export default function Board({cells, onClick}: IProps) {
  return (
    <div className="Board">
      {cells.map(({value, id}) => (
        <Cell
          value={value}
          id={id}
          key={id}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
