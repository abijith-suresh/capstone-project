import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";
import { scroller } from "react-scroll";

const faqs = [
  {
    title: "How do I find a specialist for my task?",
    desc: "Finding a reliable specialist can be challenging, especially for urgent tasks. Our platform helps you quickly connect with trusted specialists who are available on short notice. Simply enter the task you need help with, and we’ll match you with qualified professionals in your area.",
  },
  {
    title: "What types of services can I request?",
    desc: "We offer a wide range of services including home repairs (plumbing, electrical, etc.), cleaning, tutoring, personal care, and more. Whether you need a last-minute plumber for a leaking pipe or a tutor for your child, we connect you with specialists who can help.",
  },
  {
    title: "How do I know the specialists are trustworthy?",
    desc: "We carefully vet all specialists on our platform to ensure they meet high standards of professionalism and reliability. We also offer user reviews and ratings, so you can make an informed decision based on the experiences of others.",
  },
  {
    title: "Can I request a specialist on short notice?",
    desc: "Yes, our platform is designed to help you find specialists quickly, even for last-minute requests. Whether it’s an emergency home repair or a sudden need for a personal care specialist, we’ll work to match you with someone available to assist you as soon as possible.",
  },
  {
    title: "How do I book a specialist?",
    desc: "Booking a specialist is simple. Just provide the details of the service you need, including the location, and we’ll show you available specialists in your area. You can choose the one that best fits your needs, and schedule an appointment at your convenience.",
  },
  {
    title: "How can I ensure I’m getting quality service?",
    desc: "In addition to our careful vetting process, we provide user reviews, ratings, and specialist profiles to help you make an informed choice. You can also contact the specialist directly to discuss your needs and ask any questions before confirming your booking.",
  },
  {
    title: "What happens if I’m not satisfied with the service?",
    desc: "We strive for high-quality service, but if you’re not satisfied, please reach out to our support team. We will work with you to resolve the issue, which may include re-booking the service or offering a refund, depending on the situation.",
  },
  {
    title: "How do I make a payment?",
    desc: "We offer secure payment options through our platform. After booking a specialist, you can pay directly via credit card, debit card, or other available methods. All payments are processed securely to ensure your peace of mind.",
  },
  {
    title: "Is there a way to get a refund if I’m not happy with the service?",
    desc: "Refunds are available within 30 days of service delivery if the task was not completed to your satisfaction. Please contact our support team with your concerns, and we’ll guide you through the refund process.",
  },
];

export function FaqPage() {
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
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg font-medium text-slate-600 sm:text-xl">
              Find answers to the most common questions about our services,
              payments, and more.
            </p>
          </div>
          <div className="space-y-8">
            {faqs.map(({ title, desc }) => (
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

export default FaqPage;
