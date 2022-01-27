import React, { Component } from 'react';
import axios from "axios";
import URL_API from "../../UrlApi";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { Edit, Delete } from 'react-feather'

class FormList extends Component {
    constructor(props) {
        super();
        this.state = {
            tabledata: []
        }
        this.deleteData = this.deleteData.bind(this);
        this.loadList();
    }
    loadList = () => {
        axios.get(URL_API + 'form/list')
            .then((res) => {
                console.log('res', res);
                this.setState({ tabledata: res.data })
                console.log(this.state.tabledata)
            })
    }
    onChangeUser(e, label) {
        this.setState({ label: e.target.value })
    }

    deleteData = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(URL_API + `form/delete/${id}`)
                    .then((res) => {
                        swal("Poof! Your record has been deleted!", {
                            icon: "success",
                        });
                        this.loadList();
                    }).catch(err => {
                        swal(err.response.data);
                    });
            }
            else {
                swal("Your record is safe!");
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className='row'>
                    <h3>Created Records</h3>
                    <Link to="/formcreate" className="btn btn-success">Create</Link>
                </div>
                <table striped bordered hover className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Image Preview</th>
                            <th>Paid/Free</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tabledata.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{listValue.imagetitle}</td>
                                    <td>{listValue.imagetitle}</td>
                                    <td>{listValue.category}</td>
                                    <td>{(listValue.itemForSale) ? (<span>Yes - {listValue.amount}</span>) : (<span>No</span>)}</td>
                                    <td>
                                        <Link to={'/formedit/' + listValue._id} className='btn btn-primary ml-1'><Edit /></Link>
                                        <button className='btn btn-danger ml-1' onClick={() => this.deleteData(listValue._id)}><Delete /></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default FormList;