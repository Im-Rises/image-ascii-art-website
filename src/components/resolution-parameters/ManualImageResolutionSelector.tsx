import React, {useRef, useState} from 'react';

type ManualImageResolutionSelectorProps = {
	charsPerLine: number;
	charsPerColumn: number;
	setCharsPerLine: (newCharsPerLine: number) => void;
	setCharsPerColumn: (newCharsPerColumn: number) => void;
};

export const ManualImageResolutionSelector = (props: ManualImageResolutionSelectorProps) => {
	const keepAspectRatioCheckboxRef = useRef<HTMLInputElement>(null);
	const charsPerLineAreaRef = useRef<HTMLInputElement>(null);
	const charsPerColumnAreaRef = useRef<HTMLInputElement>(null);
	const [aspectRatio, setAspectRatio] = useState(props.charsPerLine / props.charsPerColumn);

	return (
		<>
			<input type={'number'} placeholder={'Chars per line'}
				defaultValue={props.charsPerLine}
				ref={charsPerLineAreaRef} min={1}
				onChange={e => {
					if (e.target.value === '') {
						charsPerLineAreaRef.current!.value = props.charsPerLine.toString();
						return;
					}

					const newCharsPerLine = parseInt(e.target.value, 10);
					props.setCharsPerLine(newCharsPerLine);
					if (keepAspectRatioCheckboxRef.current?.checked) {
						const newCharsPerColumn = Math.round(newCharsPerLine / aspectRatio);
						props.setCharsPerColumn(newCharsPerColumn);
						charsPerColumnAreaRef.current!.value = newCharsPerColumn.toString();
					}
				}}/>
			<input type={'number'} placeholder={'Chars per column'}
				defaultValue={props.charsPerColumn}
				ref={charsPerColumnAreaRef} min={1}
				onChange={e => {
					if (e.target.value === '') {
						charsPerColumnAreaRef.current!.value = props.charsPerColumn.toString();
						return;
					}

					const newCharsPerColumn = parseInt(e.target.value, 10);
					props.setCharsPerColumn(newCharsPerColumn);
					if (keepAspectRatioCheckboxRef.current?.checked) {
						const newCharsPerLine = Math.round(newCharsPerColumn * aspectRatio);
						props.setCharsPerLine(newCharsPerLine);
						charsPerLineAreaRef.current!.value = newCharsPerLine.toString();
					}
				}}/>
			<input type={'checkbox'} ref={keepAspectRatioCheckboxRef}
				onChange={e => {
					if (e.target.checked) {
						setAspectRatio(props.charsPerLine / props.charsPerColumn);
					}
				}}/>
		</>
	);
};
