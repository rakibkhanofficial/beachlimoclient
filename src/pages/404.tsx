// pages/404.tsx
import Link from 'next/link';
import React from 'react';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <p className="text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700">
          Go back to the homepage
        </p>
      </Link>
    </div>
  );
};

export default Custom404;
