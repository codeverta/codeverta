import { useState, useEffect } from "react";
import Link from "next/link";
import Login from "./molecules/Login";
import { Modal } from "@mui/material";
import Drawer from "./flowbite/Drawer";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import LanguageDropdown from "./molecules/LanguageDropodown";
import NavbarMenu from "./NavbarMenu";

export default function Header(props) {
  const { t } = useTranslation("common");
  const [menus, setMenus] = useState([]);
  const [open, setOpen] = useState({
    drawer: false,
    login: false,
  });

  const router = useRouter();
  const { locale } = router;
  const [darkMode, setDarkMode] = useState(false);

  const handleOpenLogin = () => {
    setOpen({ ...open, login: !open.login });
  };

  const handleDrawer = () => {
    setOpen({ ...open, drawer: !open.drawer });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Check for authentication token
  useEffect(() => {
    // This hook is for initial locale setup and checking system dark mode preference
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/orders");
    }

    // Check for system dark mode preference only on initial mount
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, [router]); // Add router as dependency

  useEffect(() => {
    const updatedMenus = [
      { label: t("menu.home", "Home"), url: "/" },
      { label: t("menu.products", "Products"), url: "/products" },
      { label: t("menu.how_to_order", "How to Order"), url: "/cara-order" },
      { label: t("menu.address", "Address"), url: "/address" },
      { label: t("menu.blog", "Blog"), url: "/posts" },
      { label: t("menu.gallery", "Gallery"), url: "/gallery" },
      { label: t("menu.about", "About"), url: "/about" },
    ];
    setMenus(updatedMenus);
  }, [locale, t]);

  return (
    <header className="sticky top-0 z-50">
      {open.login && (
        <Modal
          open={open.login}
          onClose={handleOpenLogin}
          aria-labelledby="modal-login"
          aria-describedby="parent-modal-description"
          className="grid h-screen place-items-center"
        >
          <div>
            <Login />
          </div>
        </Modal>
      )}

      {open.drawer && (
        <Drawer
          menu={menus}
          handleDrawer={handleDrawer}
          currentPath={router.pathname}
        />
      )}

      <NavbarMenu
        menus={menus}
        handleDrawer={handleDrawer}
        handleOpenLogin={handleOpenLogin}
        open={open}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />

      <div className="block sm:hidden flex justify-between items-center px-4 lg:px-6 py-2.5 bg-white dark:bg-gray-800 border-b sm:border-0 border-gray-200 dark:border-gray-700 lg:hidden">
        {/* Login Button */}
        <button
          onClick={handleOpenLogin}
          className="text-gray-800 dark:text-white bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 border border-gray-300 dark:border-gray-600 transition-colors"
        >
          {t("login", "Log in")}
        </button>
        <LanguageDropdown />
      </div>
    </header>
  );
}
