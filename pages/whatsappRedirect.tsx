import { handleRedirectToWhatsapp } from '@/components/WhatsappButton';
import React, { useEffect } from 'react'

function WhatsappRedirect() {

    useEffect(() => {
        handleRedirectToWhatsapp()
    }
    , []);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Redirecting...</p>
          <p className="text-gray-500 text-sm mt-2">
            Taking you to your destination
            <span onClick={handleRedirectToWhatsapp} className='hover:underline'>Click here</span> if not redirected automatically.
          </p>
        </div>
      </div>
    );
}

export default WhatsappRedirect