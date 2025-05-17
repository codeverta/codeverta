import React, { useState, useEffect } from "react";
import { provinceNames, sampleData } from "lib/map";

const IndonesiaHeatmap = () => {
  const [svgContent, setSvgContent] = useState("");
  const [data, setData] = useState({});
  const [maxValue, setMaxValue] = useState(100);
  const [loading, setLoading] = useState(true);
  // State for tooltip
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState(null);
  // Color scale function - converts value to a shade of red
  const getColor = (value) => {
    if (value === undefined) return "#CCCCCC"; // Default color for no data
    // Handle both direct values and object values
    const actualValue = typeof value === "object" ? value.value : value;
    const intensity = Math.floor((actualValue / maxValue) * 255);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
  };

  useEffect(() => {
    // Load SVG file
    fetch("/assets/id.svg")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((svg) => {
        setSvgContent(svg);
        setData(sampleData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading SVG:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (svgContent && data) {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");

      // Apply colors to provinces
      Object.keys(provinceNames).forEach((provinceId) => {
        const element = svgDoc.getElementById(provinceId);
        if (element) {
          const provinceData = data[provinceId];
          const value = provinceData?.value || provinceData;

          element.setAttribute("fill", getColor(provinceData));

          // Store data attributes for tooltip and interaction
          element.setAttribute("data-name", provinceNames[provinceId]);
          element.setAttribute("data-original-color", getColor(provinceData));

          // Store detailed data for tooltip
          if (provinceData && typeof provinceData === "object") {
            element.setAttribute("data-value", provinceData.value || "No data");
            element.setAttribute("data-customers", provinceData.customers || 0);
            element.setAttribute("data-growth", provinceData.growth || "0%");
          } else {
            element.setAttribute("data-value", provinceData || "No data");
            element.setAttribute("data-customers", "0");
            element.setAttribute("data-growth", "0%");
          }
        }
      });

      // Convert back to string
      const serializer = new XMLSerializer();
      const modifiedSvg = serializer.serializeToString(svgDoc);

      setSvgContent(modifiedSvg);
    }
  }, [data, svgContent]);

  // Enhanced hover behavior with detailed tooltip
  const handleMouseOver = (e: React.MouseEvent<SVGElement>) => {
    const provinceId = (e.target as SVGElement).id;
    if (provinceId in provinceNames) {
      const tooltip = document.getElementById("province-tooltip");
      if (tooltip) {
        // Get data attributes
        const target = e.target as SVGElement;
        const name = target.getAttribute("data-name");
        const value = target.getAttribute("data-value");
        const customers = target.getAttribute("data-customers");
        const growth = target.getAttribute("data-growth");

        // Position the tooltip relative to the parent container
        const container = (
          e.currentTarget as HTMLElement
        ).getBoundingClientRect();
        tooltip.style.display = "block";
        tooltip.style.position = "absolute";
        tooltip.style.left = `${e.clientX - container.left + 10}px`;
        tooltip.style.top = `${e.clientY - container.top + 10}px`;

        // Build rich tooltip content
        tooltip.innerHTML = `
          <div class="font-bold">${name}</div>
          <div class="grid grid-cols-2 gap-2">
            <div>Jumlah Distributor:</div>
            <div>${customers}</div>
            <div>Growth:</div>
            <div>${growth}</div>
          </div>
        `;
      }

      // Highlight
      (e.target as SVGElement).setAttribute("fill", "#3366FF");
    }
  };

  const handleMouseOut = (e) => {
    setTooltipVisible(false);

    const provinceId = e.target.id;
    if (provinceNames[provinceId]) {
      const tooltip = document.getElementById("province-tooltip");
      if (tooltip) {
        tooltip.style.display = "none";
      }

      // Restore original color
      const originalColor = e.target.getAttribute("data-original-color");
      if (originalColor) {
        e.target.setAttribute("fill", originalColor);
      }
    }
  };

  // Enhanced Legend component
  const Legend = () => {
    const steps = 5;
    const legendItems = [];

    for (let i = 0; i <= steps; i++) {
      const value = (maxValue / steps) * i;
      legendItems.push(
        <div key={i} className="flex items-center mb-1">
          <div
            className="w-6 h-6 mr-2"
            style={{ backgroundColor: getColor(value) }}
          ></div>
          <span className="text-sm">{Math.round(value)}</span>
        </div>
      );
    }

    return (
      <div className="absolute top-4 right-4 bg-white p-4 rounded shadow-md">
        {/* <h3 className="text-lg font-bold mb-2">Legend</h3> */}
        <div className="mb-4">{legendItems}</div>
        <div className="border-t pt-2 text-xs">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span>Selected Province</span>
          </div>
          <div className="text-gray-600 mt-1">Hover for details</div>
        </div>
      </div>
    );
  };

  const updateMaxValue = (e) => {
    setMaxValue(parseInt(e.target.value));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading map...
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="svg-container w-full rounded"
        dangerouslySetInnerHTML={{ __html: svgContent }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />

      <div
        id="province-tooltip"
        className="hidden absolute bg-black text-white px-3 py-2 rounded text-sm pointer-events-none  z-50"
      ></div>

      <Legend />
    </div>
  );
};

export default IndonesiaHeatmap;
