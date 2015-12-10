import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class LogIn extends React.Component {

  render() {
    return (
      <CSSTransitionGroup component="span" transitionName="login-prompt" transitionLeaveTimeout={250} transitionEnterTimeout={250} transitionAppear={true} transitionAppearTimeout={300}>
        <div className="login-prompt">
          <form ref="loginForm" onSubmit={this.props.logIn}>
            <input type="email" placeholder="you@email.com" ref="email" />
            <input type="password" placeholder="password" ref="pw" />
            <input type="submit" value="Log In" />
          </form>
          <p>Don't have an account? <span>Create one!</span></p>
        </div>
      </CSSTransitionGroup>
    )
  }

}

export default LogIn;