import React, { Component } from 'react';
import axios from "axios";
import URL_API from "../../UrlApi";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

class FormEdit extends Component {
    constructor(props) {
        super();
        let search = (window.location.href).split('/');
        this.state = {
            id: search[4],
            imagetitle: "",
            imagedescription: "",
            selectedFile: null,
            category: '',
            itemForSale: '',
            amount: '',
            termAndCond: '',
            attachementName: ""
        }
        axios.get(URL_API + `form/getFormData/${search[4]}`).then((res) => {
            // this.state.imagetitle = res.data.imagetitle;
            // this.state.imagedescription = res.data.imagedescription;
            // this.state.category = res.data.category;
            // this.state.itemForSale = res.data.itemForSale;
            // this.state.amount = res.data.amount;
            // this.state.termAndCond = res.data.termAndCond;
            this.setState({ imagetitle: res.data.imagetitle })
            this.setState({ imagedescription: res.data.imagedescription })
            this.setState({ category: res.data.category })
            this.setState({ itemForSale: res.data.itemForSale })
            this.setState({ amount: res.data.amount })
            this.setState({ termAndCond: res.data.termAndCond })
            this.setState({ attachementName: URL_API + "form/fetchImage/" + res.data.attachementName })

        });
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
    };

    // // Fetch image
    // fetchImages = (imageName) => {
    //     console.log('imageName',imageName)
    //     console.log('attachementName',this.state.attachementName)

    //         const url = `${URL_API}form/fetchImage/${imageName}`
    //         axios.get(url, {responseType: 'blob'})
    //         .then(res => {
    //             console.log(res.data);
    //             return(
    //                 <div>
    //                 <img src={global.URL.createObjectUR(res.data.Blob)} className="Screenshot" alt="showing screen capture" />
    //             </div>
    //             )
    //         })

    //     }




    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        if (this.state.selectedFile) {
            formData.append(
                "myFile",
                this.state.selectedFile,
                this.state.selectedFile.name,
            );
        }
        if(this.state.itemForSale=='true' && (this.state.amount==0 || this.state.amount=='')){
            swal("Please enter valid amount!");return false;
        }
        const data = {
            id: this.state.id,
            imagetitle: this.state.imagetitle,
            imagedescription: this.state.imagedescription,
            category: this.state.category,
            itemForSale: this.state.itemForSale,
            amount: this.state.amount,
        }
        formData.append('anotherdata', JSON.stringify(data))
        axios.post(URL_API + 'form/update', formData)
            .then((res) => {
                swal("File uploaded & date updated successfully!");
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
                        Update Form
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
                            accept=".png, .jpg, .jpeg"
                            onChange={this.onFileChange}
                        />
                        <span>
                            <img width='100px' height='50px' src={this.state.attachementName } />
                        </span>
                    </div>
                    <div className="form-group form-select form-select-lg mb-3">
                        <label>Category: </label>
                        <select value={this.state.category}
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
                            value={true}
                            name='itemForSale'
                            checked={this.state.itemForSale == 'true' ? true : false}
                            onChange={(e) => this.setState({ itemForSale: e.target.value })}
                        />
                        <label className="form-check-label">
                            Yes
                        </label>

                    </div>
                    {(this.state.itemForSale == 'true') ? 
                    (<div className="form-group">
                        <label>Amount: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.amount}
                            onChange={(e) => this.setState({ amount: e.target.value })}
                        />
                    </div>): ''}
                    <div className="form-check">
                        <input className="form-check-input"
                            type="radio"
                            value={false}
                            name='itemForSale'
                            checked={this.state.itemForSale == 'false' ? true : false}
                            onChange={(e) => this.setState({ itemForSale: e.target.value,amount:0 })}
                        />
                        <label className="form-check-label">
                            No
                        </label>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default FormEdit;