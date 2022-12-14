
import React , { useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import { ContactService } from '../../../Services/ContactService';
import Spinner from '../../Spinner/Spinner';


let ContactsList = () => {


    let [query,setQuery] = useState({

        text : ''

    });

    let [ state,setState ] = useState({

        loading : false,
        contacts : [],
        filteredContacts : [],
        errorMessage : ''

    });


    useEffect( () => {

        async function fetchData() {

        try {

            setState({...state, loading:true})
            let response = await ContactService.getAllContacts();

            setState({

                ...state,
                loading: false,
                contacts: response.data,
                filteredContacts: response.data

            });

        }
        catch (error){

            setState({
                ...state,
                loading : false,
                errorMessage : error.message
            });

        }
        }
        fetchData();


    },[]);

    let clickDelete = async (contactId) => { 

        try {

            let response = await ContactService.deleteContact(contactId);

            if (response){
                
            setState({...state, loading:true})
            let response = await ContactService.getAllContacts();

            setState({

                ...state,
                loading: false,
                contacts: response.data,
                filteredContacts: response.data

            });

            }

        }
        catch(error) {

            setState({
                ...state,
                loading : false,
                errorMessage : error.message
            }); 
        }
    };
 
    let searchContacts = (EventTarget) => {

        setQuery({...query, text : EventTarget.target.value });
        let theContacts = state.contacts.filter(contacts => {
            return contacts.name.toLowerCase().includes( EventTarget.target.value.toLowerCase())
        });
        setState({

            ...state,
            filteredContacts : theContacts
        });
    };

    let { loading,contacts,errorMessage ,filteredContacts} = state;



    return (
        <React.Fragment>
            

            <section className='contact-search p-3'>
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bold"> Contact Manager  
                                <Link to={'/contacts/add'} className="btn btn-primary ms-2">
                                  <i className="fa fa-plus-circle me-2"></i>   New
                                </Link>
                                </p>
                                <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dignissimos illo architecto veritatis natus, earum voluptate consequatur expedita reprehenderit laudantium? Ducimus, doloremque quidem. Quibusdam consectetur, distinctio ea maxime molestias quis?</p>
                           </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className='row'>

                                    <div className="col">
                                        
                                        <div className="mb-2">

                                            <input 
                                            name="text"
                                            value={query.text}
                                            onChange={searchContacts}

                                            type="text"className='form-control' placeholder='Search Names'/>
                                        </div>

                                    </div>
                                        <div className="col">

                                        <div className="mb-2">
                                            <input type="submit"className='btn btn-outline-dark' value='Search'/>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>               
            </section>

            {
                loading ? <Spinner/> : <React.Fragment>

                    
            <section className='contact-list'>
                <div className="container">
                    <div className="row">
                        {
                            filteredContacts.length > 0 &&
                                contacts.map(contacts => {
                                return(
                                    <div className="col-md-20" key={contacts.id}>
                                        <div className="card my-2">
                                            <div className="card-body">
                                                <div className="row align-items-center d-flex justify-content-around">
                                                    <div className="col-md-4">                                        
                                                        <img src={contacts.photo} alt="" className='contact-img'/>

                                                            </div>
                                                            <div className="col-md-7">
                                                                <ul className='list-group'>
                                                                        <li className='list-group-item list-group-item-action'>
                                                                        Name : <span className='fw-bold'>{contacts.name}</span>
                                                                        </li>
                                                                        <li className='list-group-item list-group-item-action'>
                                                                        Mobile : <span className='fw-bold'>{contacts.mobile}</span>
                                                                        </li>
                                                                        <li className='list-group-item list-group-item-action'>
                                                                        Email : <span className='fw-bold'>{contacts.email}</span>
                                                                        </li>
                                                                    </ul>

                                                                </div>
                                                            <div className="col-md-1 d-flex flex-column align-items-center">

                                                                <Link to={`/contacts/view/${contacts.id}`} className="btn btn-warning my-1">
                                                                    <i className='fa fa-eye'/>
                                                                </Link>
                                                                <Link to={`/contacts/edit/${contacts.id}`} className="btn btn-primary my-1">
                                                                    <i className='fa fa-pen'/>
                                                                </Link>
                                                                <button className="btn btn-danger my-1" onClick={(event) => clickDelete(contacts.Id)}>
                                                                    <i className='fa fa-trash'/>
                                                                </button>

                                                            </div>
                                                </div>

                                            </div>
                                         </div>
                                    </div>

                                )
                            })
                        }
                        
                        
                    </div>
                </div>

            </section>

                </React.Fragment>
            }

        
        </React.Fragment>
    )
};

export default ContactsList;