import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { APICall } from "../types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiCall: APICall | null;
}

const Modal = ({ isOpen, onClose, apiCall }: ModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !apiCall) return null;

  const getStatusText = (status: number) => {
    const statusTexts: { [key: number]: string } = {
      200: "OK",
      201: "Created",
      204: "No Content",
      301: "Moved Permanently",
      401: "Unauthorized",
      404: "Not Found",
      422: "Unprocessable Entity",
      500: "Internal Server Error",
    };
    return statusTexts[status] || "Unknown";
  };

  const getMethodColor = (method: string) => {
    const colors: { [key: string]: string } = {
      GET: "bg-blue-500/20 text-blue-400",
      POST: "bg-green-500/20 text-green-400",
      PUT: "bg-yellow-500/20 text-yellow-400",
      DELETE: "bg-red-500/20 text-red-400",
      PATCH: "bg-purple-500/20 text-purple-400",
    };
    return colors[method] || "bg-gray-500/20 text-gray-400";
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-400/20 text-green-300";
    if (status >= 300 && status < 400) return "bg-blue-400/20 text-blue-300";
    if (status >= 400 && status < 500)
      return "bg-yellow-400/20 text-yellow-300";
    return "bg-red-400/20 text-red-300";
  };

  const copyEndpoint = () => {
    const fullUrl = `https://api.example.com/${apiCall.endpoint}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dummy data for demonstration
  const responseBody = {
    success: true,
    data: {
      id: apiCall.id,
      message: "Request processed successfully",
      timestamp: new Date().toISOString(),
    },
  };

  const headers = {
    "Content-Type": "application/json",
    "X-Request-ID": `req_${Math.random().toString(36).substr(2, 9)}`,
    "X-Response-Time": apiCall.responseTime,
    "Cache-Control": "no-cache",
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass rounded-3xl p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">API Call Details</h2>
            <p className="text-white/60 text-sm">{apiCall.timestamp}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Method and Status */}
        <div className="flex gap-3 items-center mb-6">
          <div
            className={`method py-2 px-4 rounded-full text-[18px] font-semibold ${getMethodColor(
              apiCall.method
            )}`}
          >
            {apiCall.method}
          </div>
          <div
            className={`response py-2 px-4 rounded-full text-[18px] font-semibold ${getStatusColor(
              apiCall.status
            )}`}
          >
            {apiCall.status} - {getStatusText(apiCall.status)}
          </div>
        </div>

        {/* Endpoint with Copy Button */}
        <div className="mb-6">
          <label className="text-sm text-white/60 mb-2 block">Endpoint</label>
          <div className="flex gap-2 items-center">
            <div className="flex-1 bg-tetriary/50 rounded-xl p-3 font-mono text-sm">
              https://api.example.com/{apiCall.endpoint}
            </div>
            <button
              onClick={copyEndpoint}
              className="p-3 bg-primary hover:bg-primary-light rounded-xl transition-colors"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-tetriary/30 rounded-xl p-4">
            <label className="text-sm text-white/60 mb-1 block">
              Response Time
            </label>
            <p className="text-lg font-semibold">{apiCall.responseTime}</p>
          </div>
          <div className="bg-tetriary/30 rounded-xl p-4">
            <label className="text-sm text-white/60 mb-1 block">Location</label>
            <p className="text-lg font-semibold">{apiCall.location}</p>
          </div>
        </div>

        {/* Response Headers */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Response Headers</h3>
          <div className="bg-tetriary/30 rounded-xl p-4 space-y-2">
            {Object.entries(headers).map(([key, value]) => (
              <div key={key} className="flex justify-between py-1">
                <span className="text-white/60 font-mono text-sm">{key}:</span>
                <span className="font-mono text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Response Body */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3">Response Body</h3>
          <div className="bg-tetriary/30 rounded-xl p-4">
            <pre className="text-sm font-mono overflow-x-auto text-white/90">
              {JSON.stringify(responseBody, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
