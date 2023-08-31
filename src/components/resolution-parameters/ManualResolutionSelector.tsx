import React, {useRef, useState} from 'react';
import './ManualResolutionSelector.scss';

type ManualImageResolutionSelectorProps = {
	charsPerLine: number;
	charsPerColumn: number;
	setCharsPerLine: (newCharsPerLine: number) => void;
	setCharsPerColumn: (newCharsPerColumn: number) => void;
};

export const ManualResolutionSelector = (props: ManualImageResolutionSelectorProps) => {
	const keepAspectRatioCheckboxRef = useRef<HTMLInputElement>(null);
	const charsPerLineAreaRef = useRef<HTMLInputElement>(null);
	const charsPerColumnAreaRef = useRef<HTMLInputElement>(null);
	const [aspectRatio, setAspectRatio] = useState(props.charsPerLine / props.charsPerColumn);

	return (
		<div className={'manual-resolution-panel'}>
			<p>Define the number of characters per line and column</p>

			<div>
				<label htmlFor={'chars-per-line'}>Chars per line:</label>
				<input type={'number'} placeholder={'Chars per line'}
					defaultValue={props.charsPerLine}
					ref={charsPerLineAreaRef} min={1}
					onChange={e => {
						if (e.target.value === '' || e.target.value === '0') {
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
			</div>

			<div>
				<label htmlFor={'chars-per-column'}>Chars per column:</label>
				<input type={'number'} placeholder={'Chars per column'}
					defaultValue={props.charsPerColumn}
					ref={charsPerColumnAreaRef} min={1}
					onChange={e => {
						if (e.target.value === '' || e.target.value === '0') {
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
			</div>
			<div className={'keep-aspect-ratio'}>
				<input type={'checkbox'} ref={keepAspectRatioCheckboxRef} id={'keep-aspect-ratio'}
					onChange={e => {
						if (e.target.checked) {
							setAspectRatio(props.charsPerLine / props.charsPerColumn);
						}
					}}/>
				<label htmlFor={'keep-aspect-ratio'}>Keep aspect ratio</label>
			</div>
		</div>
	);
};

