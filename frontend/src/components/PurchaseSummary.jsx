import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const PurchaseSummary = ({ show, handleClose, cartItems }) => {
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Purchase Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.category}</td>
                                <td>&#8377; {item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>&#8377; {(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <h4>Total Price: &#8377; {totalPrice.toFixed(2)}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PurchaseSummary;
