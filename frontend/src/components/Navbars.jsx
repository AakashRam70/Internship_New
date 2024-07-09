import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import { Pie } from 'react-chartjs-2'; // Import Pie chart from react-chartjs-2
import { Button, Card, Form } from 'react-bootstrap'; // Import Button and Form components from react-bootstrap
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Import necessary Chart.js components

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Cards = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [pieChartData, setPieChartData] = useState(null); // State to store pie chart data
    const [searchTerm, setSearchTerm] = useState(''); // State to hold search term
    const [originalData, setOriginalData] = useState([]); // State to hold original data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4088/');
                console.log('Fetched data:', response.data); // Log the response data
                setData(response.data);
                setOriginalData(response.data); // Store original data for resetting
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    // Function to handle pie chart button click
    const handlePieChartClick = () => {
        // Prepare data for pie chart
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

    // Function to handle search input change
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase(); // Convert search term to lowercase
        setSearchTerm(searchTerm);

        // Filter data based on searchTerm
        const filteredData = originalData.filter((product) =>
            product.category.toLowerCase().includes(searchTerm)
        );

        // Update the data state with filtered data
        setData(filteredData);
    };

    // Function to handle search button click
    const handleSearchButtonClick = () => {
        if (searchTerm.trim() === '') {
            // Reset to original data if search term is empty
            setData(originalData);
        } else {
            // Filter data based on searchTerm
            const filteredData = originalData.filter((product) =>
                product.category.toLowerCase().includes(searchTerm)
            );
            // Update the data state with filtered data
            setData(filteredData);
        }
    };

    return (
        <Container fluid className='mb-4'>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Navbar.Brand href="#">Internship</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link onClick={handlePieChartClick}>Pie Chart</Nav.Link>
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
                </Navbar.Collapse>
            </Navbar>

            {/* Modal for pie chart */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pieChartData && <Pie data={pieChartData} />} {/* Render pie chart if data is available */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Display filtered products */}
            <div className="row mt-4">
                {data.map((product) => (
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
                            <Card.Footer>
                                <p>&#8377; {product.price}</p>
                                <Button variant="primary">Buy Now</Button>
                            </Card.Footer>
                        </Card>
                    </div>
                ))}
            </div>
        </Container>
    );
}

export default Cards;
