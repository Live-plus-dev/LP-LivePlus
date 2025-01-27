"use client"

import React from 'react';
import Image from 'next/image';

const FeatureCard = ({ imageUrl, title, description }) => (
  <div className="p-6 bg-white shadow-lg rounded-xl text-center">
    <div className="p-4 bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
      <Image
        src={imageUrl}
        alt={title}
        width={48}
        height={48}
        className="w-12 h-12"
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;