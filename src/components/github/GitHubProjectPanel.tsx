import React from 'react';
import './GitHubProjectPanel.scss';
import GitHubLogoImage from '../images/github.svg';

type Props = {
	link: string;
	author: string;
};

const GitHubProjectPanel = (props: Props) => (
	<a href={props.link} target={'_blank'} rel='noreferrer'>
		<div className='Project-Panel'>
			<img src={GitHubLogoImage} alt={'GithubLogoImage'}/>
			<p>{props.author}</p>
		</div>
	</a>
);

export default GitHubProjectPanel;
