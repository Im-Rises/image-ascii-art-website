import React from 'react';
import './GitHubProjectPanel.scss';

type Props = {
	link: string;
	linkText: string;
};

const GitHubProjectPanel = (props: Props) => (
	<div className='Project-Panel'>
		<div className={'Project-Link'}>
			<h2>Github project link</h2>
			<a href={props.link} target={'_blank'} rel='noreferrer'>
				<p>{props.linkText}</p></a>
		</div>
	</div>
);

export default GitHubProjectPanel;
