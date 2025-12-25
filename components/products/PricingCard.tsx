import React from "react";
import { CheckCircle, Sparkles } from "lucide-react";

const PricingCard = ({
  tier,
  price,
  description,
  features,
  isRecommended,
  index,
}: {
  tier: string;
  price: string;
  description: string;
  features: string[];
  isRecommended?: boolean;
  index: number;
}) => {
  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 hover:scale-105 ${
        isRecommended
          ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl"
          : "bg-white text-slate-900 shadow-lg hover:shadow-xl border border-slate-200"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>Paling Populer</span>
          </div>
        </div>
      )}

      <div className="p-8">
        <div className="text-center mb-6">
          <h3
            className={`text-2xl font-bold mb-3 ${
              isRecommended ? "text-white" : "text-slate-900"
            }`}
          >
            {tier}
          </h3>
          <div className="flex items-baseline justify-center gap-1">
            <span
              className={`text-3xl font-extrabold ${
                isRecommended ? "text-white" : "text-blue-600"
              }`}
            >
              {price}
            </span>
          </div>
          <p
            className={`mt-3 text-sm ${
              isRecommended ? "text-blue-100" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {features.map((feature, fIndex) => (
            <div key={fIndex} className="flex items-start gap-3">
              <CheckCircle
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  isRecommended ? "text-blue-200" : "text-green-500"
                }`}
              />
              <span
                className={`text-sm leading-relaxed ${
                  isRecommended ? "text-blue-50" : "text-slate-700"
                }`}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        <button
          className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 ${
            isRecommended
              ? "bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Pilih Paket Ini
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
