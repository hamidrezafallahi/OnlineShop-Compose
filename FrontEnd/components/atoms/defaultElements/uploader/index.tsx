import React, {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

interface UploaderProps {
  value?: string;
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
    if (onChange) onChange(file);
    uploadFile(file);
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

  const uploadFile = (file: File) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);
    xhr.open("POST", "/upload", true);
    xhr.send(formData);
  };
  useEffect(() => {
    if (typeof value == "string") {
      setBackgroundImage(value && value.trim?.() !== "" ? value : null);
    } else if (value) {
      const url = URL.createObjectURL(value);
      setBackgroundImage(url);
    }
  }, [value]);
  return (
  <label 
    className={`flex flex-col  justify-center items-center  text-gray-400 text-sm border-gray-300 bg-white rounded-lg w-full !h-full overflow-hidden cursor-pointer ${className}`}
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
      className="w-full h-full"
    >
      {!backgroundImage && placeHolder && (
        <div className="flex items-center p-2 w-full !h-full">{placeHolder}</div>
      )}
    </div>
  </label>
);
};

export default Uploader;
