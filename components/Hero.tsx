import Link from "next/link";
import manifest from "../public/manifest.json";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { WhatsappWrapper } from "./WhatsappButton";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      delay: 0.9,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
  },
};

export default function Hero() {
  const { t } = useTranslation("common");

  return (
    <section className="bg-white dark:bg-gray-900 overflow-hidden">
      <motion.div
        className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Link
            href="/address"
            aria-label="Alamat Kami"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">
              {t("menu.address")}
            </span>{" "}
            <span className="text-sm font-medium">
              Jalan Kaliurang KM 9, Sleman, Yogyakarta, Indonesia
            </span>
            <motion.svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </motion.svg>
          </Link>
        </motion.div>

        <motion.h1
          className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
          variants={itemVariants}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {t("tagline.local_producer")}
          </motion.span>{" "}
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {t("tagline.national_scale")}
          </motion.span>
        </motion.h1>

        <motion.p
          className="mb-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
          variants={itemVariants}
        >
          {t("description")}
        </motion.p>

        <motion.div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href="/cara-order"
              className="w-full md:w-auto inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
            >
              {t("how_to_order_candles")}
              <motion.svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.8 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </motion.svg>
            </Link>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <WhatsappWrapper>
              <div className="w-full md:w-auto inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                <WhatsAppIcon className="mr-2 -ml-1 w-5 h-5" />
                Whatsapp
              </div>
            </WhatsappWrapper>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
