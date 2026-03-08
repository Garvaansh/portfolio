import { Badge } from "@/components/ui/badge";
import { heroContent } from "@/content/hero";

export default function StatusBadge() {
  // Status color mapping
  const getStatusColor = () => {
    switch (heroContent.status) {
      case "available":
        return "bg-green-500/80";
      case "busy":
        return "bg-yellow-500/80";
      case "offline":
        return "bg-gray-500/80";
      default:
        return "bg-gray-500/80";
    }
  };

  // Status label mapping
  const getStatusLabel = () => {
    switch (heroContent.status) {
      case "available":
        return "Available";
      case "busy":
        return "Busy";
      case "offline":
        return "Offline";
      default:
        return "Unknown";
    }
  };

  return (
    <Badge
      variant="outline"
      className="inline-flex items-center gap-3 px-4 py-3 backdrop-blur-xl border shadow-lg"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--soft)",
      }}
    >
      {/* Status Indicator */}
      <div className="relative">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
        {heroContent.status === "available" && (
          <div
            className={`absolute inset-0 w-3 h-3 rounded-full animate-ping ${getStatusColor()}`}
            style={{ opacity: 0.4 }}
          />
        )}
      </div>

      {/* Status Text */}
      <div className="flex flex-col">
        <span
          className="text-sm font-medium leading-tight"
          style={{ color: "var(--soft)" }}
        >
          {getStatusLabel()}
        </span>
        {heroContent.statusMessage && (
          <span
            className="text-xs leading-tight"
            style={{ color: "var(--soft)", opacity: 0.7 }}
          >
            {heroContent.statusMessage}
          </span>
        )}
      </div>
    </Badge>
  );
}
