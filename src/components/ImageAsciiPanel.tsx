import React, {useRef, useState} from 'react';
import './ImageAsciiPanel.scss';
import GitHubProjectPanel from './github/GitHubProjectPanel';
import {AUTHOR, GITHUB_URL} from '../constants/pixel-ascii';
import {AutoImageResolutionSelector} from './resolution-parameters/AutoImageResolutionSelector';
import {ManualImageResolutionSelector} from './resolution-parameters/ManualImageResolutionSelector';
import {ImageAsciiViewPage} from './image-view-page/ImageAsciiViewPage';
import {ModeResolutionSelector} from './mode-resolution-selector/ModeResolutionSelector';

const ImageAsciiPanel = () => {
	// Image data elements
	const [image, setImage] = useState<HTMLImageElement>();
	const [isImageReady, setIsImageReady] = useState(false);
	const [finalCharsPerLine, setFinalCharsPerLine] = useState(0);
	const [finalCharsPerColumn, setFinalCharsPerColumn] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);

	// Mode resolution selection
	const [useAutoAspectRatio, setUseAutoAspectRatio] = useState(true);

	// Settings for manual resolution
	const [manualCharsPerLine, setManualCharsPerLine] = useState(160);
	const [manualCharsPerColumn, setManualCharsPerColumn] = useState(90);

	// Settings to calculate the chars per line/column based on the image aspect ratio and a selected line/column base
	const [autoResolutionBase, setAutoResolutionBase] = useState(200);
	const [useLineBase, setUseLineBase] = useState(false);
	const calculateCharsPerColumn = (image: HTMLImageElement) => Math.round(manualCharsPerLine * (image.height / image.width));
	const calculateCharsPerLine = (image: HTMLImageElement) => Math.round(manualCharsPerColumn * (image.width / image.height));

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
							setFinalCharsPerLine(useLineBase ? autoResolutionBase : calculateCharsPerLine(img));
							setFinalCharsPerColumn(useLineBase ? calculateCharsPerColumn(img) : autoResolutionBase);
						} else {
							setFinalCharsPerLine(manualCharsPerLine);
							setFinalCharsPerColumn(manualCharsPerColumn);
						}

						setIsImageReady(true);
						setImage(img);
					};
				}
			};

			reader.readAsDataURL(file);
		}
	};

	const ejectImage = () => {
		setIsImageReady(false);
		setImage(undefined);
	};

	return (
		<div>
			{isImageReady
				? (
					<>
						<ImageAsciiViewPage image={image!}
							finalCharsPerLine={finalCharsPerLine}
							finalCharsPerColumn={finalCharsPerColumn}
							ejectImage={ejectImage}/>
					</>
				)
				: (
					<>
						<h1 className={'app-title'}>Image ASCII</h1>
						<>
							<ModeResolutionSelector useAutoAspectRatio={useAutoAspectRatio}
								setUseAutoAspectRatio={setUseAutoAspectRatio}/>
						</>

						<div className={'image-input-container'}>
							{
								useAutoAspectRatio
									? (
										<AutoImageResolutionSelector autoResolutionBase={autoResolutionBase}
											setAutoResolutionBase={setAutoResolutionBase}
											useLineBase={useLineBase}
											setUseLineBase={setUseLineBase}
										/>
									) : (
										<ManualImageResolutionSelector charsPerLine={manualCharsPerLine}
											charsPerColumn={manualCharsPerColumn}
											setCharsPerLine={setManualCharsPerLine}
											setCharsPerColumn={setManualCharsPerColumn}
										/>
									)
							}

							<>
								<input ref={inputRef} style={{display: 'none'}} type='file' accept='image/*'
									onChange={handleImageChange}/>
								<button className={'image-input-button'} onClick={() => {
									inputRef.current?.click();
								}}>Select image
								</button>
							</>
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
