import React from 'react';

const About = () => (
	<div id="about-container" className="container bg-light">
		<h2>How to Use ThoughtFlow</h2>
		<ol>
			<li>Pinpoint the emotion that you are working through</li>
			<li>Choose to write about the emotion free form or with guided prompts</li>
			<li>Explore the emotion by writing about:
				<ul>
					<li>Experiences that brought the emotion forward</li>
					<li>How the emotion is affecting you</li>
					<li>Different approaches on navigating the emotion and its effects</li>
				</ul>
			</li>
			<li>Record milestones to recognize and record breakthroughs
					and accomplishments you achieve while working through emotions</li>
		</ol>
		<h2>Why This Works</h2>
		<p>
			Exploring and analyzing your feelings through journaling is a
			Congnitive Behavioral Therapy(CBT) technique used to give
			patients an effective way to cope with overwhelming emotions.
			The regular practice of keeping a Feeling Journal can help you
			to identify patterns and triggers that lead to reoccuring emotions.
		</p>
		<p>
			To learn more about CBT, see this <a href="https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral" className="ext-link">article</a> from the APA.
		</p>
	</div>
)

export default About;