import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import ContactList from './Components/Contacts/ContactLists/ContactList';
import AddContact from './Components/Contacts/AddContacts/AddContacts';
import ViewContact from './Components/Contacts/ViewContacts/ViewContacts';
import EditContact from './Components/Contacts/EditContacts/EditContacts';
import { Routes, Route, Navigate }  from 'react-router-dom';
import Spinner from './Components/Spinner/Spinner';


let App = () => {
  return (
    <React.Fragment>

      

      <NavBar/>

      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list'} />} />

        <Route path={'/contacts/list'} element={<ContactList/>} />

        <Route path={'/contacts/add'} element={<AddContact/>} />

        <Route path={'/contacts/view/:contactId'} element={<ViewContact/>} />

        <Route path={'/contacts/edit/:contactId'} element={<EditContact/>} />

      </Routes>

    </React.Fragment>
  );
}

export default App;
