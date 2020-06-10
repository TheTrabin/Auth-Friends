import React from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

class FriendsData extends React.Component {
    state = {
        friend: []
    };


    getFriends = () => {
        axiosWithAuth()
        .get('/api/friends')
        .then(res => {
            console.log(res);
            this.setState({friend: res.data})})
        .catch(err => console.log(err.response))
    };

    submitForm = e => {
        e.preventDefault();
        
        this.addFriend();
    };

    handleChange = (e) => {
        e.preventDefault();
        console.log(friend);
      this.setState({...this.state.friend, [e.target.name]: e.target.value});
          };

    addFriend = () => {
        axiosWithAuth()
        .post('/api/friends', this.setfriend)
        .then(res => console.log(res.data))
        .catch(err => console.log('post error', err.response))
    }
    

      

    render() {
        return(
        <>
        <div>
        <button onClick={() => this.getFriends()}>No one Told me life was gonna be this way</button>
        {this.state.friend.map(item => {
            return(
            <>
            <p>Name: {item.name}</p>
            <p>Age: {item.age}</p>
            <p>Email: {item.email}</p>
            <p>Friend Number: {item.id}</p>
            </>
            )
        }
        )}
        </div>
        <div>
            <form onSubmit={this.submitForm}>
                <input type="text" value={this.state.friend.name} onChange={this.handleChange} placeholder="Name" />
                <input type="text" value={this.state.friend.age} onChange={this.handleChange} placeholder="Age" />
                <input type="email" value={this.state.friend.email} onChange={this.handleChange} placeholder="Email" />
                <button type="submit">Add Friend</button>
            </form>
        </div>
        </>
    )
}
    }

 export default FriendsData;