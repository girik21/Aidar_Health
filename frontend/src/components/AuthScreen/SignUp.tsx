import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SIGNUP_USER = gql`
  mutation Signup($userInput: UserInput!) {
    signup(userInput: $userInput) {
      user {
        id
        username
        email
      }
      token
    }
  }
`;

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [signupUser] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signup.token); // Store token in local storage
      navigate('/signin'); // Redirect to home or desired page
    },
    onError: (error) => {
      setError(error.message); // Set error message
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Reset error state
    signupUser({ variables: { userInput: { username: name, email, password } } });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full rounded-md border-black-200 border bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border-black-200 border bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="mt-1 block w-full rounded-md border-black-200 border bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-customPink hover:bg-red-400 text-black font-extrabold py-2 px-4 rounded-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
