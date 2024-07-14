import { FaLinkedin, FaGithub, FaInstagram, FaFilePdf } from 'react-icons/fa';
import logo from '/Users/rahulshah/Desktop/tech-portfolio/src/assets/BS LOGO-JULY 2024.png';

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

    const handleResumeClick = () => {
        const baseUrl = process.env.NODE_ENV === 'development' ? '' : '/tech-portfolio';
        window.open(`${baseUrl}/Bhuvan%20Resume.pdf`, "_blank"); // Adjusted path
    }

    return (
        <nav className="mb-20 flex items-center justify-between py-6">
            <div className="flex flex-shrink-0 items-center">
                <img className="mx-2 w-10" src={logo} alt="logo" />
            </div>
            <div className='flex m-8 items-center justify-center gap-4 text-2xl'>
                <FaFilePdf onClick={handleResumeClick} className='cursor-pointer' />
                <FaLinkedin onClick={handleLinkedInClick} className='cursor-pointer'/>
                <FaGithub onClick={handleGithubClick} className='cursor-pointer'/>
                <FaInstagram onClick={handleInstagramClick} className='cursor-pointer'/>
            </div>
        </nav>
    );
};

export default Navbar;
