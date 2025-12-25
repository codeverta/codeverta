import { useState, useEffect, useRef } from "react";
import { Printer, Download, Plus, Trash2, Save, Upload } from "lucide-react";

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState({
    company: {
      logo: "",
      name: "Your Company Name",
      address: "Company Address",
      email: "company@email.com",
      phone: "+62 123 4567 890",
    },
    client: {
      name: "",
      address: "",
      email: "",
    },
    invoiceNumber: "INV-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    items: [{ id: 1, name: "", description: "", qty: 1, price: 0 }],
    discount: 0,
    discountType: "percent",
    tax: 0,
    notes: "",
    currency: "IDR",
  });

  const [savedCompany, setSavedCompany] = useState(null);
  const logoInputRef = useRef(null);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("invoiceData");
    const savedCompanyData = localStorage.getItem("companyData");

    if (saved) {
      setInvoice(JSON.parse(saved));
    }
    if (savedCompanyData) {
      setSavedCompany(JSON.parse(savedCompanyData));
    }
  }, []);

  // Auto save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("invoiceData", JSON.stringify(invoice));
    }, 500);
    return () => clearTimeout(timer);
  }, [invoice]);

  const currencies = {
    IDR: { symbol: "Rp", locale: "id-ID" },
    USD: { symbol: "$", locale: "en-US" },
    EUR: { symbol: "€", locale: "de-DE" },
    GBP: { symbol: "£", locale: "en-GB" },
    JPY: { symbol: "¥", locale: "ja-JP" },
  };

  const formatCurrency = (amount) => {
    const curr = currencies[invoice.currency];
    return new Intl.NumberFormat(curr.locale, {
      style: "currency",
      currency: invoice.currency,
      minimumFractionDigits: invoice.currency === "JPY" ? 0 : 2,
    }).format(amount);
  };

  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (invoice.discountType === "percent") {
      return subtotal * (invoice.discount / 100);
    }
    return invoice.discount;
  };

  const calculateTax = () => {
    const afterDiscount = calculateSubtotal() - calculateDiscount();
    return afterDiscount * (invoice.tax / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        {
          id: Date.now(),
          name: "",
          description: "",
          qty: 1,
          price: 0,
        },
      ],
    });
  };

  const removeItem = (id) => {
    if (invoice.items.length > 1) {
      setInvoice({
        ...invoice,
        items: invoice.items.filter((item) => item.id !== id),
      });
    }
  };

  const updateItem = (id, field, value) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoice({
          ...invoice,
          company: { ...invoice.company, logo: reader.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveCompanyData = () => {
    localStorage.setItem("companyData", JSON.stringify(invoice.company));
    setSavedCompany(invoice.company);
    alert("Company data saved successfully!");
  };

  const loadCompanyData = () => {
    if (savedCompany) {
      setInvoice({ ...invoice, company: savedCompany });
    }
  };

  const generateInvoiceNumber = () => {
    const date = new Date();
    const num = `INV-${date.getFullYear()}${String(
      date.getMonth() + 1
    ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}-${Math.floor(
      Math.random() * 1000
    )}`;
    setInvoice({ ...invoice, invoiceNumber: num });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-4 lg:p-8">
        <div className="mb-6 print:hidden">
          <h1 className="text-3xl font-bold text-slate-800">
            Invoice Generator Pro
          </h1>
          <p className="text-slate-600 mt-1">
            Create professional invoices instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6 print:hidden">
            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  Company Information
                </h2>
                <div className="flex gap-2">
                  {savedCompany && (
                    <button
                      onClick={loadCompanyData}
                      className="text-sm px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Load Saved
                    </button>
                  )}
                  <button
                    onClick={saveCompanyData}
                    className="text-sm px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Logo
                  </label>
                  <div className="flex items-center gap-4">
                    {invoice.company.logo && (
                      <img
                        src={invoice.company.logo}
                        alt="Logo"
                        className="w-20 h-20 object-contain rounded-lg border border-slate-200"
                      />
                    )}
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Logo
                    </button>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Company Name"
                  value={invoice.company.name}
                  onChange={(e) =>
                    setInvoice({
                      ...invoice,
                      company: { ...invoice.company, name: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <textarea
                  placeholder="Company Address"
                  value={invoice.company.address}
                  onChange={(e) =>
                    setInvoice({
                      ...invoice,
                      company: { ...invoice.company, address: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="2"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={invoice.company.email}
                    onChange={(e) =>
                      setInvoice({
                        ...invoice,
                        company: { ...invoice.company, email: e.target.value },
                      })
                    }
                    className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={invoice.company.phone}
                    onChange={(e) =>
                      setInvoice({
                        ...invoice,
                        company: { ...invoice.company, phone: e.target.value },
                      })
                    }
                    className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Client Information
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Client Name"
                  value={invoice.client.name}
                  onChange={(e) =>
                    setInvoice({
                      ...invoice,
                      client: { ...invoice.client, name: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Client Address"
                  value={invoice.client.address}
                  onChange={(e) =>
                    setInvoice({
                      ...invoice,
                      client: { ...invoice.client, address: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="2"
                />
                <input
                  type="text"
                  placeholder="Client Email/Contact"
                  value={invoice.client.email}
                  onChange={(e) =>
                    setInvoice({
                      ...invoice,
                      client: { ...invoice.client, email: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Invoice Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Invoice Details
              </h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Invoice Number"
                    value={invoice.invoiceNumber}
                    onChange={(e) =>
                      setInvoice({ ...invoice, invoiceNumber: e.target.value })
                    }
                    className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={generateInvoiceNumber}
                    className="px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
                  >
                    Auto Generate
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={invoice.date}
                      onChange={(e) =>
                        setInvoice({ ...invoice, date: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={invoice.dueDate}
                      onChange={(e) =>
                        setInvoice({ ...invoice, dueDate: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={invoice.currency}
                    onChange={(e) =>
                      setInvoice({ ...invoice, currency: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(currencies).map((curr) => (
                      <option key={curr} value={curr}>
                        {curr} ({currencies[curr].symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  Invoice Items
                </h2>
                <button
                  onClick={addItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                {invoice.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        Item {index + 1}
                      </span>
                      {invoice.items.length > 1 && (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Item Name"
                      value={item.name}
                      onChange={(e) =>
                        updateItem(item.id, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <input
                      type="text"
                      placeholder="Description (optional)"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="number"
                        placeholder="Qty"
                        min="1"
                        value={item.qty}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "qty",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        min="0"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="px-3 py-2 bg-white border border-slate-300 rounded-lg flex items-center justify-end font-medium text-slate-700">
                        {formatCurrency(item.qty * item.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discount & Tax */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Additional Charges
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Discount
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      value={invoice.discount}
                      onChange={(e) =>
                        setInvoice({
                          ...invoice,
                          discount: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={invoice.discountType}
                      onChange={(e) =>
                        setInvoice({ ...invoice, discountType: e.target.value })
                      }
                      className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="percent">%</option>
                      <option value="fixed">
                        {currencies[invoice.currency].symbol}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tax (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={invoice.tax}
                    onChange={(e) =>
                      setInvoice({
                        ...invoice,
                        tax: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Notes
              </h2>
              <textarea
                placeholder="Additional notes or payment terms..."
                value={invoice.notes}
                onChange={(e) =>
                  setInvoice({ ...invoice, notes: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
              />
            </div>
          </div>

          {/* Invoice Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 lg:p-12"
              id="invoice-preview"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-8 pb-8 border-b-2 border-slate-200">
                <div className="flex-1">
                  {invoice.company.logo && (
                    <img
                      src={invoice.company.logo}
                      alt="Logo"
                      className="w-24 h-24 object-contain mb-4"
                    />
                  )}
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {invoice.company.name}
                  </h2>
                  <p className="text-sm text-slate-600 whitespace-pre-line">
                    {invoice.company.address}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    {invoice.company.email}
                  </p>
                  <p className="text-sm text-slate-600">
                    {invoice.company.phone}
                  </p>
                </div>
                <div className="text-right">
                  <h1 className="text-4xl font-bold text-blue-600 mb-2">
                    INVOICE
                  </h1>
                  <p className="text-lg font-semibold text-slate-800">
                    {invoice.invoiceNumber}
                  </p>
                </div>
              </div>

              {/* Dates & Client */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase mb-3">
                    Bill To
                  </h3>
                  <p className="font-semibold text-slate-800 text-lg mb-1">
                    {invoice.client.name || "Client Name"}
                  </p>
                  <p className="text-sm text-slate-600 whitespace-pre-line">
                    {invoice.client.address}
                  </p>
                  {invoice.client.email && (
                    <p className="text-sm text-slate-600 mt-1">
                      {invoice.client.email}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="mb-4">
                    <p className="text-sm text-slate-500">Invoice Date</p>
                    <p className="font-semibold text-slate-800">
                      {invoice.date || "-"}
                    </p>
                  </div>
                  {invoice.dueDate && (
                    <div>
                      <p className="text-sm text-slate-500">Due Date</p>
                      <p className="font-semibold text-slate-800">
                        {invoice.dueDate}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-300">
                      <th className="text-left py-3 text-sm font-semibold text-slate-700 uppercase">
                        Item
                      </th>
                      <th className="text-center py-3 text-sm font-semibold text-slate-700 uppercase w-20">
                        Qty
                      </th>
                      <th className="text-right py-3 text-sm font-semibold text-slate-700 uppercase w-28">
                        Price
                      </th>
                      <th className="text-right py-3 text-sm font-semibold text-slate-700 uppercase w-32">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={item.id} className="border-b border-slate-200">
                        <td className="py-4">
                          <p className="font-medium text-slate-800">
                            {item.name || `Item ${index + 1}`}
                          </p>
                          {item.description && (
                            <p className="text-sm text-slate-600 mt-1">
                              {item.description}
                            </p>
                          )}
                        </td>
                        <td className="text-center text-slate-700">
                          {item.qty}
                        </td>
                        <td className="text-right text-slate-700">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="text-right font-medium text-slate-800">
                          {formatCurrency(item.qty * item.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-80">
                  <div className="flex justify-between py-2 text-slate-700">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(calculateSubtotal())}
                    </span>
                  </div>
                  {invoice.discount > 0 && (
                    <div className="flex justify-between py-2 text-slate-700">
                      <span>
                        Discount{" "}
                        {invoice.discountType === "percent"
                          ? `(${invoice.discount}%)`
                          : ""}
                      </span>
                      <span className="font-medium text-red-600">
                        -{formatCurrency(calculateDiscount())}
                      </span>
                    </div>
                  )}
                  {invoice.tax > 0 && (
                    <div className="flex justify-between py-2 text-slate-700">
                      <span>Tax ({invoice.tax}%)</span>
                      <span className="font-medium">
                        {formatCurrency(calculateTax())}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-4 border-t-2 border-slate-300 text-lg">
                    <span className="font-bold text-slate-800">Total</span>
                    <span className="font-bold text-blue-600">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {invoice.notes && (
                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-700 uppercase mb-2">
                    Notes
                  </h3>
                  <p className="text-sm text-slate-600 whitespace-pre-line">
                    {invoice.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 print:hidden">
              <button
                onClick={handlePrint}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Printer className="w-5 h-5" />
                Print
              </button>
              <button
                onClick={handleExportPDF}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Download className="w-5 h-5" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          #invoice-preview {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
