const FooterSection = () => {
  return (
    <section className="bg-gray-100 py-10 px-4 mt-10 border-t border-gray-200 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Hubungi Kami</h2>
        <div className="text-gray-700 text-lg space-y-3">
          <p className="flex items-center justify-center">
            <span role="img" aria-label="pin-lokasi" className="mr-3 text-xl">
              📍
            </span>
            <strong className="font-semibold">Alamat:</strong> Jl Kaliurang KM
            9.3, Ngaglik, Sleman, Yogyakarta
          </p>
          <p className="flex items-center justify-center">
            <span role="img" aria-label="globe" className="mr-3 text-xl">
              🌐
            </span>
            <strong className="font-semibold">Website:</strong>
            <a
              href="https://www.codeverta.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:underline"
            >
              www.codeverta.com
            </a>
          </p>
          <p className="flex items-center justify-center">
            <span role="img" aria-label="telepon" className="mr-3 text-xl">
              📞
            </span>
            <strong className="font-semibold">WA:</strong>
            <a
              href="https://wa.me/6285601347820"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:underline"
            >
              +62 856-0134-7820
            </a>
          </p>
          <p className="flex items-center justify-center">
            <span role="img" aria-label="email" className="mr-3 text-xl">
              📧
            </span>
            <strong className="font-semibold">Email:</strong>
            <a
              href="mailto:hello@codeverta.com"
              className="ml-2 text-blue-600 hover:underline"
            >
              contact@codeverta.com
            </a>
          </p>
          <p className="flex items-center justify-center">
            <span role="img" aria-label="instagram" className="mr-3 text-xl">
              📱
            </span>
            <strong className="font-semibold">Instagram:</strong>
            <a
              href="https://www.instagram.com/codeverta"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:underline"
            >
              @codeverta
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};


export default FooterSection