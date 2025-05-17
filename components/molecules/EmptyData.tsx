import React from "react";

function EmptyData() {
  return (
    <>
      <div className="h-10"></div>
      <img
        className="max-w-xs m-auto"
        alt="Data tidak ditemukan"
        src="/assets/404-computer.svg"
      />
      <h1 className="mb-4 text-2xl text-center tracking-tight font-semibold text-primary-600 dark:text-primary-500">
        Data Tidak Ditemukan
      </h1>
      <p className="max-w-sm m-auto text-center mb-4 text-lg font-light text-gray-400 dark:text-gray-400">
        Maaf kami tidak bisa mendapatkan data yang anda cari, kemungkinan data
        masih kosong.{" "}
      </p>
    </>
  );
}

export default EmptyData;
