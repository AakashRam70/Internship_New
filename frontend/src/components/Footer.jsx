import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
} from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <MDBFooter className='bg-light text-center text-lg-start'>
            <MDBContainer className='p-4'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex align-items-center'>
                        <a href='/' className='mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1'>
                            <MDBIcon fab icon='bootstrap' size='lg' />
                        </a>
                        <span className='mb-3 mb-md-0 text-muted'>© 2022 Company, Inc</span>
                    </div>
                    <ul className='nav justify-content-center list-unstyled d-flex'>
                        <li className='ms-3'>
                            <a className='text-muted' href='https://twitter.com'>
                                <MDBIcon fab icon='twitter' size='lg' />
                            </a>
                        </li>
                        <li className='ms-3'>
                            <a className='text-muted' href='https://instagram.com'>
                                <MDBIcon fab icon='instagram' size='lg' />
                            </a>
                        </li>
                        <li className='ms-3'>
                            <a className='text-muted' href='https://facebook.com'>
                                <MDBIcon fab icon='facebook' size='lg' />
                            </a>
                        </li>
                    </ul>
                </div>
            </MDBContainer>
        </MDBFooter>
    );
}

export default Footer;
