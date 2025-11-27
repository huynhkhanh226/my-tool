// components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image shimmer" />
      <div className="skeleton-content">
        <div className="skeleton-title shimmer" />
        <div className="skeleton-text shimmer" />
        <div className="skeleton-text short shimmer" />
      </div>
    </div>
  );
}
