import React, { useState } from 'react';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Brand Partners' },
    { number: '100%', label: 'Quality Guarantee' }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Fashion Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      description: '10+ years in fashion industry'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      description: 'Supply chain expert'
    },
    {
      name: 'Emma Davis',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      description: 'Dedicated to customer satisfaction'
    }
  ];

  const tabContent = {
    mission: {
      title: "Our Mission",
      content: "We believe that everyone deserves to feel confident and stylish in their clothing. Our mission is to provide high-quality, sustainable fashion that empowers individuals to express their unique personality while making conscious choices for our planet."
    },
    story: {
      title: "Our Story",
      content: "Founded in 2018, StyleHub began as a small boutique with a big dream. What started as a passion project between two fashion enthusiasts has grown into a trusted destination for thousands of customers seeking quality clothing that combines style, comfort, and sustainability."
    },
    values: {
      title: "Our Values",
      content: "Quality craftsmanship, sustainable practices, and exceptional customer service are at the heart of everything we do. We partner with ethical manufacturers and use eco-friendly materials to ensure our fashion leaves a positive impact on both people and the planet."
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Eagle
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted destination for premium men's and women's clothing, 
            where style meets sustainability and quality craftsmanship.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Store interior"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            
            {/* Content Section */}
            <div className="md:w-1/2 p-8">
              {/* Tabs */}
              <div className="flex space-x-4 mb-6 border-b">
                {['mission', 'story', 'values'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 font-medium transition-colors duration-200 ${
                      activeTab === tab
                        ? 'text-yellow-600 border-b-2 border-yellow-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tabContent[tab].title}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {tabContent[activeTab].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {tabContent[activeTab].content}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700">Premium quality materials</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700">Sustainable and ethical production</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700">Perfect fit guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden text-center hover:shadow-lg transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mt-6 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-yellow-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 text-center text-black">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-grey-600 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered their perfect style with our curated collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200">
              Shop Men's Collection
            </button>
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200">
              Shop Women's Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;