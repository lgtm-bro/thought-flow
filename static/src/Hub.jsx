import React, {useState, useRef, Fragment} from 'react';

import Journal from './Journal.jsx';
import MilestoneBar from './MilestoneBar.jsx';


const Hub = (props) => {
	const journalEntries = useRef();
	const milestoneEntries = useRef();

	const [tab, setTab] = useState('journal')

	const showJournal = () => {
		if (tab !== 'journal') {
			journalEntries.current.classList.remove('hide');
			milestoneEntries.current.classList.add('hide');
			setTab('journal')
		}
	}

	const showMilestones = () => {
		if (tab !== 'milestones') {
			milestoneEntries.current.classList.remove('hide');
			journalEntries.current.classList.add('hide');
			setTab('milestones')
		}
	}

	return (
		<Fragment>
			<nav id="hub-nav">
				<a href="#" onClick={showJournal} >Journal</a>
				<a href="#" onClick={showMilestones} >Milestones</a>
				{/* <a>Progress</a> */}
			</nav>
			<div id="journal-wrapper" ref={journalEntries}>
				<Journal posts={props.posts} deletePost={props.deletePost}/>
			</div>
			<div id="milestone-bar-wrapper" ref={milestoneEntries} className="hide">
				<MilestoneBar milestones={props.milestones} addMilestoneClick={props.addMilestoneClick}/>
			</div>
		</Fragment>
	)
}

export default Hub;