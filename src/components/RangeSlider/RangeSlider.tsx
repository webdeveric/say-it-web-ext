import cn from 'classnames';
import { Fragment, type FunctionComponent, type InputHTMLAttributes } from 'react';

import * as styles from './RangeSlider.css';
import { type TickMarksProps, TickMarks } from './TickMarks.js';

export type RangeSliderProps = Pick<TickMarksProps, 'min' | 'max' | 'step'> &
  InputHTMLAttributes<HTMLInputElement> & {
    ticks?: boolean;
    maxTicks?: number;
  };

export const RangeSlider: FunctionComponent<RangeSliderProps> = ({
  id,
  value,
  onChange,
  min,
  max,
  step,
  ticks = false,
  maxTicks = max,
  className,
  ...rest
}) => {
  const floatValue = parseFloat(String(value));

  return (
    <Fragment>
      <input
        type="range"
        list={`${id}-ticks`}
        id={id}
        className={cn(styles.rangeSlider, className)}
        onChange={onChange}
        value={floatValue}
        min={min}
        max={max}
        step={step}
        {...rest}
      />
      {ticks && <TickMarks id={`${id}-ticks`} min={min} max={max} step={step} limit={Math.min(maxTicks, max / step)} />}
    </Fragment>
  );
};
