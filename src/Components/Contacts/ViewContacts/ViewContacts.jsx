/* eslint-disable no-undef */
import React , { useEffect,useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { ContactService  } from '../../../Services/ContactService';
import Spinner from '../../Spinner/Spinner';

let ViewContacts = () => {

    let {contactId} = useParams();
 
    let [ state,setState ] = useState({

        loading : false,
        contacts :{},
        errorMessage : '' ,
        group : []

    });


    useEffect( () => {

        async function fetchData() {

        try {

            setState({...state, loading:true});
            let response = await ContactService.getContact(contactId);
            let groupResponse = await ContactService.getGroup(response.data);

            setState({

                ...state,
                loading: false,
                contacts: response.data,
                group: groupResponse.data

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
        fetchData()


    },[contactId,state]);

    

    let { loading,contacts,errorMessage,group  } = state;


    return (
        <React.Fragment>
 
            <section className='view-contact-intro p-3'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">View Contact</p>
                            <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, minima quasi et, excepturi sint incidunt eum eius recusandae voluptas maxime pariatur omnis aliquam deserunt voluptatem fugiat beatae ab temporibus. Maxime.</p>
                        </div>
                    </div>
                </div>

            </section>
            {
                loading ? <Spinner/>: <React.Fragment>
                    {
                        Object.keys(contacts).length > 0 && Object.keys(group).length > 0 &&
                        <section className='view-contact mt-3'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img src={contacts.photo} alt='' className='contact-img'/>

                                    </div>
                                    <div className="col-md-8">
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
                                        <li className='list-group-item list-group-item-action'>
                                        Company : <span className='fw-bold'>{contacts.company}</span>
                                        </li>
                                        <li className='list-group-item list-group-item-action'>
                                        Title : <span className='fw-bold'>{contacts.title}</span>
                                        </li>
                                        <li className='list-group-item list-group-item-action'>
                                        Group : <span className='fw-bold'>{contacts.groupId}</span>
                                        </li>
                                    </ul>

                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Link to={'/contacts/list'} className='btn btn-warning'>Back</Link>
                                    </div>
                                </div>
                            </div>

                        </section> 
                    }
                    


                </React.Fragment>
            }

            



        </React.Fragment>
    )
};

export default ViewContacts;