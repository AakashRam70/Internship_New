import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Modal, Button, Card, Form, Spinner } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CartItems from './CartItem';
import BarChartComponent from './BarChartComponent'; // Import the BarChartComponent

ChartJS.register(ArcElement, Tooltip, Legend);

const Cards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showBarChartModal, setShowBarChartModal] = useState(false); // State to manage bar chart modal visibility
    const [showCartModal, setShowCartModal] = useState(false);
    const [pieChartData, setPieChartData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalData, setOriginalData] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:4088/');
                console.log('Fetched data:', response.data);
                setData(response.data);
                setOriginalData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePieChartClick = () => {
        const categoryCounts = data.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(categoryCounts);
        const chartData = Object.values(categoryCounts);

        const pieChartData = {
            labels,
            datasets: [
                {
                    label: 'Product Categories',
                    data: chartData,
                    backgroundColor: [
                        '#007bff',
                        '#28a745',
                        '#dc3545',
                        '#ffc107',
                        '#17a2b8',
                        '#6c757d',
                    ],
                },
            ],
        };

        setPieChartData(pieChartData);
        setShowModal(true);
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        const filteredData = originalData.filter((product) =>
            product.category.toLowerCase().includes(searchTerm)
        );

        setData(filteredData);
    };

    const handleSearchButtonClick = () => {
        if (searchTerm.trim() === '') {
            setData(originalData);
        } else {
            const filteredData = originalData.filter((product) =>
                product.category.toLowerCase().includes(searchTerm)
            );
            setData(filteredData);
        }
    };

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            const updatedCartItems = cartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const handleCartButtonClick = () => {
        setShowCartModal(true);
    };

    const handleBuyNow = () => {
        alert('Purchased items successfully');
        setCartItems([]);
    };

    const handleDeleteItem = (index) => {
        const newCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(newCartItems);
    };

    return (
        <Container fluid className='mb-4'>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Navbar.Brand href="#">Internship</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link onClick={handlePieChartClick}>Pie Chart</Nav.Link>
                        <Nav.Link onClick={() => setShowBarChartModal(true)}>Bar Chart</Nav.Link> {/* Button to show bar chart */}
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-success" onClick={handleSearchButtonClick}>Search</Button>
                    </Form>
                    <Button variant="outline-primary" className="ms-2" onClick={handleCartButtonClick}>
                        Cart ({cartItems.length})
                    </Button>
                </Navbar.Collapse>
            </Navbar>

            {/* Modal for pie chart */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pieChartData && <Pie data={pieChartData} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for bar chart */}
            <Modal show={showBarChartModal} onHide={() => setShowBarChartModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Price Range Bar Chart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BarChartComponent />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBarChartModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* CartItems component */}
            <CartItems
                show={showCartModal}
                handleClose={() => setShowCartModal(false)}
                cartItems={cartItems}
                handleBuyNow={handleBuyNow}
                handleDeleteItem={handleDeleteItem}
            />

            <div className="row mt-4">
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    data.map((product) => (
                        <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                            <Card className="h-100">
                                <Card.Header>
                                    <Card.Img
                                        id='card-image'
                                        variant="top"
                                        src={product.image}
                                        className='p-3'
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            alignSelf: 'center',
                                            justifySelf: 'center',
                                            display: 'flex',
                                        }}
                                    />
                                    <Card.Title style={{ height: "70px" }}>{product.title}</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text style={{ textAlign: "center", height: "20px" }}>{product.category.toUpperCase()}</Card.Text>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between align-items-center">
                                    <Button variant="primary" onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </Button>
                                    <strong>${product.price}</strong>
                                </Card.Footer>
                            </Card>
                        </div>
                    ))
                )}
            </div>
        </Container>
    );
};

export default Cards;
