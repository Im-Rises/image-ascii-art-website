import React, {useRef} from 'react';
import './AutoResolutionSelector.scss';

type AutoImageResolutionSelectorProps = {
	autoResolutionBase: number;
	setAutoResolutionBase: (newAutoResolutionBase: number) => void;
	useLineBase: boolean;
	setUseLineBase: (newUseLineBase: boolean) => void;
};

export const AutoResolutionSelector = (props: AutoImageResolutionSelectorProps) => {
	const autoResolutionBaseRef = useRef<HTMLInputElement>(null);

	return (
		<div className={'auto-resolution-panel'}>
			{/* <h2>Choose base colum or line</h2> */}
			<div className={'resolution-base-switcher'}>
				<div>
					<input type={'radio'} name={'auto-resolution-base'}
						id={'auto-resolution-base-line'} onChange={
							() => {
								props.setUseLineBase(true);
							}
						} checked={props.useLineBase}/>
					<label htmlFor={'auto-resolution-base-line'}
					>Define chars per line</label>
				</div>
				<div>
					<input type={'radio'} name={'auto-resolution-base'}
						id={'auto-resolution-base-column'}
						onChange={
							() => {
								props.setUseLineBase(false);
							}
						} checked={!props.useLineBase}/>
					<label htmlFor={'auto-resolution-base-column'}
					>Define chars per column</label>
				</div>
			</div>

			<div className={'resolution-base-selector'}>
				<label
					htmlFor={'auto-resolution-base'}>{props.useLineBase ? 'Chars per line:' : 'Chars per column:'}</label>
				<input type={'number'} placeholder={'Chars per line/column'}
					value={props.autoResolutionBase} ref={autoResolutionBaseRef} min={1}
					onChange={e => {
						if (e.target.value === '') {
							autoResolutionBaseRef.current!.value = props.autoResolutionBase.toString();
							return;
						}

						props.setAutoResolutionBase(parseInt(e.target.value, 10));
					}}/>
			</div>
		</div>
	);
};
