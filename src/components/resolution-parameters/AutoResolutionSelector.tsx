import React, {useRef} from 'react';
import './AutoResolutionSelector.scss';

type AutoImageResolutionSelectorProps = {
	autoResolutionBase: number;
	setAutoResolutionBase: (newAutoResolutionBase: number) => void;
	useLineBase: boolean;
	setUseLineBase: (newUseLineBase: boolean) => void;
};

export const AutoResolutionSelector = (props: AutoImageResolutionSelectorProps) => (
	<div className={'auto-resolution-panel'}>
		<p>Define the number of characters per line or column</p>

		<div>
			<div>
				<input type={'radio'} name={'auto-resolution-base'} id={'auto-resolution-base-line'}
					checked={props.useLineBase}
					onClick={() => {
						props.setUseLineBase(true);
					}}/>
				<label htmlFor={'auto-resolution-base-line'}>Chars per line:</label>
			</div>
			<input type={'number'} placeholder={'Chars per line'} className={props.useLineBase ? '' : 'locked-input'}
				min={1}
				value={props.useLineBase ? props.autoResolutionBase : ''}
				onChange={e => {
					if (e.target.value === '' || e.target.value === '0') {
						return;
					}

					props.setAutoResolutionBase(parseInt(e.target.value, 10));
				}}/>
		</div>

		<div>
			<div>
				<input type={'radio'} name={'auto-resolution-base'} id={'auto-resolution-base-column'}
					checked={!props.useLineBase}
					onClick={() => {
						props.setUseLineBase(false);
					}}/>
				<label htmlFor={'auto-resolution-base-column'}>Chars per column:</label>
			</div>
			<input type={'number'} placeholder={'Chars per column'} className={props.useLineBase ? 'locked-input' : ''}
				min={1}
				value={props.useLineBase ? '' : props.autoResolutionBase}
				onChange={e => {
					if (e.target.value === '' || e.target.value === '0') {
						return;
					}

					props.setAutoResolutionBase(parseInt(e.target.value, 10));
				}}/>
		</div>

	</div>
);
