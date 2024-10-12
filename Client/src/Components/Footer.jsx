import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-red-50 text-gray py-10">
        <div className="mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">HaemoHub</h3>
                    <p className="text-sm">Making a Lifesaving Impact Every Day</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-red-500">Home</a></li>
                        <li><a href="/AboutUs" className="hover:text-red-500">About Us</a></li>
                        <li><a href="/Search" className="hover:text-red-500">Search</a></li>
                        <li><a href="/Stories" className="hover:text-red-500">Stories</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                    <div className="flex space-x-4 mb-4 place-content-center">
                        <a href="https://github.com/PoshikaM" rel="noopener noreferrer" className="hover:text-gray-400">
                            <FaGithub size={26} />
                        </a>
                        <a href="https://www.linkedin.com/in/poshika-mangai-m" rel="noopener noreferrer" className="hover:text-blue-500">
                            <FaLinkedin size={26} />
                        </a>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Join Us</h4>
                    <ul className="space-y-2">
                        <li><a href="/signup" className="hover:text-red-500">Signup</a></li>
                        <li><a href="/Login" className="hover:text-red-500">Login</a></li>
                        <li><a href="/BloodBankSignup" className="hover:text-red-500">BloodBankSignup</a></li>
                        <li><a href="/BloodBankLogin" className="hover:text-red-500">BloodBankLogin</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                <p>© 2024 HaemoHub. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;