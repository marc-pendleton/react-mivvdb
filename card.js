import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Card extends React.Component {
 
    constructor(props) {
 
      super(props);

      this.state = {
        city: props.city,
        state: props.state,
        email: props.email,
        name: props.name,
        phone: props.phone,
        picture: props.picture
      };
      this.editUser = this.editUser.bind(this);
    }

    editUser(e){
      var newName = prompt("Enter the new name for this user", this.state.name);
      this.setState({name: newName});
    } 

    componentWillReceiveProps(nextProps){
      console.log(nextProps);
      this.setState(nextProps);
    }
 
    render() {
        return (
          <div className="card">
            <div className="top-border">
              <FontAwesomeIcon className="icon" size="2x" icon="user-edit" onClick={this.editUser}/>
              <h1> {this.state.name}</h1>
            </div>
            <img src={this.state.picture} className="avatar" />
            <div className="info">
              <p>{this.state.email}</p>
              <p>{this.state.phone}</p> 
              <p>{this.state.city + ", " + this.state.state}</p>
            </div>
          </div>
        )
    }
}