import React, { useContext,useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import AuthContext from '../../store/AuthContext';
import emailjs from 'emailjs-com';
import { useToast, Spinner } from '@chakra-ui/react'

const Navigation = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const [page, setPage] = useState(1)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    // const authCtx = useContext(AuthContext)
    const toast = useToast()

    useEffect(() => {
        if (data !== null) return;
        setLoading(true)
        const docDetails = async () => {

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/"}user/details`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                }
            });

            const res_data = await res.json()

            if (res.status !== 200) {
                // toast({
                //     title: 'Error Loading Account Data.',
                //     description: "Please Try Again",
                //     status: 'error',
                //     duration: 9000,
                //     isClosable: true,
                // })
            }
            else {
                setData(res_data)
            }

            setLoading(false)
        };

        docDetails();
        // eslint-disable-next-line
    }, [data])

    const userEmail="kundusanglap02@gmail.com"
    
    const [location, setLocation] = useState("");
    const sendSOSEmail = () => {
        // Get user location (you can replace this with actual location logic)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
                setLocation(userLocation);
                const googleMapsLink = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
    
                // Check if data is null, prompt for details
                let Name = data?.Name;
                let HealthID = data?.HealthID;
                let Mobile = data?.Mobile;
    
                if (!data) {
                    Name = window.prompt("Please enter your name (required):");
                    if (!Name) {
                        toast({
                            title: "Name is required.",
                            description: "Please provide your name to send the SOS email.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });
                        return; // Stop execution if name is not provided
                    }
    
                    HealthID = window.prompt("Enter your health ID (optional):");
                    Mobile = window.prompt("Enter your phone number (required):");
                    if (!Mobile) {
                        toast({
                            title: "Phone number is required.",
                            description: "Please provide your phone number to send the SOS email.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });
                        return; // Stop execution if phone number is not provided
                    }
                }
    
                // EmailJS send email
                emailjs
                    .send(
                        "service_gp41p5u",
                        "template_x3l308w",
                        {
                            location: googleMapsLink,
                            message: `Hi, this is to inform ${Name ?? "John Doe"} whose health care ID is ${HealthID ?? "123456"}, that they are facing an urgent medical emergency. The location of ${Name ?? "John Doe"} is provided to you. Please contact on the number ${Mobile ?? "000-000-0000"} to check if this is a false alarm. If not, please contact nearby healthcare facilities. Your help is highly appreciated.`,
                            to_email: userEmail, // Add recipient email dynamically
                        },
                        "Zse_mx4syJurhm5mw"
                    )
                    .then((response) => {
                        toast({
                            title: "SOS Email sent.",
                            description: `Email has been sent to the Emergency Contact`,
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        });
                        console.log("SUCCESS!", response.status, response.text);
                    })
                    .catch((err) => {
                        toast({
                            title: "Error Sending Email.",
                            description: err.message.split('"')[1],
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        });
                        console.log("FAILED...", err);
                    });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };
    

    

    return (
        <nav className='navigation'>
            <input type="checkbox" className='menu-btn' id='menu-btn' hidden />
            <label htmlFor="menu-btn" className='menu-icon'>
                <span className='nav-icon'></span>
            </label>
            <Link to='/' className='logo'><span>Aaro</span>gyam</Link>
            <ul className='menu'>
                {authCtx.isDoctor && authCtx.isLoggedIn && <li><Link to={`/doctor/${authCtx.id}`}>Profile Page</Link></li>}
                {authCtx.isDoctor === false && authCtx.isLoggedIn && <li><Link to={`/patient/${authCtx.id}`}>Profile Page</Link></li>}
                <li><Link to='/search-doctor'>Find A Doctor</Link></li>
                <li><Link to='/facilities'>Nearby Facilities</Link></li>
                <li><Link to='/bot'>Medical Bot</Link></li>
                <li id='red-text' onClick={sendSOSEmail}>SOS</li> {/* Added click handler here */}
            </ul>

            {authCtx.isLoggedIn ? (
                <button className='nav-appointment-btn' onClick={() => {
                    authCtx.logout();
                    navigate('/');
                }}>
                    Logout
                </button>
            ) : (
                <Link to='/search-doctor' className='nav-appointment-btn'>Appointment</Link>
            )}
        </nav>
    );
};

export default Navigation;
