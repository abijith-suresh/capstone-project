import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  HandThumbUpIcon,
  ClockIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { scroller } from "react-scroll";

const values = [
  {
    name: "Trustworthiness",
    description:
      "We vet each specialist to ensure they meet high standards of quality and professionalism. With ServiceConnect, you can trust that the specialists you hire are reliable and skilled.",
    icon: HandThumbUpIcon,
  },
  {
    name: "Convenience",
    description:
      "Our platform makes it easy to find and book trusted specialists quickly, saving you time and effort so you can focus on what matters most.",
    icon: ClockIcon,
  },
  {
    name: "Customer-Centered",
    description:
      "Your satisfaction is our priority. We strive to provide a seamless, transparent, and stress-free experience, always listening and improving based on your needs.",
    icon: UserGroupIcon,
  },
  {
    name: "Quality",
    description:
      "We ensure the highest standards of skill and reliability from our specialists, so you always receive the quality service you expect.",
    icon: ShieldCheckIcon,
  },
];

const AboutPage = () => {
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
        <section className="flex items-center justify-center py-48 text-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold sm:text-6xl text-gray-900">
              Welcome to SnapServe!
            </h1>
            <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
              We are a dedicated team connecting you with trusted specialists
              when you need them most—whether for a quick home repair, tutoring,
              or personal care. Fast, easy, and reliable.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-semibold text-gray-800">
              Our Mission
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              At SnapServe, our mission is simple: to make it easier for
              you to find trusted specialists when you need them most. We
              connect you with reliable professionals quickly, so you can focus
              on what matters.
            </p>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/3 transform-gpu -z-10 overflow-hidden blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-1/2 -translate-x-1/2 aspect-[1155/678] w-[36.125rem] sm:w-[72.1875rem] rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-semibold text-gray-800">Our Values</h2>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16">
                {values.map((value) => (
                  <div key={value.name} className="relative pl-16">
                    <dt className="text-2xl font-semibold text-gray-900">
                      <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                        <value.icon
                          aria-hidden="true"
                          className="h-6 w-6 text-white"
                        />
                      </div>
                      {value.name}
                    </dt>
                    <dd className="mt-2 text-lg text-gray-600">
                      {value.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-semibold text-gray-800">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Our team consists of highly skilled professionals who are
              passionate about delivering exceptional results. Here's a glimpse
              of some of the people driving our success.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="w-32 h-32 mx-auto rounded-full"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  Abijith S
                </h3>
                <p className="text-gray-600">Co-Founder</p>
              </div>
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="w-32 h-32 mx-auto rounded-full"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  Aarzoo 
                </h3>
                <p className="text-gray-600">Co-Founder</p>
              </div>
            </div>
          </div>
        </section>
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
};

export default AboutPage;
