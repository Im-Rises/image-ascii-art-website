import React from 'react';
import './ModeResolutionSelector.scss';

type ModeResolutionSelectorProps = {
	useAutoAspectRatio: boolean;
	setUseAutoAspectRatio: (newUseAutoAspectRatio: boolean) => void;
};
export const ModeResolutionSelector = (props: ModeResolutionSelectorProps) => (
	<>
		<div className={'mode-selection'}>
			<h2>Mode selection</h2>
			<input type={'radio'} name={'mode-selection'} id={'mode-selection-auto'}
				checked={props.useAutoAspectRatio}
				onChange={() => {
					props.setUseAutoAspectRatio(true);
				}}/>
			<label htmlFor={'mode-selection-auto'}>Auto resolution</label>
			<input type={'radio'} name={'mode-selection'} id={'mode-selection-manual'}
				checked={!props.useAutoAspectRatio}
				onChange={() => {
					props.setUseAutoAspectRatio(false);
				}}/>
			<label htmlFor={'mode-selection-manual'}>Manual resolution</label>
		</div>
	</>
);
