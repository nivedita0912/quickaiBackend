"use client";

import { useEffect, useState } from "react";

export default function HealthStatus() {
  const [health, setHealth] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch("/api/health");
        const data = await res.json();

        setHealth(data);
      } catch (err) {
        setError("Server connection failed");
      }
    }

    checkHealth();
  }, []);

  const isHealthy =
    health?.server === "running" &&
    health?.database === "connected";

  return (
    <div className="p-4">
      {isHealthy ? (
        <div className="border border-green-500 bg-green-100 text-green-700 rounded-xl p-4 flex items-center gap-2">
          <span className="text-2xl">✅</span>

          <div>
            <h2 className="font-bold">
              Server is Healthy
            </h2>

            <p>All systems are working correctly.</p>
          </div>
        </div>
      ) : (
        <div className="border border-red-500 bg-red-100 text-red-700 rounded-xl p-4 flex items-center gap-2">
          <span className="text-2xl">❌</span>

          <div>
            <h2 className="font-bold">
              Server Problem Detected
            </h2>

            <p>
              {error ||
                `Database: ${
                  health?.database || "Disconnected"
                }`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}