import React, { Component } from 'react';
import axios from "axios";
import URL_API from "../../UrlApi";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

class FormCreate extends Component {
    constructor(props) {
        super();
        this.state = {
            imagetitle: "",
            imagedescription: "",
            selectedFile: null,
            category: '',
            itemForSale: '',
            amount: '',
            termAndCond: '',
            attachementName:''

        }
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChangeUser(e, label) {
        this.setState({ label: e.target.value })
    }

    // On file select
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
        var reader = new FileReader();
        var url = reader.readAsDataURL(event.target.files[0]);
      
         reader.onloadend = function (e) {
            this.setState({
                attachementName: [reader.result]
            })
          }.bind(this);
        // this.setState({attachementName:event.target.files[0]});

    };

    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name,
        );
        const data = {
            imagetitle: this.state.imagetitle,
            imagedescription: this.state.imagedescription,
            category: this.state.category,
            itemForSale: this.state.itemForSale,
            amount: this.state.amount,
            termAndCond: this.state.termAndCond,
        }
        formData.append('anotherdata', JSON.stringify(data))

        console.log(this.state.selectedFile)

        axios.post(URL_API + 'form/create', formData)
            .then((res) => {
                swal("File uploaded, date updated successfully!");
                return this.props.history.push('/formedit/' + res.data._id)
            }).catch(err => {
                swal(err.response.data);
            });
    }

    render() {
        return (
            <div className="container">
                <div className='row'>
                    <h3>
                        Create New Form
                    </h3>
                    <Link to="/formlist" className="btn btn-success">List</Link>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Image Title: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.imagetitle}
                            onChange={(e) => this.setState({ imagetitle: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image Description: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.imagedescription}
                            onChange={(e) => this.setState({ imagedescription: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image: </label>
                        <input
                            type="file"
                            required
                            accept=".png, .jpg, .jpeg"
                            onChange={this.onFileChange}
                        />
                         <span>
                            <img width='300px' height='200px' src={this.state.attachementName} />
                        </span>
                    </div>
                    <div className="form-group form-select form-select-lg mb-3">
                        <label>Category: </label>
                        <select
                            className="form-control"
                            onChange={(e) => this.setState({ category: e.target.value })}>
                            <option value=''>Select</option>
                            <option>People</option>
                            <option>Tech</option>
                            <option>Entertainment</option>
                        </select>
                    </div>
                    <label>Item for sale:</label>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            value='Yes'
                            name='itemForSale'
                            onChange={(e) => this.setState({ itemForSale: e.target.value })}
                        />
                        <label className="form-check-label">
                            Yes
                        </label>

                    </div>
                    <div className="form-group">
                        <label>Amount: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.phone}
                            onChange={(e) => this.setState({ amount: e.target.value })}
                        />
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                            type="radio"
                            value='No'
                            name='itemForSale'
                            onChange={(e) => this.setState({ itemForSale: e.target.value })}
                        />
                        <label className="form-check-label">
                            No
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" onChange={(e) => this.setState({ itemForSale: e.target.checked })} />
                        <label className="form-check-label">
                            Accept Terms and Condtions
                        </label>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default FormCreate;