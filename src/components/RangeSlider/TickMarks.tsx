import type { FunctionComponent } from 'react';

export type TickMarksProps = {
  id: string;
  min: number;
  max: number;
  step: number;
  limit: number;
};

export const TickMarks: FunctionComponent<TickMarksProps> = ({ id, min, max, step, limit = Infinity }) => {
  const numTicks = Math.min(limit, (max - min) / step);

  if (!numTicks) {
    return null;
  }

  const options = [];
  const inc = (max - min) / numTicks;

  for (let i = 0, value = min; i <= numTicks; ++i, value += inc) {
    options.push(<option value={value.toFixed(2)} key={`tick-${i}`} />);
  }

  return <datalist id={id}>{options}</datalist>;
};
