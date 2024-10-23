import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the LOGIN mutation
const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                username
                email
                roles
            }
        }
    }
`;

interface LoginProps {
    setToken: (token: string) => void;
}

export default function Login({ setToken } : LoginProps) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser] = useMutation(LOGIN_USER);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({ variables: { email, password } });
            const { token, user } = data.login;

            if (user.roles === 'DOCTOR') { // Check user role if necessary
                localStorage.setItem('token', token);
                setToken(token); // Update the token in the App component
                navigate('/dashboard'); // Redirect to the dashboard
            } else {
                alert('You do not have permission to access this page.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Only doctors can login.');
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md border-black-200 border bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-black-200 border bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-customPink hover:bg-red-400 text-black font-extrabold py-2 px-4 rounded-md"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
