import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
function HomePage() {
    const navigate = useNavigate();


    // useEffect(() => {
    //     const AccessToken = localStorage.getItem('AccessToken');
    //     if (AccessToken) {
    //         axios.get('https://pococare-backend-jo8v.onrender.com/protected', { headers: { Authorization: AccessToken } })
    //             .then((response) => {
    //                 console.log(response.data.message, "respo");
    //             })
    //             .catch((error) => {
    //                 if (error.response.status === 401) {

    //                     refreshAuthToken();
    //                 } else {
    //                     console.error('Error accessing protected resource:', error);
    //                 }
    //             });
    //     } else {
    //         console.log('User not authenticated');
    //     }
    // }, []);

    // const refreshAuthToken = () => {
    //     const email = localStorage.getItem('email');
    //     axios.post('https://pococare-backend-jo8v.onrender.com/refresh-token', { email: email })
    //         .then((response) => {
    //             const newToken = response.data.accessToken;

    //             localStorage.setItem('AccessToken', newToken);

    //             retryOriginalRequest();
    //         })
    //         .catch((error) => {
    //             console.error('Error refreshing AccessToken:-', error);
    //             redirectToLogin();
    //         });
    // };

    // const retryOriginalRequest = () => {
    //     const AccessToken = localStorage.getItem('AccessToken');
    //     if (AccessToken) {
    //         axios.get('https://pococare-backend-jo8v.onrender.com/protected', { headers: { Authorization: AccessToken } })
    //             .then((response) => {
    //                 navigate('/')
    //                 console.log("Redirect to Home page")
    //             })
    //             .catch((error) => {
    //                 console.error('Error accessing protected resource:', error);
    //             });
    //     }
    // };

    // const redirectToLogin = () => {
    //     navigate("/login");
    // };

    return (
        <div>
            <Navbar />
            <Box m={'20px'}>
                <Text textAlign={'center'} fontSize={'3xl'}> About Us </Text>
                <Text>
                    Pococare (short form of Care with Positive Conversations) is a technology-driven healthcare organization that’s on a mission to redefine medical emergency response in India.
                </Text>
                <Text fontSize={'26px'} fontWeight={600}>    Mission</Text>

                Approximately 90% of people in India do not get medical attention on time. Our mission is to reduce this to at least 50% in the next 3 years.
                <Text fontSize={'26px'} fontWeight={600}>
                    What do we do </Text>

                We help people become emergency ready so that they are able to swiftly respond to emergencies. In case of an emergency we ensure that medical help is available in the shortest possible time. Our tech-based solution ensures that an ambulance is available at the patient’s location at the earliest, emergency contacts are informed automatically and a doctor is available to give the necessary guidance till the patient reaches the hospital.
                <Text fontSize={'26px'} fontWeight={600}>
                    Where We Operate </Text>

                We are headquartered in Bangalore and have service coverage in over 500 towns and cities across India..
                <Text fontSize={'26px'} fontWeight={600}>
                    Why did we start ?
                </Text>
                Having worked several years in the medical emergency space working with hospitals, ambulance providers, doctors and over half a million patients, we learnt that:

                The emergency infrastructure in India is equivalent to what the US had in the 1950s.
                Medical emergencies need smooth coordination between the patient, doctor, emergency contacts, treating hospital and ambulance providers
                Ground realities such as unavailability of medical records, ambulance accessibility, lack of a lift, invalid insurance, incorrect hospital add to the complexity of handling medical emergencies.
                A reactive approach often leads to poor decisions, that in turn lead to loss of life, lifelong disabilities, high medical expenses and emotional trauma to patients and their loved ones.
                The emergency infrastructure in India is equivalent to what the US had in the 1950s.
                We believe that the only way to effectively address a medical emergency is to have an integrated solution that co-ordinates across all stakeholders and acts as a single point of contact for all involved.
            </Box>
        </div>
    );
}

export default HomePage;
