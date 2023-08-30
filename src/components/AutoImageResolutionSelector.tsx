import React, {useRef, useState} from 'react';

type AutoImageResolutionSelectorProps = {
	autoResolutionBase: number;
	setAutoResolutionBase: (newAutoResolutionBase: number) => void;
};

export const AutoImageResolutionSelector = (props: AutoImageResolutionSelectorProps) => {
	const autoResolutionBaseRef = useRef<HTMLInputElement>(null);
	const radioLineRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<input type={'radio'} name={'auto-resolution-base'}
				id={'auto-resolution-base-line'} ref={radioLineRef}/>
			<label htmlFor={'auto-resolution-base-line'}
			>Define chars per line</label>
			<input type={'radio'} name={'auto-resolution-base'}
				id={'auto-resolution-base-column'}/>
			<label htmlFor={'auto-resolution-base-column'}
			>Define chars per column</label>

			<p>{
				radioLineRef.current?.checked ? 'Chars per line' : 'Chars per column'
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
