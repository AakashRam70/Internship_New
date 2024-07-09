import React, { useState } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import PurchaseSummary from './PurchaseSummary';

const CartItems = ({ show, handleClose, cartItems, handleBuyNow, handleDeleteItem }) => {
    const [showPurchaseSummary, setShowPurchaseSummary] = useState(false);

    const openPurchaseSummary = () => {
        setShowPurchaseSummary(true);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Cart Items</Modal.Title>
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
                                <th>Actions</th>
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
                                    <td>
                                        <Button variant="danger" onClick={() => handleDeleteItem(index)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={openPurchaseSummary}>
                        Buy Now
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Purchase Summary */}
            <PurchaseSummary
                show={showPurchaseSummary}
                handleClose={() => setShowPurchaseSummary(false)}
                cartItems={cartItems}
            />
        </>
    );
};

export default CartItems;
