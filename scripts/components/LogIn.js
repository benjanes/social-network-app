import React from 'react';

class LogIn extends React.Component {

  render() {
    return (
      <div className="login-prompt">
        <form ref="loginForm" onSubmit={this.props.logIn}>
          <input type="email" placeholder="you@email.com" ref="email" />
          <input type="password" placeholder="password" ref="pw" />
          <input type="submit" value="Log In" />
        </form>
        <p>Don't have an account? <span>Create one!</span></p>
      </div>
    )
  }

}

export default LogIn;