import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ChevronRight } from "lucide-react";

const MegaMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslation("common");
  const [activeCategory, setActiveCategory] = useState("fragrance-oils");
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Menu data structure
  const menuData = [
    {
      id: "fragrance-oils",
      name: "Fragrance Oils",
      subcategories: [
        {
          name: "Candle Fragrance Oils",
          items: [
            { name: "All Candle Fragrances", url: "/fragrances/candle/all" },
            { name: "Summer Fragrances", url: "/fragrances/candle/summer" },
            { name: "Luxury Fragrances", url: "/fragrances/candle/luxury" },
            { name: "Classic Fragrances", url: "/fragrances/candle/classic" },
            { name: "Fall Fragrances", url: "/fragrances/candle/fall" },
            { name: "Holiday Fragrances", url: "/fragrances/candle/holiday" },
          ],
        },
        {
          name: "Soap Fragrance Oils",
          items: [
            { name: "All Soap Safe Fragrances", url: "/fragrances/soap/all" },
            {
              name: "Fruit and Floral Fragrances",
              url: "/fragrances/soap/fruit-floral",
            },
            { name: "Spa Fragrances", url: "/fragrances/soap/spa" },
            { name: "Vanillin Free", url: "/fragrances/soap/vanillin-free" },
            { name: "Masculine", url: "/fragrances/soap/masculine" },
          ],
        },
        {
          name: "BlendingElements Fragrance Oils",
          items: [
            {
              name: "Candle BlendingElements",
              url: "/fragrances/blending/candle",
            },
            { name: "Soap BlendingElements", url: "/fragrances/blending/soap" },
            {
              name: "Room Spray BlendingElements",
              url: "/fragrances/blending/room-spray",
            },
            {
              name: "Reed Diffuser BlendingElements",
              url: "/fragrances/blending/reed-diffuser",
            },
            {
              name: "Quick Reference: BlendingElements IFRA",
              url: "/fragrances/blending/ifra",
            },
          ],
        },
        {
          name: "Resources",
          items: [
            {
              name: "What's in a fragrance?",
              url: "/resources/fragrance-composition",
            },
            {
              name: "How much fragrance oil should I add to melted wax?",
              url: "/resources/fragrance-oil-ratio",
            },
            {
              name: "How do I get fragrance oil to smell stronger?",
              url: "/resources/fragrance-strength",
            },
            {
              name: "What does flashpoint mean?",
              url: "/resources/flashpoint",
            },
            {
              name: "How do I blend scents together?",
              url: "/resources/blend-scents",
            },
          ],
        },
        {
          name: "Fragrance Collections",
          items: [
            {
              name: "Top Selling Scents by State",
              url: "/collections/top-selling-by-state",
            },
            {
              name: "Fragrance Oil Finder",
              url: "/collections/fragrance-finder",
            },
            {
              name: "Fragrance Note Glossary",
              url: "/collections/fragrance-glossary",
            },
          ],
        },
      ],
      featured: [
        {
          name: "Shop Summer Fragrances",
          url: "/collections/summer",
          type: "link",
        },
        {
          name: "Find the Perfect Fragrance",
          url: "/fragrance-finder",
          type: "link",
        },
        { name: "Quick Order", url: "/quick-order", type: "button" },
        { name: "Clearance", url: "/clearance/fragrances", type: "button" },
      ],
    },
    {
      id: "essential-oils",
      name: "Essential Oils",
      subcategories: [
        {
          name: "Pure Essential Oils",
          items: [
            { name: "Single Origin", url: "/essential-oils/single-origin" },
            { name: "Blends", url: "/essential-oils/blends" },
            { name: "Organic", url: "/essential-oils/organic" },
          ],
        },
      ],
      featured: [
        { name: "New Arrivals", url: "/essential-oils/new", type: "link" },
        {
          name: "Essential Oil Guide",
          url: "/guides/essential-oils",
          type: "link",
        },
      ],
    },
    {
      id: "candle-making",
      name: "Candle Making",
      subcategories: [
        {
          name: "Fragrances",
          items: [
            {
              name: "All Fragrance Oils",
              url: "/candle-making/fragrances/all",
            },
            {
              name: "Holiday Fragrances",
              url: "/candle-making/fragrances/holiday",
            },
            { name: "Fall", url: "/candle-making/fragrances/fall" },
            { name: "Classic", url: "/candle-making/fragrances/classic" },
            { name: "Summer", url: "/candle-making/fragrances/summer" },
          ],
        },
        {
          name: "Candle Wax",
          items: [
            { name: "Custom Wax", url: "/candle-making/wax/custom" },
            {
              name: "Soy Wax for Containers",
              url: "/candle-making/wax/soy-containers",
            },
            {
              name: "Soy Wax for Pillars, Votives, Tarts",
              url: "/candle-making/wax/soy-pillars",
            },
            {
              name: "Paraffin Wax for Containers, Tealights",
              url: "/candle-making/wax/paraffin-containers",
            },
            {
              name: "Paraffin Wax for Pillars, Votives",
              url: "/candle-making/wax/paraffin-pillars",
            },
            {
              name: "Paraffin/Natural Blends",
              url: "/candle-making/wax/paraffin-blend",
            },
            {
              name: "Soy/Coconut Blends",
              url: "/candle-making/wax/soy-coconut",
            },
            { name: "Beeswax", url: "/candle-making/wax/beeswax" },
            { name: "Additives", url: "/candle-making/wax/additives" },
          ],
        },
        {
          name: "Containers",
          items: [
            { name: "Candle Jars", url: "/candle-making/containers/jars" },
            { name: "Candle Jar Lids", url: "/candle-making/containers/lids" },
            { name: "Candle Tins", url: "/candle-making/containers/tins" },
            {
              name: "Tealight Cups",
              url: "/candle-making/containers/tealight-cups",
            },
          ],
        },
        {
          name: "Candle Wick",
          items: [
            {
              name: "Aroma-Lite® Series",
              url: "/candle-making/wicks/aroma-lite",
            },
            { name: "CD Series", url: "/candle-making/wicks/cd-series" },
            { name: "ECO Series", url: "/candle-making/wicks/eco-series" },
            { name: "LX Series", url: "/candle-making/wicks/lx-series" },
            {
              name: "Spooled Candle Wick",
              url: "/candle-making/wicks/spooled",
            },
          ],
        },
      ],
      featured: [
        {
          name: "Free shipping on all candle making kits!",
          url: "/candle-making/kits",
          type: "link",
        },
        { name: "Wick Guide", url: "/guides/wick", type: "link" },
        { name: "Wax Guide", url: "/guides/wax", type: "link" },
        {
          name: "Candle Batch Supplies Calculator",
          url: "/calculators/candle-batch",
          type: "link",
        },
      ],
    },
    { id: "flameless", name: "Flameless", subcategories: [], featured: [] },
    { id: "soap-making", name: "Soap Making", subcategories: [], featured: [] },
    { id: "learning", name: "Learning", subcategories: [], featured: [] },
    {
      id: "new-products",
      name: "New Products",
      subcategories: [],
      featured: [],
    },
    { id: "kits", name: "Kits", subcategories: [], featured: [] },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-lg z-50 border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200"
      ref={menuRef}
    >
      <div className="container mx-auto py-6">
        <div className="flex">
          {/* Main Categories */}
          <div className="w-1/5 border-r border-gray-200 dark:border-gray-700 pr-4">
            <ul>
              {menuData.map((category) => (
                <li key={category.id} className="mb-2">
                  <button
                    className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? "bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400 font-medium"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Subcategories */}
          <div className="w-4/5 pl-6">
            {activeCategory && (
              <div className="flex">
                {/* Subcategories and Items */}
                <div className="w-3/4 grid grid-cols-3 gap-6">
                  {menuData
                    .find((category) => category.id === activeCategory)
                    ?.subcategories.map((subcategory, index) => (
                      <div key={index} className="mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                          {subcategory.name}
                        </h3>
                        <ul className="space-y-2">
                          {subcategory.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                href={item.url}
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group"
                              >
                                <span className="group-hover:translate-x-1 transition-transform">
                                  {item.name}
                                </span>
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 ml-1 transition-opacity" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>

                {/* Featured Section */}
                <div className="w-1/4 pl-6 border-l border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                    Featured
                  </h3>
                  <div className="space-y-4">
                    {menuData
                      .find((category) => category.id === activeCategory)
                      ?.featured.map((item, index) => (
                        <div key={index}>
                          {item.type === "button" ? (
                            <Link
                              href={item.url}
                              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <Link
                              href={item.url}
                              className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center group"
                            >
                              <span className="group-hover:translate-x-1 transition-transform">
                                {item.name}
                              </span>
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {!activeCategory && (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Select a category to view options</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 py-3 px-6 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Free shipping on orders over $100
        </div>
        <button
          onClick={onClose}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Close Menu
        </button>
      </div>
    </div>
  );
};

export default MegaMenu;
