import React, { useRef } from "react";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Popup({ open, onClose, children }: PopupProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  if (!open) return null;
  return (
    <div
      className="min-h-[60vh] fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node)
        ) {
          onClose();
        }
      }}
    >
      <div
        ref={contentRef}
        className="bg-white rounded-xl shadow-xl p-6 relative w-full max-w-[1200px] min-h-[60vh] min-w-[320px] max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-1 right-1 cursor-pointer"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <svg
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8359 21.0371C5.31836 21.0371 0.748047 16.4766 0.748047 10.9492C0.748047 5.43164 5.30859 0.861328 10.8262 0.861328C16.3535 0.861328 20.9238 5.43164 20.9238 10.9492C20.9238 16.4766 16.3535 21.0371 10.8359 21.0371ZM7.63281 15.0898C7.89648 15.0898 8.12109 14.9922 8.30664 14.8164L10.8359 12.2676L13.3848 14.8164C13.5508 14.9922 13.7852 15.0898 14.0488 15.0898C14.5664 15.0898 14.9766 14.6797 14.9766 14.1523C14.9766 13.9082 14.8789 13.6836 14.7031 13.5078L12.1543 10.959L14.7129 8.40039C14.8984 8.21484 14.9766 8 14.9766 7.75586C14.9766 7.23828 14.5762 6.83789 14.0684 6.83789C13.8047 6.83789 13.5996 6.92578 13.4141 7.11133L10.8359 9.66992L8.27734 7.12109C8.10156 6.94531 7.89648 6.85742 7.63281 6.85742C7.11523 6.85742 6.71484 7.24805 6.71484 7.76562C6.71484 8.00977 6.8125 8.23438 6.98828 8.41016L9.53711 10.959L6.98828 13.5176C6.8125 13.6934 6.71484 13.918 6.71484 14.1523C6.71484 14.6797 7.11523 15.0898 7.63281 15.0898Z"
              fill="#C4C4C4"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
