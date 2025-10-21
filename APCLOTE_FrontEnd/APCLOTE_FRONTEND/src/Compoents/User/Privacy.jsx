import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Privacy Policy</h1>

        <p className="text-gray-700 mb-4 leading-relaxed">
          APCLOTE is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal data when you use our platform.
        </p>

        <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-3">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Personal details such as name, email address, phone number, and profile information.</li>
          <li>Account activity including course progress, quiz results, and preferences.</li>
          <li>Payment and billing information for subscription and purchases.</li>
          <li>Technical data such as IP address, device information, and browser type.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-3">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>To provide and personalize the learning experience.</li>
          <li>To communicate important updates, offers, or educational resources.</li>
          <li>To improve platform performance and security.</li>
          <li>To comply with legal obligations and resolve disputes.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-3">3. Cookies & Tracking</h2>
        <p className="text-gray-700 mb-4">
          We use cookies and similar technologies to enhance your user experience, remember preferences, and analyze traffic. You can manage cookie preferences through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-3">4. Third-Party Services</h2>
        <p className="text-gray-700 mb-4">
          Our platform may integrate with third-party services such as Google, Facebook, and payment processors. These providers may collect and process your data according to their privacy policies. APCLOTE is not responsible for external services.
        </p>

        <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-3">5. Data Security</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>We implement encryption and secure protocols to protect your data.</li>
          <li>Access to personal data is limited to authorized personnel only.</li>
          <li>Despite measures, no system can guarantee absolute security.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-3">6. User Rights</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Access and update your personal data at any time.</li>
          <li>Request deletion of your account and related data.</li>
          <li>Withdraw consent for data processing or communications.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-3">7. Changes to Privacy Policy</h2>
        <p className="text-gray-700 mb-4">
          APCLOTE may update this Privacy Policy from time to time. Continued use of the platform implies acceptance of any changes.
        </p>

        <p className="mt-8 text-gray-400 text-sm">
          Last updated: 20 October 2025
        </p>
      </div>
    </div>
  );
};

export default Privacy;
