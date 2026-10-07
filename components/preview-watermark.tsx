// Set this to false after client approval to remove the watermark everywhere.
const WATERMARK_ENABLED = true;

export function PreviewWatermark() {
  if (!WATERMARK_ENABLED) return null;

  return (
    <div
      className="preview-watermark"
      aria-hidden="true"
      style={{
        position: "fixed",
        right: "max(16px, env(safe-area-inset-right))",
        bottom: "max(16px, env(safe-area-inset-bottom))",
        zIndex: 2147483647,
        pointerEvents: "none",
        userSelect: "none",
        boxSizing: "border-box",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "rgba(23, 25, 23, 0.8)",
        color: "#f2f0e9",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.12)",
        backdropFilter: "blur(8px)",
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: "0.08em",
      }}
    >
      <span>
        CLIENT
        <br />
        PREVIEW
      </span>
    </div>
  );
}
