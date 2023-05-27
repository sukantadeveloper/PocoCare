import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate=useNavigate();
    const logout = () => {
        localStorage.clear('token')
        navigate('/login')
    }
    return (
        <Box w={'100%'} fontWeight={'bold'} fontSize={'220x'} p={'10px 2px'} bg={'black'} color={'white'} display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
            <Text>PocoCare</Text>
            <Text cursor={'pointer'} onClick={logout}> Logout</Text>
        </Box>
    );
}

export default Navbar;