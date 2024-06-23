import { FaLinkedin } from 'react-icons/fa';
import { FaGithub, FaInstagram } from 'react-icons/fa';

import logo from '/Users/rahulshah/Desktop/Portfolio/src/assets/kevinRushLogo.png';
const Navbar = () => {
    const handleLinkedInClick = () => {
        window.open("https://www.linkedin.com/in/bhuvanshah/", "_blank");
    }

    const handleGithubClick = () => {
        window.open("https://github.com/Bhuvannnn", "_blank");
    }

    const handleInstagramClick = () => {
        window.open("https://www.instagram.com/bhu._.one/", "_blank");
    }
    return(
    <nav className="mb-20 flex items-center justify-between py-6">

        <div className="flex flex-shrink-0 items-center">
            <img className="mx-2 w-10" src={logo} alt="logo"/>
        </div>
        <div className=' flex m-8 items-center justify-center gap-4 text-2xl'> 
            <FaLinkedin onClick={handleLinkedInClick} className='cursor-pointer'/>
            <FaGithub onClick={handleGithubClick} className='cursor-pointer'/>
            <FaInstagram onClick={handleInstagramClick} className='cursor-pointer'/>
        </div>
    </nav>
    );
};

export default Navbar;