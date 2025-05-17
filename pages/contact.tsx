import Layout from "components/layout/Landing";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const { t } = useTranslation("common");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading state here if needed
    try {
      // Replace with your actual form submission logic
      // await submitContactForm(formState);

      // For demo purposes, we'll simulate a successful submission
      setFormStatus({
        submitted: true,
        error: false,
        message: t(
          "contact.success_message",
          "Thank you for your message. We'll get back to you soon!"
        ),
      });

      // Clear form
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setFormStatus({
        submitted: true,
        error: true,
        message: t(
          "contact.error_message",
          "Something went wrong. Please try again."
        ),
      });
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <Head>
        <title>
          {t(
            "contact.page_title",
            "Contact Us | Handcrafted Indonesian Candles"
          )}
        </title>
        <meta
          name="description"
          content={t(
            "contact.meta_description",
            "Get in touch with our team for inquiries, custom orders, or to learn more about our handcrafted candles."
          )}
        />
      </Head>

      {/* Hero Section */}
      <motion.div
        className="w-full bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-100"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 dark:text-amber-400 mb-4">
              {t("contact.hero_title", "Contact Us")}
            </h1>
            <div className="h-1 w-24 bg-amber-500 rounded mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl">
              {t(
                "contact.hero_subtitle",
                "We'd love to hear from you. Get in touch with our team for any questions, custom orders, or feedback."
              )}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="w-full bg-white dark:bg-gray-800 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-1"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-400 mb-6">
                  {t("contact.info_title", "Get In Touch")}
                </h2>

                {/* Contact Details */}
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-600 dark:text-amber-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {t("contact.email_label", "Email")}
                      </p>
                      <a
                        href="mailto:info@indonesiancandles.com"
                        className="text-base text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        info@indonesiancandles.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-600 dark:text-amber-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {t("contact.phone_label", "Phone")}
                      </p>
                      <a
                        href="tel:+62-123-4567"
                        className="text-base text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        +62-123-4567
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-600 dark:text-amber-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {t("contact.address_label", "Address")}
                      </p>
                      <p className="text-base text-gray-700 dark:text-gray-300">
                        123 Candle Street
                        <br />
                        Jakarta, 12345
                        <br />
                        Indonesia
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-600 dark:text-amber-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {t("contact.hours_label", "Business Hours")}
                      </p>
                      <p className="text-base text-gray-700 dark:text-gray-300">
                        Monday - Friday: 9AM - 5PM
                        <br />
                        Saturday: 10AM - 2PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {t("contact.social_title", "Connect With Us")}
                  </h3>
                  <div className="flex space-x-4">
                    {/* Instagram */}
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>

                    {/* Facebook */}
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>

                    {/* Twitter */}
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-400 mb-6">
                  {t("contact.form_title", "Send Us a Message")}
                </h2>

                {formStatus.submitted ? (
                  <div
                    className={`p-4 rounded-lg mb-6 ${
                      formStatus.error
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                        : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {t("contact.form.name_label", "Full Name")}*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder={t(
                          "contact.form.name_placeholder",
                          "Your name"
                        )}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {t("contact.form.email_label", "Email Address")}*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder={t(
                          "contact.form.email_placeholder",
                          "your.email@example.com"
                        )}
                      />
                    </div>
                  </div>

                  {/* Phone and Subject Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {t("contact.form.phone_label", "Phone Number")}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder={t(
                          "contact.form.phone_placeholder",
                          "+62-xxx-xxxx"
                        )}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {t("contact.form.subject_label", "Subject")}*
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder={t(
                          "contact.form.subject_placeholder",
                          "How can we help?"
                        )}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {t("contact.form.message_label", "Message")}*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={t(
                        "contact.form.message_placeholder",
                        "Your message here..."
                      )}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                    >
                      {t("contact.form.submit_button", "Send Message")}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <motion.div
        className="w-full bg-gray-50 dark:bg-gray-900 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-800 dark:text-amber-400 mb-4">
              {t("contact.map_title", "Visit Our Workshop")}
            </h2>
            <div className="h-1 w-24 bg-amber-500 rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t(
                "contact.map_description",
                "Experience our candle-making process firsthand and explore our full collection at our workshop in Jakarta."
              )}
            </p>
          </div>

          {/* Map Iframe - Replace with your actual map embed */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 overflow-hidden h-96">
            <div className="w-full h-full rounded-xl overflow-hidden">
              {/* Replace the src with your actual Google Maps or other map provider embed code */}
              <iframe
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.65294571658!2d106.68942551091747!3d-6.2295712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1652456912037!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Workshop Location"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="w-full bg-white dark:bg-gray-800 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-800 dark:text-amber-400 mb-4">
              {t("contact.faq_title", "Frequently Asked Questions")}
            </h2>
            <div className="h-1 w-24 bg-amber-500 rounded mx-auto mb-6"></div>
          </div>

          <div className="space-y-6">
            {[
              {
                question: t(
                  "contact.faq.question1",
                  "What are your shipping options?"
                ),
                answer: t(
                  "contact.faq.answer1",
                  "We offer standard shipping throughout Indonesia with delivery times ranging from 3-7 business days depending on your location. Express shipping is available for next-day delivery in major cities."
                ),
              },
              {
                question: t(
                  "contact.faq.question2",
                  "Can I place a custom candle order?"
                ),
                answer: t(
                  "contact.faq.answer2",
                  "Yes! We love creating custom candles for special occasions. Please contact us with your requirements and we'll work with you to create something unique."
                ),
              },
              {
                question: t(
                  "contact.faq.question3",
                  "What payment methods do you accept?"
                ),
                answer: t(
                  "contact.faq.answer3",
                  "We accept various payment methods including credit/debit cards, bank transfers, GoPay, OVO, and DANA. All transactions are secure and encrypted."
                ),
              },
              {
                question: t(
                  "contact.faq.question4",
                  "Do you offer wholesale options?"
                ),
                answer: t(
                  "contact.faq.answer4",
                  "Yes, we provide wholesale pricing for businesses. Please contact our sales team directly for more information and to discuss your requirements."
                ),
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              {t(
                "contact.faq_more",
                "Have more questions? Don't hesitate to reach out to us!"
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

Contact.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "order"])),
    },
  };
}

export default Contact;
