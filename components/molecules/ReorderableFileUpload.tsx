import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const ReorderableFileUpload = ({ files, onChangeFile }: any) => {
  const [_files, setFiles] = useState<any>([]);
  const [draggedIndex, setDraggedIndex] = useState<any>(null);

  const onDrop = (acceptedFiles: any): any => {
    const newFiles = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles([...files, ...newFiles]);
    onChangeFile([...files, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    // accept: "image/*",
    onDrop,
    multiple: true,
    maxFiles: 9,
  });

  const onDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const onDragOver = (index: number) => {
    const draggedOverItem = files[draggedIndex];

    if (draggedIndex === index) {
      return;
    }

    const items = files.filter(
      (item: any, idx: number) => idx !== draggedIndex
    );

    items.splice(index, 0, draggedOverItem);

    setDraggedIndex(index);
    setFiles(items);
  };

  const onDropEnd = () => {
    setDraggedIndex(null);
  };

  const removeFile = (file: any) => {
    setFiles(files.filter((f: any) => f.name !== file.name));
  };

  return (
    <div className="flex flex-col">
      <label className="text-gray-700 text-sm mb-2">* Foto Produk</label>
      <div className="flex items-center flex-wrap">
        {files.map((file: any, index: number) => (
          <div
            key={index}
            className="relative w-24 h-24 border rounded-lg overflow-hidden m-2"
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => {
              e.preventDefault();
              onDragOver(index);
            }}
            onDragEnd={onDropEnd}
          >
            <img
              src={file.preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removeFile(file)}
              className="absolute rotate-45 top-0 right-0 bg-red-500 text-white text-xs h-4 w-4 rounded-full"
            >
              +
            </button>
          </div>
        ))}
        {files.length < 9 && (
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer m-2"
          >
            <input {...getInputProps()} />
            <span className="text-orange-600 text-center text-xs">
              Tambahkan Foto ({files.length}/9)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReorderableFileUpload;
