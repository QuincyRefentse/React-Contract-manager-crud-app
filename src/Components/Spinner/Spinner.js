import React from 'react';

import Spinnerimg from '../../assets/image/loading.gif';


let Spinner = () => {

    return (
        <React.Fragment>
            
            <div>
                <img src={Spinnerimg} alt="" className='d-block m-auto' style={{width:'200px '}}/>
                <p style={{textAlign : 'center'}}> <b>Loading...</b></p>
            </div>

        </React.Fragment>
    )
};

export default Spinner;