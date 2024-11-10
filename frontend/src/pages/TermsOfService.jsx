import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";
import { scroller } from "react-scroll";

const termsData = [
  {
    title: "Introduction",
    desc: "Welcome to ServiceConnect! These Terms of Service (TOS) govern your access to and use of our website and services. By using our platform, you agree to comply with these terms and conditions. If you do not agree with any part of this agreement, you should not use our services.",
  },
  {
    title: "Use of Service",
    desc: "ServiceConnect provides a platform for connecting users with specialists for various services, including home repairs, cleaning, tutoring, personal care, and more. You agree to use our services only for lawful purposes and in accordance with these terms. Unauthorized use of our services, including but not limited to fraud or abuse, will result in termination of your account.",
  },
  {
    title: "Account Registration",
    desc: "To access certain services on ServiceConnect, you may be required to create an account. You agree to provide accurate and complete information during registration and to keep your account details up to date. You are responsible for maintaining the confidentiality of your account and password.",
  },
  {
    title: "Service Providers (Specialists)",
    desc: "ServiceConnect connects users with third-party service providers (specialists) for various tasks. While we take steps to verify the qualifications of specialists, we do not guarantee the accuracy or quality of the services provided. Users are encouraged to review specialists’ profiles, ratings, and reviews before booking services.",
  },
  {
    title: "Payment and Fees",
    desc: "Payments for services are made directly through our platform. You agree to pay the applicable fees for the services you request, which will be outlined at the time of booking. All payments are processed securely through our payment gateway.",
  },
  {
    title: "Refund Policy",
    desc: "Refunds are available in cases where the service has not been delivered as agreed. If you are dissatisfied with the service provided, please contact our support team within 30 days of the service to request a resolution or refund.",
  },
  {
    title: "Limitation of Liability",
    desc: "ServiceConnect is not responsible for any damages, losses, or liabilities resulting from the use of the services provided by specialists. Our role is to connect users with specialists, and we do not assume any responsibility for the performance or quality of the services provided.",
  },
  {
    title: "Termination of Service",
    desc: "ServiceConnect reserves the right to suspend or terminate your account at any time if you violate these terms or engage in fraudulent or harmful behavior. Upon termination, you will lose access to all services on the platform.",
  },
  {
    title: "Changes to Terms",
    desc: "We reserve the right to update or modify these Terms of Service at any time. Any changes will be posted on this page, and the updated terms will take effect as of the date of posting. We recommend that you review these terms regularly.",
  },
  {
    title: "Governing Law",
    desc: "These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction in which ServiceConnect operates. Any disputes arising under these terms shall be resolved in the courts of that jurisdiction.",
  },
];

export function TermsOfService() {
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
              Terms of Service
            </h1>
            <p className="mt-4 text-lg font-medium text-slate-600 sm:text-xl">
              Please read the following terms and conditions carefully before
              using our services.
            </p>
          </div>
          <div className="space-y-8">
            {termsData.map(({ title, desc }) => (
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

export default TermsOfService;
