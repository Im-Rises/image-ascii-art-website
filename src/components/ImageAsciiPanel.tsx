import React, {useRef, useState} from 'react';
import {ImageAscii, ArtTypeEnum} from 'image-ascii-art';
import CopyImage from '../images/copy.svg';
import './ImageAsciiPanel.scss';
import GitHubProjectPanel from './GitHubProjectPanel';
import {AUTHOR, GITHUB_URL} from '../constants/pixel-ascii';

const ImageAsciiPanel = () => {
	// Image data elements
	const [image, setImage] = useState<HTMLImageElement>();
	const [isImageReady, setIsImageReady] = useState(false);
	const [useColor, setUseColor] = useState(false);
	const [finalCharsPerLine, setFinalCharsPerLine] = useState(0);
	const [finalCharsPerColumn, setFinalCharsPerColumn] = useState(0);

	// Settings elements for ImageAscii
	const preTagRef = useRef<HTMLPreElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const parentRef = useRef<HTMLDivElement>(null);

	// Settings for manual resolution
	const [charsPerLine, setCharsPerLine] = useState(160);
	const [charsPerColumn, setCharsPerColumn] = useState(90);
	const keepAspectRatioCheckboxRef = useRef<HTMLInputElement>(null);
	const charsPerLineAreaRef = useRef<HTMLInputElement>(null);
	const charsPerColumnAreaRef = useRef<HTMLInputElement>(null);
	const [aspectRatio, setAspectRatio] = useState(charsPerLine / charsPerColumn);
	const [useAutoAspectRatio, setUseAutoAspectRatio] = useState(true);

	// Settings to calculate the chars per line/column based on the image aspect ratio
	const [selectedAutoResolutionBase, setSelectedAutoResolutionBase] = useState<'line' | 'column'>('line');
	const [autoResolutionBase, setAutoResolutionBase] = useState(200);
	const autoResolutionBaseRef = useRef<HTMLInputElement>(null);

	const calculateCharsPerColumn = (image: HTMLImageElement) => Math.round(charsPerLine * (image.height / image.width));
	const calculateCharsPerLine = (image: HTMLImageElement) => Math.round(charsPerColumn * (image.width / image.height));

	// Handle the copy to clipboard button click
	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Text copied to clipboard');
		} catch (err: unknown) {
			console.error('Failed to copy text: ', err);
		}
	};

	const handleImageChange = () => {
		if (inputRef.current?.files?.length) {
			const file = inputRef.current.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result !== '') {
					const img = new Image();
					img.src = reader.result as string;
					img.onload = () => {
						if (useAutoAspectRatio) {
							const newCharsPerLine = selectedAutoResolutionBase === 'line' ? autoResolutionBase : calculateCharsPerLine(img);
							const newCharsPerColumn = selectedAutoResolutionBase === 'line' ? calculateCharsPerColumn(img) : autoResolutionBase;
							setFinalCharsPerLine(newCharsPerLine);
							setFinalCharsPerColumn(newCharsPerColumn);
						} else {
							setFinalCharsPerLine(charsPerLine);
							setFinalCharsPerColumn(charsPerColumn);
						}

						setIsImageReady(true);
						setImage(img);
					};
				}
			};

			reader.readAsDataURL(file);
		}
	};

	const toggleColor = () => {
		setUseColor(!useColor);
	};

	const ejectImage = () => {
		setIsImageReady(false);
		setImage(undefined);
		setUseColor(false);
	};

	return (
		<div>
			{isImageReady
				? (
					<>
						<div className={'image-ascii-panel'}>
							<div ref={parentRef} className={'image-ascii-holder'}>
								<ImageAscii
									image={image!}
									parentRef={parentRef}
									artType={useColor ? ArtTypeEnum.ASCII_COLOR_BG_IMAGE : ArtTypeEnum.ASCII}
									charsPerLine={finalCharsPerLine}
									charsPerColumn={finalCharsPerColumn}
									fontColor={'white'}
									backgroundColor={'black'}
									preTagRef={preTagRef}
								/>
							</div>
							<div>
								<button
									className={`${'Button-Toggle-Mode'} ${useColor ? 'Button-Toggle-BW' : 'Button-Toggle-Color'}`}
									onClick={toggleColor}>
								</button>
								<button className={'Button-Copy-Clipboard'}
									onClick={async () => copyToClipboard(preTagRef.current!.innerText)}>
									<img src={CopyImage} alt={'CopyLogoImage'}/>
								</button>
								<button className={'Button-Eject-Image'} onClick={ejectImage}>
								</button>
							</div>
						</div>
					</>
				)
				: (
					<>
						<h1 className={'app-title'}>Image ASCII</h1>

						<div className={'mode-selection-container'}>
							<h2>Mode selection</h2>
							<input type={'radio'} name={'mode-selection'} id={'mode-selection-manual'}
								   checked={!useAutoAspectRatio}
								   onChange={() => {
									   setUseAutoAspectRatio(false);
								   }}/>
							<label htmlFor={'mode-selection-manual'}>Manual resolution</label>
							<input type={'radio'} name={'mode-selection'} id={'mode-selection-auto'}
								   checked={useAutoAspectRatio}
								   onChange={() => {
									   setUseAutoAspectRatio(true);
								   }}/>
							<label htmlFor={'mode-selection-auto'}>Auto resolution</label>
						</div>

						<div className={'image-input-container'}>
							{useAutoAspectRatio ? (
								<>
									<input type={'radio'} name={'auto-resolution-base'}
										   id={'auto-resolution-base-line'}/>
									<label htmlFor={'auto-resolution-base-line'}
									>Define chars per line</label>
									<input type={'radio'} name={'auto-resolution-base'}
										   id={'auto-resolution-base-column'}/>
									<label htmlFor={'auto-resolution-base-column'}
									>Define chars per column</label>

									<p>{
										selectedAutoResolutionBase === 'line' ? 'Chars per line' : 'Chars per column'
									}</p>
									<input type={'number'} placeholder={'Chars per line/column'}
										   value={autoResolutionBase} ref={autoResolutionBaseRef} min={1}
										   onChange={e => {
											   if (e.target.value === '') {
												   autoResolutionBaseRef.current!.value = autoResolutionBase.toString();
												   return;
											   }

											   setAutoResolutionBase(parseInt(e.target.value, 10));
										   }}/>
								</>
							) : (
								<>
									<input type={'number'} placeholder={'Chars per line'} defaultValue={charsPerLine}
										   ref={charsPerLineAreaRef} min={1}
										   onChange={e => {
											   if (e.target.value === '') {
												   charsPerLineAreaRef.current!.value = charsPerLine.toString();
												   return;
											   }

											   const newCharsPerLine = parseInt(e.target.value, 10);
											   setCharsPerLine(newCharsPerLine);
											   if (keepAspectRatioCheckboxRef.current?.checked) {
												   const newCharsPerColumn = Math.round(newCharsPerLine / aspectRatio);
												   setCharsPerColumn(newCharsPerColumn);
												   charsPerColumnAreaRef.current!.value = newCharsPerColumn.toString();
											   }
										   }}/>
									<input type={'number'} placeholder={'Chars per column'}
										   defaultValue={charsPerColumn}
										   ref={charsPerColumnAreaRef} min={1}
										   onChange={e => {
											   if (e.target.value === '') {
												   charsPerColumnAreaRef.current!.value = charsPerColumn.toString();
												   return;
											   }

											   const newCharsPerColumn = parseInt(e.target.value, 10);
											   setCharsPerColumn(newCharsPerColumn);
											   if (keepAspectRatioCheckboxRef.current?.checked) {
												   const newCharsPerLine = Math.round(newCharsPerColumn * aspectRatio);
												   setCharsPerLine(newCharsPerLine);
												   charsPerLineAreaRef.current!.value = newCharsPerLine.toString();
											   }
										   }}/>
									<input type={'checkbox'} ref={keepAspectRatioCheckboxRef}
										   onChange={e => {
											   if (e.target.checked) {
												   setAspectRatio(charsPerLine / charsPerColumn);
											   }
										   }}/>
								</>
							)
							}

							<input ref={inputRef} style={{display: 'none'}} type='file' accept='image/*'
								   onChange={handleImageChange}/>
							<button className={'image-input-button'} onClick={() => {
								inputRef.current?.click();
							}}>Select image
							</button>
						</div>
						<GitHubProjectPanel link={GITHUB_URL}
							author={AUTHOR}/>
					</>
				)
			}
		</div>
	);
};

export default ImageAsciiPanel;
