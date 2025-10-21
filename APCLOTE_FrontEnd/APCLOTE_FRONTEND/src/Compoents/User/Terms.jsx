import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Terms & Conditions</h1>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Welcome to <span className="font-semibold">APCLOTE</span>, your trusted online coaching platform. By accessing or using our services, you agree to abide by these Terms & Conditions. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mt-6 mb-3">1. Account Registration</h2>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Users must register with accurate personal information.</li>
          <li>Each account is personal; sharing credentials is strictly prohibited.</li>
          <li>Users are responsible for maintaining the confidentiality of their account.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-800 mt-6 mb-3">2. Payment and Subscription</h2>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>All paid courses must be purchased via authorized payment channels.</li>
          <li>Refund policies will be applied according to our subscription guidelines.</li>
          <li>We reserve the right to change prices and subscription fees at any time.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-800 mt-6 mb-3">3. Content Usage</h2>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>All course materials, videos, and resources are for personal, non-commercial use.</li>
          <li>Copying, sharing, or distributing content without permission is prohibited.</li>
          <li>We retain the right to remove content or terminate accounts violating these rules.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-800 mt-6 mb-3">4. User Conduct</h2>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Users must not engage in offensive, abusive, or illegal behavior.</li>
          <li>Posting misleading or spam content is strictly prohibited.</li>
          <li>Violations may result in account suspension or legal action.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-800 mt-6 mb-3">5. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          APCLOTE is not responsible for any indirect, incidental, or consequential damages arising from the use of our platform. We strive to provide accurate and up-to-date content, but we do not guarantee results or outcomes from using our courses.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mt-6 mb-3">6. Modifications</h2>
        <p className="text-gray-700 mb-4">
          We may update these Terms & Conditions at any time. Users are encouraged to review this page regularly. Continued use of our platform constitutes acceptance of any changes.
        </p>

        <p className="mt-8 text-gray-400 text-sm">
          Last updated: 20 October 2025
        </p>
      </div>
    </div>
  );
};

export default Terms;
