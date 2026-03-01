"use client";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid" />

      {/* Aurora wave layers */}
      <div className="aurora-layer aurora-1" />
      <div className="aurora-layer aurora-2" />
      <div className="aurora-layer aurora-3" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-vignette" />
    </div>
  );
}
