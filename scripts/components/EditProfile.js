/* EditProfile */

import React from 'react';

class EditProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      profile : props.userProfile
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ profile : newProps.userProfile });
  }

  updateProfile(e) {
    e.preventDefault();

    var newProfile = {
      name : this.refs.name.value,
      desc : this.refs.desc.value,
      imgLink : this.refs.imgLink.value
    }

    this.props.setProfile(newProfile);
  }

  handleChange(ref, e) {
    var updatedProfile = this.state.profile;
    updatedProfile[ref] = e.target.value;
    this.setState({ profile : updatedProfile });
  }

  render() {
    var profile = this.state.profile;

    return (
      <div>
        <h2>Edit your profile</h2>
        <form className="profile-form" onSubmit={this.updateProfile.bind(this)} >
          <h5>Your Name</h5>
        	<input type="text" ref="name" placeholder="whatz yer name?" value={profile.name} onChange={this.handleChange.bind(this, 'name')}/>

          <h5>What is your Deal?</h5>
        	<textarea ref="desc" placeholder="tell something about yerself" value={profile.desc} onChange={this.handleChange.bind(this, 'desc')}/>

          <h5>What would you like to use as a profile picture?</h5>
          <input type="text" ref="imgLink" placeholder="http://www.you.org/your-face.jpg" value={profile.imgLink}  onChange={this.handleChange.bind(this, 'imgLink')}/>

          <input type="submit" value="update profile" />
        	
        </form>
      </div>
    )
  }

}

export default EditProfile;