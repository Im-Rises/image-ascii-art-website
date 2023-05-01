// <reference types="react-scripts" />
declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.webp';

// declare module '*.svg';
declare module '*.svg' {
	const path: string;
	export default path;
}
