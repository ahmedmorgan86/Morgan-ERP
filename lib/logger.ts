type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  metadata?: Record<string, unknown>;
}

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const LEVEL_ICONS: Record<LogLevel, string> = {
  debug: "🔍",
  info: "ℹ️",
  warn: "⚠️",
  error: "❌",
};

const minLevel = LEVEL_PRIORITY[process.env.LOG_LEVEL as LogLevel] ?? LEVEL_PRIORITY.info;

function formatEntry(entry: LogEntry): string {
  const meta = entry.metadata
    ? ` ${JSON.stringify(entry.metadata)}`
    : "";
  return `${entry.timestamp} ${LEVEL_ICONS[entry.level]} [${entry.level.toUpperCase()}] ${entry.message}${meta}`;
}

function log(level: LogLevel, message: string, metadata?: Record<string, unknown>) {
  if (LEVEL_PRIORITY[level] < minLevel) return;

  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    metadata,
  };

  const formatted = formatEntry(entry);

  switch (level) {
    case "error":
      console.error(formatted);
      break;
    case "warn":
      console.warn(formatted);
      break;
    default:
      console.log(formatted);
  }
}

export const logger = {
  info(message: string, metadata?: Record<string, unknown>) {
    log("info", message, metadata);
  },
  warn(message: string, metadata?: Record<string, unknown>) {
    log("warn", message, metadata);
  },
  error(message: string, metadata?: Record<string, unknown>) {
    log("error", message, metadata);
  },
  debug(message: string, metadata?: Record<string, unknown>) {
    log("debug", message, metadata);
  },
};
