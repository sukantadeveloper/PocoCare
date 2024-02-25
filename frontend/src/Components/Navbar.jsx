import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    function clearCookie(cookieName) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
      
      const logout = () => {
        clearCookie('refreshToken');
        navigate('/login');
      };
      
    return (
        <Box w={'100%'} fontWeight={'bold'} fontSize={'220x'} p={'10px 2px'} bg={'black'}

            color={'white'} display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
            <Text>Testing form</Text>
            <Text cursor={'pointer'} onClick={logout}> Logout</Text>
        </Box>
    );
}

export default Navbar;