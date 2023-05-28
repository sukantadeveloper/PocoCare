import React, { useState } from 'react';
import {
    Box,
    Heading,
    Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Text,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const toast = useToast();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setUserData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('https://pococare-backend-jo8v.onrender.com/register', userData);
            toast({
                title: 'Registration successful',
                status: 'success',
                isClosable: true,
                position: 'top'
            });
            navigate('/login');
            console.log('Registration successful');
        } catch (error) {
            toast({
                title: error.response.data.message,
                status: 'error',
                isClosable: true,
                position: 'top'
            });
            console.error('Error Registering:', error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Flex
            height="100vh"
            backgroundColor="gray.50"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                backgroundColor="white"
                p={8}
                borderRadius="lg"
                boxShadow="md"
                width={{ base: '90%', sm: '50%', md: '50%', lg: '30%' }}
            >
                <Box textAlign="center" mb={8}>
                    <Heading as="h1" fontSize="22px">
                        PocoCare
                    </Heading>
                    <Text fontSize="15px" mt={2} color="gray.600">
                        Sign Up
                    </Text>
                </Box>
                <form onSubmit={handleSubmit}>
                    <FormControl id="name" mb={4}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            required
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </FormControl>
                    <FormControl id="email" mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            required
                            type="text"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </FormControl>
                    <FormControl id="password" mb={8}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            required
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="blue"
                        mb={4}
                        w="full"
                        borderRadius="full"
                        fontWeight="medium"
                        _hover={{ transform: 'scale(1.05)' }}
                        _active={{ transform: 'scale(0.95)' }}
                        isLoading={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Register'}
                    </Button>
                </form>
                <Text mb={4}>Do you already have an account?</Text>
                <Link to="/login">
                    <Button
                        colorScheme="green"
                        mb={4}
                        borderRadius="full"
                        fontWeight="medium"
                        _hover={{ transform: 'scale(1.05)' }}
                        _active={{ transform: 'scale(0.95)' }}
                    >
                        Login
                    </Button>
                </Link>
            </Box>
        </Flex>
    );
}

export default Register;
