import React, {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

interface UploaderProps {
  value?: string | File | null;
  defaultValue?: string;
  onChange?: (file: File) => void;
  placeHolder?: string | boolean;
  className?: string;
}

const Uploader = ({ ...props }: UploaderProps) => {
  const {
    value,
    defaultValue,
    onChange,
    placeHolder = "Drag & Drop یا کلیک کنید تا تصویر انتخاب شود",
    className = "",
  } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(
    defaultValue && defaultValue.trim?.() !== "" ? defaultValue : null,
  );

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setBackgroundImage(url);
    onChange?.(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (droppedFiles.length > 0) handleFile(droppedFiles[0]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (files.length > 0) handleFile(files[0]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  useEffect(() => {
    if (typeof value === "string") {
      setBackgroundImage(value && value.trim?.() !== "" ? value : null);
    } else if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setBackgroundImage(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);

  return (
    <label
      className={cn(
        "flex flex-col justify-center items-center w-full min-h-36 h-36",
        "border border-dashed border-gray-300 bg-white rounded-lg",
        "text-gray-400 text-sm overflow-hidden cursor-pointer",
        className,
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex justify-center items-center w-full h-full"
      >
        {!backgroundImage && placeHolder && (
          <div className="flex justify-center items-center p-3 w-full h-full text-center">
            {placeHolder}
          </div>
        )}
      </div>
    </label>
  );
};

export default Uploader;
