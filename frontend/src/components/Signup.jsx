"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loading from '@/components/Loading';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('');
  const [customSex, setCustomSex] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password || !sex || !age) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    if (sex === 'Other' && !customSex.trim()) {
      setError('Please specify sex for "Other".');
      setLoading(false);
      return;
    }
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
      setError('Age must be a number between 1 and 120.');
      setLoading(false);
      return;
    }

    const sexValue = sex === 'Other' ? customSex.trim() : sex;

    try {
      const response = await axios.post('https://alzai.onrender.com/signup', {
        name,
        email,
        password,
        sex: sexValue,
        age: parsedAge,
      });

      if (response.status === 201) {
        setLoading(false);
        router.push('/login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create account');
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] w-screen flex items-center justify-center bg-[#ececec]">
      {loading && <Loading message="Signing Up..." />}
      <form
        onSubmit={handleSignup}
        className="bg-[#ffffff] flex justify-center items-center h-[80%] md:w-[30%] w-[90%] shadow-2xl flex-col rounded-xl gap-6"
      >
        <h1 className="text-black md:text-4xl text-2xl -mb-5 w-full text-center flex justify-center items-center">
          SignUp
        </h1>
        <div className="h-[70%] w-full flex flex-col justify-center items-center md:gap-2 gap-1">
          <label htmlFor="name" className="sm:-mb-3 -mb-1 w-[78%] text-gray-800 md:text-lg text-sm">
            Name
          </label>
          <input
            id="name"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-[10%] md:h-[12%] pl-3 text-black w-[80%] border-[1px] border-[#494949] rounded-lg mb-3"
          />
          <label htmlFor="email" className="sm:-mb-3 -mb-1 w-[78%] text-gray-800 md:text-lg text-sm">
            Email Id
          </label>
          <input
            id="email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[10%] md:h-[12%] pl-3 text-black w-[80%] border-[1px] border-[#494949] rounded-lg mb-3"
          />
          <label htmlFor="password" className="sm:-mb-3 -mb-1 w-[78%] text-gray-800 md:text-lg text-sm">
            Password
          </label>
          <input
            id="password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[10%] md:h-[12%] pl-3 text-black w-[80%] border-[1px] border-[#494949] rounded-lg mb-3"
          />
          <label htmlFor="sex" className="sm:-mb-3 -mb-1 w-[78%] text-gray-800 md:text-lg text-sm">
            Sex
          </label>
          <select
            id="sex"
            required
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="h-[10%] md:h-[12%] pl-3 text-black w-[80%] border-[1px] border-[#494949] rounded-lg mb-3"
          >
            <option value="" disabled>Select sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {sex === 'Other' && (
            <>
              <label htmlFor="customSex" className="sm:-mb-3 -mb-1 w-[78%] text-gray-800 md:text-lg text-sm">
                Specify Sex
              </label>
              <input
                id="customSex"
                required
                type="text"
                value={customSex}
                onChange={(e) => setCustomSex(e.target.value)}
                className="h-[10%] md:h-[12%] pl-3 text-black w-[80%] border-[1px] border-[#494949] rounded-lg mb-3"
                placeholder="Please specify"
              />
            </>
          )}
          <label htmlFor="age" className="sm:-mb-3 -mb-1 w-[78%] text-gray-800 md:text-lg text-sm">
            Age
          </label>
          <input
            id="age"
            required
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            max="120"
            className="h-[10%] md:h-[12%] pl-3 text-black w-[80%] border-[1px] border-[#494949] rounded-lg mb-3"
          />
          <button
            type="submit"
            className="h-[12%] w-[80%] bg-[#000000] md:text-lg text-sm text-white rounded-md cursor-pointer hover:shadow-xl transition-all duration-200 ease-in-out"
          >
            Sign Up
          </button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <p className="text-gray-800 mt-1">
            Already have an account? <Link href="/login" className="text-red-700">Log In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;