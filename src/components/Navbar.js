import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

function Navbar() {
    const router = useRouter()
    const [name, setName] = useState("")
    useEffect(() => {
        let name = localStorage.getItem('name')
        if(name != null) {
            setName(name)
        } else {
            if(!router.isReady) return;
        const query = router.query;
        let passportName = query.name;
        localStorage.setItem('name', passportName)
        setName(passportName)
        }
      }, [router.isReady, router.query]);

    function logOut() {
        // Clear user info and send back to login page
        localStorage.clear()
        router.push('/')
    };

    function stringAvatar(name) {
        // Determines initials of user to put in avatar
        return {
            children: `${name.split(' ')[0][0]}`,
        }
    };

    return (
        <Box className="iconBar">
            <Link href="/home">
                <a>
                    <Image src="/icons/house.webp" alt="home icon" width={120} height={120} quality={100}  />
                </a>
            </Link>
            <Link href="/leaderboard">
                <a>
                    <Image className="trophy" src="/icons/trophy.webp" alt="leaderboard icon" width={120} height={120} quality={100} />
                </a>
            </Link>
            <span className="pointer" onClick={logOut} >
                <Image src="/icons/exit.webp" alt="logout icon" width={120} height={120} quality={100} />
            </span>
            <Link href="/profile">
                <Avatar className="avatar pointer" sx={{ bgcolor: '#33236c', color: '#ceb728' }} {...stringAvatar(name.toUpperCase())} />
            </Link>
        </Box>
    )
};

export default Navbar