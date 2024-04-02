import  { useEffect } from "react";

type Props = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

function Toast({ message, type, onClose }: Props) {
  const styles =
    type === "SUCCESS"
      ? "fixed bottom-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed bottom-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  return (
    <div className={styles}>
      <div className="flex flex-col justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
}

export default Toast;
