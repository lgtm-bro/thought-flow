import React, {useEffect, useState, useRef, Fragment} from 'react';
import axios from 'axios';
import Entry from './Entry.jsx';
import Feelings from './Feelings.jsx';


const App = () => {
  const [feeling, setFeeling] = useState()
  const feels = useRef();
  const entry = useRef();

  useEffect(() => {
    if(feeling){
      console.log(feeling.name, feeling.score);
    }
  }, [feeling])

  const hideFeels = () => {
    feels.current.classList.add('hide')
  }

  const showEntryForm = (el) => {
    entry.current.classList.remove('hide')
  }

  const getFeeling = (f) => {
    axios.get(`/third_emotion/${f}`)
      .then(results => setFeeling(results.data))
  }


  return (
    <div>
      <h1>ThoughtFlow</h1>
      <div ref={feels} id="feels_ref">
        {/* <Feelings
          hide={hideFeels}
          show={showEntryForm}
          feeling={getFeeling}/> */}
      </div>
      <div ref={entry} id="entry_wrapper" className="hide">
        <Entry feeling={feeling} />
      </div>
      <Entry />
    </div>
  )
}

export default App;