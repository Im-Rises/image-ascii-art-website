import React, {useRef, useState} from 'react';
import './ImageAsciiPanel.scss';
import GitHubProjectPanel from './github/GitHubProjectPanel';
import {AUTHOR, GITHUB_URL} from '../constants/pixel-ascii';
import {AutoResolutionSelector} from './resolution-parameters/AutoResolutionSelector';
import {ManualResolutionSelector} from './resolution-parameters/ManualResolutionSelector';
import {ImageAsciiViewPage} from './image-view-page/ImageAsciiViewPage';
import {ModeResolutionSelector} from './mode-resolution-selector/ModeResolutionSelector';

const ImageAsciiPanel = () => {
	// Image data elements
	const [image, setImage] = useState<HTMLImageElement>();
	const [isImageReady, setIsImageReady] = useState(false);
	const [charsPerLine, setCharsPerLine] = useState(0);
	const [charsPerColumn, setCharsPerColumn] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);

	// Mode resolution selection
	const [useAutoAspectRatio, setUseAutoAspectRatio] = useState(true);

	// Settings for manual resolution
	const [manualCharsPerLine, setManualCharsPerLine] = useState(160);
	const [manualCharsPerColumn, setManualCharsPerColumn] = useState(90);

	// Settings to calculate the chars per line/column based on the image aspect ratio and a selected line/column base
	const [autoResolutionBase, setAutoResolutionBase] = useState(200);
	const [useLineBase, setUseLineBase] = useState(true);
	const calculateCharsPerColumn = (image: HTMLImageElement) => Math.round(autoResolutionBase * (image.height / image.width));
	const calculateCharsPerLine = (image: HTMLImageElement) => Math.round(autoResolutionBase * (image.width / image.height));

	// Handle image selection
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
							setCharsPerLine(useLineBase ? autoResolutionBase : calculateCharsPerLine(img));
							setCharsPerColumn(useLineBase ? calculateCharsPerColumn(img) : autoResolutionBase);
						} else {
							setCharsPerLine(manualCharsPerLine);
							setCharsPerColumn(manualCharsPerColumn);
						}

						setIsImageReady(true);
						setImage(img);
					};
				}
			};

			reader.readAsDataURL(file);
		}
	};

	// Handle image ejection
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
							finalCharsPerLine={charsPerLine}
							finalCharsPerColumn={charsPerColumn}
							ejectImage={ejectImage}/>
					</>
				)
				: (
					<>
						<h1 className={'app-title'}>Image ASCII</h1>
						<div className={'mode-selector-container'}>
							<ModeResolutionSelector useAutoAspectRatio={useAutoAspectRatio}
								setUseAutoAspectRatio={setUseAutoAspectRatio}/>
						</div>
						<div className={'image-input-container'}>
							<div className={'image-settings'}>
								{
									useAutoAspectRatio
										? (
											<AutoResolutionSelector autoResolutionBase={autoResolutionBase}
												setAutoResolutionBase={setAutoResolutionBase}
												useLineBase={useLineBase}
												setUseLineBase={setUseLineBase}
											/>
										) : (
											<ManualResolutionSelector charsPerLine={manualCharsPerLine}
												charsPerColumn={manualCharsPerColumn}
												setCharsPerLine={setManualCharsPerLine}
												setCharsPerColumn={setManualCharsPerColumn}
											/>
										)
								}
							</div>
							<div className={'image-input-button'}>
								<input ref={inputRef} style={{display: 'none'}} type='file' accept='image/*'
									onChange={handleImageChange}/>
								<button onClick={() => {
									inputRef.current?.click();
								}}>Select image
								</button>
							</div>
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
