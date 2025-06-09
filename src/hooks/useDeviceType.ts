import { useEffect, useState } from "react";

export type DeviceType = "mobile" | "desktop";

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    if (typeof window === "undefined") return "desktop";
    return window.innerWidth < 768 ? "mobile" : "desktop";
  });

  useEffect(() => {
    function handleResize() {
      setDeviceType(window.innerWidth < 768 ? "mobile" : "desktop");
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}
