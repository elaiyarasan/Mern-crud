import React, { Component } from 'react';
import axios from "axios";
import URL_API from "../UrlApi";
import swal from 'sweetalert';

class OtpReg extends Component {
    constructor(props){
        super();
        let search = (window.location.href).split('/'); 
        console.log(search);
        this.state = {
            phone:search[4],
            otp:""            
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
            otp:  this.state.otp,
            otpSend: true
        }
        if(user.otp.length!=3){
                swal("Please Enter the valid otp number!");
                return false;
        }

        axios.post(URL_API+'users/otpUpdate', user)
            .then((res) =>{
                console.log('res',res)
                swal("User registered for above number successfully!");
                return  this.props.history.push('/user/')

            }).catch(err=>{
                swal(err.response.data);
                return  this.props.history.push('/otp/'+this.state.phone)
            });
       
        // this.setState({
        //     phone: '',
        //     otp:''
        // })
    }
    
    render() { 
        return ( 
            <div className="container">
                <h3>Update otp for  {this.state.phone}:</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>OTP: </label>
                        <input
                            type="number" 
                            maxLength={3}
                            minLength={3}
                            required
                            className="form-control"
                            value={this.state.otp}
                            onChange={(e)=> this.setState({otp:e.target.value})}
                        />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
         );
    }
}
 
export default OtpReg;