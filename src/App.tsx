import React, {useEffect} from 'react';
import './App.scss';
import ImageAsciiPanel from './components/ImageAsciiPanel';
import GitHubProjectPanel from './components/GitHubProjectPanel';
import {AUTHOR, GITHUB_LINK_TEXT, GITHUB_URL} from './constants/pixel-ascii';

const App = () => (
	<div className='App'>
		<GitHubProjectPanel link={GITHUB_URL}
			author={AUTHOR}/>
		<ImageAsciiPanel/>
	</div>
);

export default App;
