import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/aidar_logo.png';

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const isAuthPage = ['/login', '/signup'].includes(location.pathname);
    const isLandingPage = location.pathname === '/';

    return (
        <div className="min-h-screen bg-customPink">
            <nav className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/">
                                    <img 
                                        src={logo} 
                                        alt="aidar logo" 
                                        className="h-8 w-auto sm:h-10 object-contain"
                                    />
                                </Link>
                            </div>
                        </div>
                        
                        {/* Show auth buttons only on landing page */}
                        {isLandingPage && (
                            <button className="flex items-center space-x-4">
                                <Link 
                                    to="/login"
                                    className="text-white hover:text-gray-300 px-4 py-2 rounded-3xl font-bold bg-loginShade text-xl"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup"
                                    className="text-white hover:text-gray-300 px-4 py-2 rounded-3xl font-bold bg-loginShade text-xl"
                                >
                                    Sign Up
                                </Link>
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            <main className={`${isAuthPage ? 'max-w-md' : 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
                {children}
            </main>
        </div>
    )
}