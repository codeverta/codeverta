import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import packageInfo from "../package.json";
import Link from "next/link";

const version = packageInfo.version;
const keywords = [
  "belajar ngoding",
  "kursus coding online",
  "tutorial pemrograman",
  "cara belajar coding untuk pemula",
  "website belajar coding gratis",
  "komunitas belajar coding",
  "tips belajar coding",
  "langkah-langkah belajar coding",
  "belajar bahasa pemrograman",
  "platform belajar coding",
  "belajar coding interaktif",
  "belajar coding dari nol",
  "belajar coding web",
  "belajar coding mobile",
  "belajar coding game",
  "belajar algoritma",
  "belajar struktur data",
  "belajar framework [nama framework]",
  "belajar library [nama library]",
  "belajar coding Python",
  "belajar coding JavaScript",
  "belajar coding Java",
  "belajar coding C++",
  "belajar coding PHP",
  "belajar coding Kotlin",
  "belajar coding Swift",
  "belajar data science",
  "belajar machine learning",
  "belajar artificial intelligence",
  "belajar cyber security",
  "belajar web development",
  "belajar front-end",
  "belajar back-end",
  "belajar full-stack",
  "belajar desain web",
  "belajar UI/UX",
  "belajar database",
  "belajar SQL",
  "belajar Git",
  "belajar GitHub",
  "belajar cloud computing",
  "belajar AWS",
  "belajar Google Cloud",
  "belajar Azure",
  "belajar DevOps",
  "belajar testing software",
  "belajar mobile development Android",
  "belajar mobile development iOS",
  "belajar game development Unity",
  "belajar game development Unreal Engine",
  "sumber belajar coding",
  "rekomendasi website belajar coding",
  "belajar coding Indonesia",
  "bootcamp coding",
  "mentoring coding",
  "karir di bidang IT",
  "tips menjadi programmer",
  "belajar coding efektif",
  "belajar coding cepat",
  "belajar coding mudah",
];

export default function Footer() {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [footerLinks, setFooterLinks] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);

  useEffect(() => {
    // Initialize footer links with translated content
    setFooterLinks([
      {
        title: t("footer.about", "About"),
        links: [
          { name: t("footer.profile", "Profile"), url: "/about" },
          { name: t("footer.careers", "Careers"), url: "/careers" },
          { name: t("footer.blog", "Blog"), url: "/blog" },
          { name: t("footer.contact", "Contact"), url: "/contact" },
        ],
      },
      {
        title: t("footer.help"),
        links: [
          { name: t("footer.howToBuy", "How to Buy"), url: "/cara-order" },
          { name: t("footer.payment", "Payment"), url: "/payment" },
          { name: t("footer.shipping", "Shipping"), url: "/shipping" },
          { name: t("footer.returns", "Returns"), url: "/returns" },
          { name: t("footer.faq", "FAQ"), url: "/faq" },
        ],
      },
      {
        title: t("footer.info"),
        links: [
          { name: t("footer.terms", "Terms"), url: "/terms" },
          { name: t("footer.privacy", "Privacy"), url: "/privacy" },
          {
            name: t("footer.shippingPolicy", "Shipping Policy"),
            url: "/shipping-policy",
          },
          {
            name: t("footer.returnPolicy", "Return Policy"),
            url: "/return-policy",
          },
        ],
      },
    ]);

    // Initialize social media links with translations
    setSocialMediaLinks([
      {
        name: t("social.instagram"),
        url: "https://instagram.com/codeverta.com",
        icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
      },
      {
        name: t("social.facebook"),
        url: "https://facebook.com/codeverta.com",
        icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
      },
      {
        name: t("social.twitter"),
        url: "https://twitter.com/codeverta.com",
        icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
      },
      {
        name: t("social.whatsapp"),
        url: "https://wa.me/+62815678956156",
        icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
      },
    ]);

    // Initialize payment methods with translations
    setPaymentMethods([
      {
        name: t("payment.bca"),
        url: "/payment-bca",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi6YqCV5pKHgR1wbFk9rQM4royDuLH7oMX-A&s",
      },
      {
        name: t("payment.mandiri"),
        url: "/payment-mandiri",
      },
      {
        name: t("payment.bni"),
        url: "/payment-bni",
      },
      { name: t("payment.bri"), url: "/payment-bri" },
    ]);

    // Initialize shipping methods
    setShippingMethods([
      { name: "JNE", url: "/shipping-jne", image: "/jne.png" },
      { name: "J&T", url: "/shipping-jnt", image: "/jnt.png" },
      {
        name: "SiCepat",
        url: "https://www.sicepat.com/",
        image: "/sicepat.png",
      },
      { name: "AnterAja", url: "/shipping-anteraja", image: "/anteraja.png" },
      { name: "Grab", url: "/shipping-grab", image: "/grab.png" },
      { name: "GoSend", url: "/shipping-gosend", image: "/gosend.png" },
    ]);
  }, [locale]); // Re-run when the t function changes (typically when language changes)

  return (
      <footer className="bg-[#1a1a1a] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">About Codeverta</h4>
              <p className="text-gray-400 text-sm">
                Codeverta is the premier source for technology news and analysis,
                covering startups, venture capital, apps, and the people making
                waves in tech.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Startups
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Venture
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    AI
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Apps
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Events</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Codeverta Disrupt 2025
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Startup Battlefield
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Meetups
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Codeverta. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
  // return (
  //   <footer className="bg-white dark:bg-gray-900 print:hidden">
  //     {/* Keywords section */}
  //     <div className="mx-auto max-w-screen-xl p-4 text-center md:p-6 lg:p-8">
  //       <p className="text-justify leading-[2px] text-gray-600 dark:text-gray-400">
  //         {keywords.map((keyword, index) => (
  //           <a
  //             key={index}
  //             href={`/${locale}/posts?search=${keyword}`}
  //             className="hover:underline text-xs text-gray-600 dark:text-gray-400"
  //           >
  //             {" "}
  //             {keyword}{" "}
  //           </a>
  //         ))}
  //       </p>
  //     </div>

  //     {/* Main footer content */}
  //     <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-4 md:px-6 lg:px-8">
  //       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
  //         {/* Company logo and description */}
  //         <div>
  //           <a
  //             href="/"
  //             className="flex items-center text-xl font-semibold text-gray-900 dark:text-white"
  //           >
  //             <img
  //               width={60}
  //               height={60}
  //               alt="Gambar logo Codeverta"
  //               className="mr-2 rounded-full"
  //               src="/logolilin.png"
  //             />
  //           </a>
  //           <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
  //             Platform media digital yang berfokus pada dunia teknologi,
  //             inovasi digital, kecerdasan buatan, pengembangan perangkat lunak,
  //             dan masa depan industri digital. Kami menyajikan berita, opini,
  //             dan analisis yang relevan dan akurat untuk para profesional,
  //             pelajar, dan penggiat teknologi di Indonesia.
  //           </p>

  //           {/* Social media icons */}
  //           <div className="mt-6 flex space-x-4">
  //             {socialMediaLinks.map((social, index) => (
  //               <a
  //                 key={index}
  //                 href={social.url}
  //                 className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //               >
  //                 <span className="sr-only">{social.name}</span>
  //                 <svg
  //                   className="h-5 w-5"
  //                   fill="currentColor"
  //                   viewBox="0 0 24 24"
  //                   aria-hidden="true"
  //                 >
  //                   <path d={social.icon} />
  //                 </svg>
  //               </a>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Footer links */}
  //         {footerLinks.map((category, index) => (
  //           <div key={index}>
  //             <h3 className="text-sm font-semibold uppercase text-gray-900 dark:text-white">
  //               {category.title}
  //             </h3>
  //             <ul className="mt-4 space-y-2">
  //               {category.links.map((link, linkIndex) => (
  //                 <li key={linkIndex}>
  //                   <a
  //                     href={link.url}
  //                     className="text-sm text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
  //                   >
  //                     {link.name}
  //                   </a>
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         ))}
  //       </div>

  //       {/* Payment and shipping methods */}
  //       <div className="mt-12 grid grid-cols-1 gap-8 border-t border-gray-200 pt-8 dark:border-gray-800 md:grid-cols-2">
  //         <div>
  //           <h3 className="text-sm font-semibold uppercase text-gray-900 dark:text-white">
  //             Metode Pembayaran
  //           </h3>
  //           <div className="mt-4 flex flex-wrap gap-4">
  //             {paymentMethods.map((payment, index) => (
  //               <a
  //                 key={index}
  //                 href={payment.url}
  //                 className="flex h-8 w-16 items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
  //                 title={payment.name}
  //               >
  //                 {payment.image ? (
  //                   <img
  //                     src={payment.image}
  //                     alt={payment.name}
  //                     className="h-6 w-auto mr-1"
  //                   />
  //                 ) : (
  //                   <span className="text-xs font-medium">{payment.name}</span>
  //                 )}
  //               </a>
  //             ))}
  //           </div>
  //         </div>

  //         <div>
  //           <h3 className="text-sm font-semibold uppercase text-gray-900 dark:text-white">
  //             Metode Pengiriman
  //           </h3>
  //           <div className="mt-4 flex flex-wrap gap-4">
  //             {shippingMethods.map((shipping, index) => (
  //               <a
  //                 key={index}
  //                 href={shipping.url}
  //                 className="flex h-8 w-16 items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
  //                 title={shipping.name}
  //               >
  //                 <span className="text-xs font-medium">{shipping.name}</span>
  //                 {/* Uncomment when you have actual images */}
  //                 {/* <img
  //                   src={shipping.image}
  //                   alt={shipping.name}
  //                   className="h-6 w-auto"
  //                 /> */}
  //               </a>
  //             ))}
  //           </div>
  //         </div>
  //       </div>

  //       {/* Copyright */}
  //       <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
  //         <p className="text-center text-sm text-gray-500 dark:text-gray-400">
  //           &copy; {new Date().getFullYear()} Codeverta. All rights
  //           reserved. v.{version}
  //         </p>
  //       </div>
  //     </div>
  //   </footer>
  // );
}
