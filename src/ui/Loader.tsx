export default function Loader() {
  return (
    <div className="flex items-center justify-center  h-[90vh] w-full">
      <div className="relative w-10 h-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-1 h-3 rounded-full bg-black opacity-20"
            style={{
              transform: `rotate(${i * 45}deg) translate(0, -14px)`,
              animation: `fade-spinner 1.2s linear infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
        <style>{`
        @keyframes fade-spinner {
          0% { opacity: 1 }
          100% { opacity: 0.2 }
        }
      `}</style>
      </div>
    </div>
  );
}
