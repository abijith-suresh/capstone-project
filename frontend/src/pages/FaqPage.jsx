import React from "react";
import { Typography } from "@material-tailwind/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const faqs = [
  {
    title: "How do I order?",
    desc: "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play this game of life you need to appreciate every moment. A lot of people don't appreciate the moment until it's passed.",
  },
  {
    title: "How can I make the payment?",
    desc: "It really matters and then like it really doesn't matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn't matter. Because it's about motivating the doers. Because I'm here to follow my dreams and inspire other people to follow their dreams, too. We're not always in the position that we want to be at.",
  },
  {
    title: "What services do you provide?",
    desc: "We offer a wide range of services, from web development to digital marketing. Whether you're looking to build a new website or improve your current one, we have the expertise to help you succeed.",
  },
  {
    title: "Can I get a refund?",
    desc: "Refunds are available within 30 days of purchase, provided the service hasn't been delivered. Please reach out to our support team for more details on refund procedures.",
  },
];

export function FaqPage() {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <Header />

      {/* FAQ Section */}
      <section className="px-8 py-20">
        <div className="container mx-auto">
          <div className="mb-14 text-center">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-4 text-4xl !leading-snug lg:text-[40px]"
            >
              Frequently Asked Questions
            </Typography>
            <Typography className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl">
              Find answers to the most common questions about our services,
              payments, and more.
            </Typography>
          </div>
          <div className="max-w-3xl mx-auto grid gap-10">
            {faqs.map(({ title, desc }) => (
              <div key={title}>
                <Typography
                  color="blue-gray"
                  className="pb-6 text-[20px] font-bold"
                >
                  {title}
                </Typography>
                <div className="border-t border-gray-200 pt-4">
                  <Typography className="font-normal !text-gray-500">
                    {desc}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default FaqPage;
