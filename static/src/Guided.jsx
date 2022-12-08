import React from 'react';

const Guided = () => (
    <div className='guidedContainer'>
      <h3>How would you like to flow today?</h3>
      <form>
        <input type="radio" name="flow" value="guided" id="guided"/>
        <label htmlFor="guided">Guided</label>
        <input type="radio" name="flow" value="solo" id="solo"/>
        <label htmlFor="solo">Solo</label>
      </form>
    </div>
)

export default Guided