
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  let sizeClasses = '';
  switch (size) {
    case 'sm': sizeClasses = 'max-w-sm'; break;
    case 'md': sizeClasses = 'max-w-md'; break;
    case 'lg': sizeClasses = 'max-w-lg'; break;
    case 'xl': sizeClasses = 'max-w-xl'; break;
    default: sizeClasses = 'max-w-md';
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out" onClick={onClose}>
      <div 
        className={`bg-white rounded-lg shadow-xl p-6 m-4 w-full ${sizeClasses} transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear`}
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-2xl font-semibold text-dark-green">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fechar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div>{children}</div>
      </div>
      <style>{`
        @keyframes modal-appear {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-appear {
          animation: modal-appear 0.3s forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;
