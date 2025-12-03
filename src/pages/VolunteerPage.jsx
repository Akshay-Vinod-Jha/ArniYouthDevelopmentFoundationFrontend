import React from "react";

const VolunteerPage = () => {
  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Volunteer Application
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Page coming soon with volunteer application form
        </p>
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
          <p className="text-gray-700">This page will include:</p>
          <ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
            <li>✓ Volunteer opportunities</li>
            <li>✓ Application form</li>
            <li>✓ Skills and interests selection</li>
            <li>✓ Availability preferences</li>
            <li>✓ Application status tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;
