import React, {useEffect, useRef, useState} from 'react';
import {ImageAscii, ArtTypeEnum} from 'image-ascii-art';
import CopyImage from '../images/copy.svg';
import './ImageAsciiPanel.scss';

const ImageAsciiPanel = () => {
	// Define the ascii art chars per line
	const charsPerLine = 200;
	const [charsPerColumn, setCharsPerColumn] = useState(0);
	const [image, setImage] = useState<HTMLImageElement>();
	const [isImageReady, setIsImageReady] = useState(false);
	const [useColor, setUseColor] = useState(false);

	const preTagRef = useRef<HTMLPreElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const parentRef = useRef<HTMLDivElement>(null);

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

	const handleImageChange = () => {
		if (inputRef.current?.files?.length) {
			const file = inputRef.current.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result !== '') {
					const img = new Image();
					img.src = reader.result as string;
					img.onload = () => {
						setCharsPerColumn(calculateCharsPerColumn(img));
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

	// // Default image (Uncomment it to use it)
	// useEffect(() => {
	// 	const img = new Image();
	// 	img.src = ImageDemo;
	// 	img.onload = () => {
	// 		setCharsPerColumn(calculateCharsPerColumn(img));
	// 		setIsImageReady(true);
	// 		setImage(img);
	// 	};
	// }, []);

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
									charsPerLine={charsPerLine}
									charsPerColumn={charsPerColumn}
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
						<div className={'image-input-container'}>
							<input ref={inputRef} style={{display: 'none'}} type='file' accept='image/*'
								onChange={handleImageChange}/>
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
