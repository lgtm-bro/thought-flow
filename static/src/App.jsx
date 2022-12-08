import React, {useEffect, useRef, Fragment} from 'react';
import Guided from './Guided.jsx'
import Feelings from './Feelings.jsx'


const App = () => {
  const feels = useRef();
  const guide = useRef();

  // useEffect(() => {

  // }, [])

  const hideFeels = () => {
    console.log('hide')
    feels.current.classList.add('hide')
  }

  const showGuide = (el) => {
    console.log('show')
    guide.current.classList.remove('hide')
  }

  return (
    <div>
      <h1>ThoughtFlow</h1>
      <div ref={feels} id="feels_ref">
        <Feelings hide={hideFeels} show={showGuide} />
      </div>
      <div ref={guide} id="guide_ref" className="hide">
        <Guided />
      </div>
    </div>
  )
}

export default App;