import React, { Component } from 'react';
import axios from "axios";
import URL_API from "../UrlApi";
import swal from 'sweetalert';

class CreateUser extends Component {
    constructor(props){
        super();
        this.state = {
            phone: "",
        }
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChangeUser(e,label) {
        this.setState({ label: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            phone: this.state.phone,
        }

        if(user.phone.length!=10){
                swal("Please Enter the valid mobile number!");
                return false;
        }

        axios.post(URL_API+'users/add', user)
            .then((res) =>{
                console.log('res',res)
                swal("Please, kindly confirm the three digit otp, we had send to your updated number!");
                return  this.props.history.push('/otp/'+this.state.phone)
            }).catch(err=>{
                swal(err.response.data);
            });
       
        // this.setState({
        //     phone: '',
        //     otp:''
        // })
    }
    
    render() { 
        return ( 
            <div className="container">
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Phone Number: </label>
                        <input
                            type="number" 
                            maxLength={10}
                            minLength={10}
                            required
                            className="form-control"
                            value={this.state.phone}
                            disabled={this.readonly}
                            onChange={(e)=> this.setState({phone:e.target.value})}
                        />
                    </div>
                    {/* { this.readonly ? 
                    (<div className="form-group">
                        <label>Otp: </label>
                        <input
                            type="number" 
                            className="form-control"
                            onChange={(e)=>this.setState({otp:e.target.value})}
                        />
                    </div>) :''} */}
                    
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
         );
    }
}
 
export default CreateUser;