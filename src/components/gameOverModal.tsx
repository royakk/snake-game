import { ReactNode } from "react";

interface GameOverModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}
export const GameOverModal = ({
  isOpen,
  onClose,
  children,
}: GameOverModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex
                        items-center justify-center
                       "
    >
      <div
        className="bg-white rounded-lg flex
                        items-center justify-center
                            shadow-lg p-6 max-w-md
                            w-[400px] h-[100px] relative z-50"
      >
        <button
          className="absolute top-2 right-3
                               text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
};
