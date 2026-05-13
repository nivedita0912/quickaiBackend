"use client"

import { useEffect, useState } from "react"

interface HealthData {
  success: boolean
  message: string
  db: {
    status: string
    isConnected: boolean
    host: string | null
    dbName: string | null
  }
}

export default function Home() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking")
  const [data, setData] = useState<HealthData | null>(null)

  useEffect(() => {
    fetch("/api/health")
      .then(res => res.json())
      .then((json: HealthData) => {
        setData(json)
        setStatus(json.success && json.db.isConnected ? "online" : "offline")
      })
      .catch(() => setStatus("offline"))
  }, [])

  return (
  <div className="min-h-screen flex items-center justify-center bg-black">
    
    <div className="bg-gray-800 text-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center justify-center space-y-4">

      {/* Server Status */}
      {status === "checking" && (
        <p className="text-gray-400 text-lg">
          Checking server...
        </p>
      )}

      {status === "online" && (
        <p className="text-green-500 font-semibold text-xl">
          ✅ Server is running
        </p>
      )}

      {status === "offline" && (
        <p className="text-red-500 font-semibold text-xl">
          ❌ Server is offline
        </p>
      )}

      {/* DB Status */}
      {data && (
        <div className="w-full mt-2 border border-gray-700 rounded-xl p-4 text-sm space-y-2 bg-gray-900">

          <p className="text-center">
            <span className="font-semibold">
              DB Status:
            </span>{" "}
            
            <span
              className={
                data.db.isConnected
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {data.db.status}
            </span>
          </p>

          {data.db.isConnected && (
            <>
              <p>
                <span className="font-semibold">
                  Host:
                </span>{" "}
                {data.db.host}
              </p>

              <p>
                <span className="font-semibold">
                  Database:
                </span>{" "}
                {data.db.dbName}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  </div>
)
}