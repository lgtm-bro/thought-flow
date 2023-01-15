import React from "react";

const About = () => (
  <div id="about-container" className="container-fluid rounded px-2">
    <h2 id="about-title" className="position-sticky display-6 pt-5 pb-2 ps-5">how to use thoughtflow</h2>
    <ol className="lead ms-5 px-2">
      <li>Pinpoint the emotion that you are feeling</li>
      <li>Choose if you would like guided prompts</li>
      <li>
        Explore the emotion by writing about:
        <ul className="ms-5 ps-2 p-1 pb-2">
          <li>Experiences that made you feel this</li>
          <li>How it is affecting you</li>
          <li>Different approaches to navigating this experience</li>
        </ul>
      </li>
      <li>
        Record milestones to recognize and record breakthroughs and
        accomplishments you achieve while working through emotions
      </li>
    </ol>
    <h2 className="display-6 my-1 ps-5">why this works</h2>
    <p className="lead px-4 pt-1 mx-4">
      Exploring and analyzing your feelings through journaling is a Congnitive
      Behavioral Therapy(CBT) technique used to give patients an effective way
      to cope with overwhelming emotions. The regular practice of keeping a
      Feeling Journal can help you to identify patterns and triggers that lead
      to reoccuring emotions.
    </p>
    <div id="about-footer" className="px-4 mx-4">
      To learn more about CBT, see this{" "}
      <a
        href="https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral"
        target="_blank"
        className="ext-link"
      >
        article
      </a>{" "}
      from the APA.
    </div>
  </div>
);

export default About;
