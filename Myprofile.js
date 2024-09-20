import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Myprofile = () => {
    const [data, setData] = useState(null);
    const [review, setReview] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await axios.get('http://localhost:5001/myprofile', {
                    headers: {
                        'x-token': localStorage.getItem('token'),
                    },
                });
                setData(profileResponse.data);

                const reviewResponse = await axios.get('http://localhost:5001/myreview', {
                    headers: {
                        'x-token': localStorage.getItem('token'),
                    },
                });

                // Ensure the response is an array
                const reviewsArray = Array.isArray(reviewResponse.data) ? reviewResponse.data : [];
                setReview(reviewsArray);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!localStorage.getItem('token')) {
        return <Navigate to='/login' />;
    }

    return (
        <div>
            <nav className='navbar bg-dark'>
                <h1>
                    <Link to='/'><i className='fas fa-code'></i>Developer Hub</Link>
                </h1>
                <ul className='nav-links'>
                    <li><Link to="/myprofile">Myprofile</Link></li>
                    <li><Link to="/login" onClick={() => localStorage.removeItem('token')}>Logout</Link></li>
                </ul>
            </nav>
            {data &&
                <div className='dash-main'>
                <section className='prof-container'>
                    <Link to='/dashboard' className='btn btn-light'>Back to profiles</Link>
                    <div className='profile-grid my-1'>
                        <img className='round-img' src="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109" alt='' />
                        <h1 className='large'>{data.fullname}</h1>
                        <p className='lead'>{data.email}</p>
                        <p>India</p>
                    </div>

                    <div className='profile-github'>
                        <h2 className='text-primary my-1'>
                            <i className='fab fa-github'></i>Reviews and ratings
                        </h2>
                        <div className='repo bg-white p-1 my-1'>
                            {review.length > 0 ? (
                                review.map((reviewItem, index) => (
                                    <div key={index}>
                                        <h4><Link to='#'>{reviewItem.taskprovider}</Link></h4>
                                        <p>{reviewItem.rating}/5</p>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews available.</p>
                            )}
                        </div>

                        <div className='repo bg-white p-1 my-1'>
                            <div>
                                <h4>Enter Your Review</h4>
                                <form className='form' autoComplete='off'>
                                    <div className='form-group'>
                                        <input type='text' placeholder='Enter your rating out of 5' name='rating' required />
                                    </div>
                                    <input type='submit' className='btn btn-primary' value='Add Rating' />
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            }
        </div>
    );
};

export default Myprofile;
