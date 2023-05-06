import React, {useRef, useState} from 'react';
import {ImageAscii, ArtTypeEnum} from 'image-ascii-art';
import CopyImage from '../images/copy.svg';
import demoImage from '../images/demoImage.png';
import './ImageAsciiPanel.scss';

const ImageAsciiPanel = () => {
	// Define the ascii art chars per line
	const charsPerLine = 100;
	const [charsPerColumn, setCharsPerColumn] = useState(0);
	const [useColor, setUseColor] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const preTagRef = useRef<HTMLPreElement>(null);
	const parentRef = useRef<HTMLDivElement>(null);
	// const [isImageSelected, setIsImageSelected] = useState(false);
	const [imageSrc, setImageSrc] = useState<string>('');

	// Calculate the chars per column according to the aspect ratio of the image
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

	const toggleColor = () => {
		setUseColor(!useColor);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImageSrc(reader.result as string);
		};
	};

	return (
		<div>
			{imageSrc
				? (
					<>
						<div className={'image-ascii-panel'}>
							<div ref={parentRef} className={'image-ascii-holder'}>
								<ImageAscii
									// imageSrc={imageSrc}
									imageSrc={demoImage}
									parentRef={parentRef}
									charsPerLine={charsPerLine}
									charsPerColumn={charsPerColumn}
									fontColor={'white'}
									backgroundColor={'black'}
									artType={useColor ? ArtTypeEnum.ASCII_COLOR_BG_IMAGE : ArtTypeEnum.ASCII}
									preTagRef={preTagRef}
								/>
							</div>
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
						</div>
					</>
				)
				: (
					<>
						<h1 className={'app-title'}>Image ASCII</h1>
						<div className={'image-input-container'}>
							<input ref={inputRef} style={{display: 'none'}} type='file' accept='image/*'
								onChange={handleInputChange}/>
							<button className={'image-input-button'} onClick={() => {
								inputRef.current?.click();
							}}>Select image
							</button>
						</div>
					</>
				)
			}
		</div>
	);
};

export default ImageAsciiPanel;
