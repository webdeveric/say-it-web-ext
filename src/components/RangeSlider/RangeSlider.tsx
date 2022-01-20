import { Fragment, InputHTMLAttributes, VoidFunctionComponent } from 'react';
import cn from 'classnames';

import { TickMarks, TickMarksProps } from './TickMarks';

import * as styles from './RangeSlider.css';

export type RangeSliderProps = Pick<TickMarksProps, 'min' | 'max' | 'step'> &
  InputHTMLAttributes<HTMLInputElement> & {
    ticks?: boolean;
    maxTicks?: number;
  };

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RangeSlider: VoidFunctionComponent<RangeSliderProps> = ({
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
