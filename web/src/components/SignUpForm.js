import React from 'react'

function SignUpForm({ onSignUp }) {
  return (
    <form className="form--signin"
      onSubmit={event => {
        event.preventDefault()
        const elements = event.target.elements
        const email = elements.email.value
        const firstName = elements.firstName.value
        const lastName = elements.lastName.value
        const password = elements.password.value
        onSignUp({ firstName, lastName, email, password })
      }}
    >
      <div className="form__group">
        <div className="form__label form__label--padding">
        <label>First Name</label>
          <input type="text" name="firstName" className="form__input" />

          <label>Last Name</label>
          <input type="text" name="lastName" className="form__input" />

          {/*<label>Display Name</label>
          <input type="text" name="displayName" className="form__input" />
    */}
    
          <label>Email</label>
          <input type="email" name="email" className="form__input" required />

          <label>password</label>
          <input type="password" name="password" className="form__input" required />
        </div>
      </div>
      <button className="button button__form--submit">Sign up</button>
    </form>
  )
}

export default SignUpForm
