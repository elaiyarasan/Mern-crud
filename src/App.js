import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CreateUser from "./components/CreateUser";
import OtpReg from './components/OtpReg';
import FormCreate from './components/crudOpe/FormCreate';
import FormList from './components/crudOpe/FormList';
import FormEdit from './components/crudOpe/FormEdit';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Route path="/otp/:phone" component={OtpReg} />
      <Route path="/user" component={CreateUser} />
      <Route path="/formcreate" component={FormCreate} />
      <Route path="/formlist" component={FormList} />
      <Route path="/formedit/:id" component={FormEdit} />

    </BrowserRouter>
  );
}

export default App;
