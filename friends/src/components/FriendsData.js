import React from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

class FriendsData extends React.Component {
    state = {
        friend: [],
        newFriend: {
            name: '',
            age: '',
            email: ''
        }
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

    // setFriend({
    //     name: name,
    //     email: email,
    //     age: age
    //   })

    handleChange = (e) => {
        e.preventDefault();
        console.log("before(friend data handle change)", this.state.newFriend);
        console.log("Anything?", e.target)
      this.setState(
          {
              ...this.state,
              newFriend: {
                  ...this.state.newFriend, [e.target.name]: e.target.value
                // name: "jerry",
                // age: "10",
                // email:"jerry@gmail.com"

                }
            }
            );

      console.log("after(friend data handle change)",this.state.newFriend);
      //isn't collecting any data on Handle Change.

          };

    addFriend = () => {
        console.log("pre-add(addfriend)", this.state.newFriend)
        axiosWithAuth()
        .post('/api/friends', this.state.newFriend)
        .then(res => console.log("After the form submit", res.data))
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
                <input type="text" value={this.state.newFriend.name} onChange={this.handleChange} name="name" placeholder="Name" />
                <input type="text" value={this.state.newFriend.age} onChange={this.handleChange} name="age" placeholder="Age" />
                <input type="email" value={this.state.newFriend.email} onChange={this.handleChange} name="email" placeholder="Email" />
                <button type="submit">Add Friend</button>
            </form>
        </div>
        </>
    )
}
    }

 export default FriendsData;