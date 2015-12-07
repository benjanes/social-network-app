/* Profile */

import React from 'react';

class Profile extends React.Component {

  render() {
  	var profileData = this.props.userProfile;

    return (
      <div>
        <h2>{profileData.name}</h2>
        <p>{profileData.desc}</p>
      </div>
    )
  }

}

export default Profile;