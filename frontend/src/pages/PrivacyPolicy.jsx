import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";
import { scroller } from "react-scroll";

const privacyPolicyData = [
  {
    title: "Introduction",
    desc: "ServiceConnect values your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform. By using our services, you consent to the practices described in this policy.",
  },
  {
    title: "Information We Collect",
    desc: "We collect personal information that you provide when you register on our platform, make a booking, or communicate with us. This may include your name, email address, phone number, billing information, and service preferences. We also collect non-personal data such as browser type, IP address, and usage patterns through cookies and analytics tools.",
  },
  {
    title: "How We Use Your Information",
    desc: "We use your personal information to provide and improve our services, process transactions, communicate with you, and respond to your inquiries. Your information may also be used to send you updates about our services, promotions, or important notices related to your account.",
  },
  {
    title: "Sharing Your Information",
    desc: "We do not sell or rent your personal information to third parties. However, we may share your data with specialists (service providers) to fulfill your service requests. We may also share information with trusted third-party partners, such as payment processors or service providers, who help us operate the platform and provide services to you.",
  },
  {
    title: "Security of Your Information",
    desc: "We take reasonable steps to protect your personal information from unauthorized access, use, or disclosure. We use industry-standard security measures, such as encryption and secure servers, to safeguard your data. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Cookies and Tracking Technologies",
    desc: "ServiceConnect uses cookies and other tracking technologies to enhance your user experience, analyze site usage, and personalize content. You can control cookie settings through your browser, but disabling cookies may affect your ability to use certain features of our platform.",
  },
  {
    title: "Your Data Rights",
    desc: "You have the right to access, update, or delete your personal information. You can also request a copy of the data we hold about you. To exercise these rights, please contact our support team. In some cases, we may need to retain certain information for legal or administrative purposes.",
  },
  {
    title: "Children's Privacy",
    desc: "ServiceConnect does not knowingly collect personal information from individuals under the age of 13. If you believe we have inadvertently collected such information, please contact us, and we will take steps to delete it.",
  },
  {
    title: "Changes to This Privacy Policy",
    desc: "We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the updated policy will take effect as of the date of posting. We encourage you to review this policy periodically to stay informed about how we protect your privacy.",
  },
  {
    title: "Contact Us",
    desc: "If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at [email@example.com] or through our contact page.",
  },
];

export function PrivacyPolicy() {
  useEffect(() => {
    scroller.scrollTo("top", {
      smooth: true,
      offset: 0,
      duration: 750,
    });
  }, []);
  return (
    <div className="bg-white" id="top">
      <Header />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg font-medium text-slate-600 sm:text-xl">
              Your privacy is important to us. Please read the following to
              understand how we collect, use, and protect your information.
            </p>
          </div>
          <div className="space-y-8">
            {privacyPolicyData.map(({ title, desc }) => (
              <div key={title}>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  {title}
                </h2>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-slate-700">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
