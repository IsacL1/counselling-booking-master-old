import React from 'react'

const Key = props => (
  <div className="sidebar__box--key key">
    <h3 className="header__heading header__heading--sidebar">Emergency Level</h3>
    <div className="key__group">
      <span className="key__square key__square--bu1"></span>
      <p className="key__description">High</p>
    </div>
    <div className="key__group">
      <span className="key__square key__square--bu2"></span>
      <p className="key__description">Medium</p>
    </div>
    <div className="key__group">
      <span className="key__square key__square--bu3"></span>
      <p className="key__description">Low</p>
    </div>
    <div className="key__group">
      <span className="key__square key__square--bu4"></span>
      <p className="key__description">Do not know</p>
    </div>
    
    {/*
    <div className="key__group">
      <span className="key__square key__square--bu4"></span>
      <p className="key__description">Business Unit 4</p>
    </div>
    <div className="key__group">
      <span className="key__square key__square--bu5"></span>
      <p className="key__description">Business Unit 5</p>
    </div>
    */}
  </div>
)

export default Key