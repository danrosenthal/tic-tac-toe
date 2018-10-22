import * as React from 'react';
import './Cell.scss';

export interface IProps {
  value: string | null;
  id: number;
  onClick(event: React.MouseEvent<HTMLButtonElement>): any;
}

export default function Cell({value, onClick, id}: IProps) {
  return (
    value ?
      (
        <div className="Cell">
          <span>
            {value}
          </span>
        </div>
      ) : (
        <div className="Cell">
          <button type="button" onClick={onClick} id={`${id}`}>
            -
          </button>
        </div>
      )
    );
}
