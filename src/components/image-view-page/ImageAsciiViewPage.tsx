import {ArtTypeEnum, ImageAscii} from 'image-ascii-art';
import CopyImage from '../../images/copy.svg';
import React, {useState} from 'react';
import './ImageAsciiViewPage.scss';

type ImageAsciiViewPageProps = {
	image: HTMLImageElement;
	finalCharsPerLine: number;
	finalCharsPerColumn: number;
	ejectImage: () => void;
};

export const ImageAsciiViewPage = (props: ImageAsciiViewPageProps) => {
	const [useColor, setUseColor] = useState(false);
	const parentRef = React.useRef<HTMLDivElement>(null);
	const preTagRef = React.useRef<HTMLPreElement>(null);

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

	return (
		<>
			<div className={'image-ascii-panel'}>
				<div ref={parentRef} className={'image-ascii-holder'}>
					<ImageAscii
						image={props.image}
						parentRef={parentRef}
						artType={useColor ? ArtTypeEnum.ASCII_COLOR_BG_IMAGE : ArtTypeEnum.ASCII}
						charsPerLine={props.finalCharsPerLine}
						charsPerColumn={props.finalCharsPerColumn}
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
					<button className={'Button-Eject-Image'} onClick={props.ejectImage}>
					</button>
				</div>
			</div>
		</>
	);
};
