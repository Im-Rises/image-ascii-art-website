import React, {useEffect, useRef, useState} from 'react';
import {ImageAscii, ArtTypeEnum} from 'image-ascii-art';
import Webcam from 'react-webcam';
import CopyImage from '../images/copy.svg';
import './ImageAsciiPanel.scss';

const ImageAsciiPanel = () => {
	// Define the ascii art chars per line
	const charsPerLine = 100;
	const [charsPerColumn, setCharsPerColumn] = useState(0);
	const [useColor, setUseColor] = useState(false);
	const preTagRef = useRef<HTMLPreElement>(null);

	const [imageSrc, setImageSrc] = useState('');

	// Define the refs
	const parentRef = useRef<HTMLDivElement>(null);

	// Calculate the chars per column according to the aspect ratio of the video
	const calculateCharsPerColumn = (image: HTMLImageElement) => Math.round(charsPerLine * (image.height / image.width));

	// Handle the copy to clipboard button click
	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Text copied to clipboard');
		} catch (err: unknown) {
			console.error('Failed to copy text: ', err);
		}
	};

	const toggleColorMode = () => {
		setUseColor(!useColor);
	};

	// Show the webcam only when it is ready, otherwise show a loading message
	return (
		<div className={'Camera-Ascii-Panel'} data-testid='camera-ascii-test' ref={parentRef}>
			<div>
				<button className={`${'Button-Toggle-Mode'} ${useColor ? 'Button-Toggle-BW' : 'Button-Toggle-Color'}`}
					onClick={() => {
						toggleColorMode();
					}}>
				</button>
				<button className={'Button-Copy-Clipboard'}
					onClick={async () => copyToClipboard(preTagRef.current!.innerText)}>
					<img src={CopyImage} alt={'CopyLogoImage'}/>
				</button>
			</div>
			<input type={'file'} accept={'image/*'} onChange={e => {
				const file = e.target.files![0];
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					const image = new Image();
					image.src = reader.result as string;
					image.onload = () => {
						setImageSrc(image.src);
						setCharsPerColumn(calculateCharsPerColumn(image));
					};
				};
			}}/>
			<div>
				{imageSrc === '' ? (
					<p className={'Camera-Ascii-Waiting'}>No inputted images</p>
				) : (
					<ImageAscii
						imageSrc={imageSrc}
						parentRef={parentRef}
						charsPerLine={charsPerLine}
						charsPerColumn={charsPerColumn}
						fontColor={'white'}
						backgroundColor={'black'}
						preTagRef={preTagRef}
						artType={useColor ? ArtTypeEnum.ASCII_COLOR_BG_IMAGE : ArtTypeEnum.ASCII}/>
				)
				}
			</div>
		</div>
	);
};

export default ImageAsciiPanel;
