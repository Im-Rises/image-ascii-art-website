import React, {useRef, useState} from 'react';

type AutoImageResolutionSelectorProps = {
	autoResolutionBase: number;
	setAutoResolutionBase: (newAutoResolutionBase: number) => void;
	useLineBase: boolean;
	setUseLineBase: (newUseLineBase: boolean) => void;
};

export const AutoImageResolutionSelector = (props: AutoImageResolutionSelectorProps) => {
	const autoResolutionBaseRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<input type={'radio'} name={'auto-resolution-base'}
				id={'auto-resolution-base-line'} onChange={
					() => {
						props.setUseLineBase(true);
					}
				} checked={props.useLineBase}/>
			<label htmlFor={'auto-resolution-base-line'}
			>Define chars per line</label>
			<input type={'radio'} name={'auto-resolution-base'}
				id={'auto-resolution-base-column'}
				onChange={
					() => {
						props.setUseLineBase(false);
					}
				} checked={!props.useLineBase}/>
			<label htmlFor={'auto-resolution-base-column'}
			>Define chars per column</label>

			<p>{
				props.useLineBase ? 'Chars per line' : 'Chars per column'
			}</p>
			<input type={'number'} placeholder={'Chars per line/column'}
				value={props.autoResolutionBase} ref={autoResolutionBaseRef} min={1}
				onChange={e => {
					if (e.target.value === '') {
						autoResolutionBaseRef.current!.value = props.autoResolutionBase.toString();
						return;
					}

					props.setAutoResolutionBase(parseInt(e.target.value, 10));
				}}/>
		</>
	);
};
