import ComplaintItemSkeleton from "./ComplaintItemSkeleton";

export default function ComplaintsSkeleton({ count = 5 }) {
  return (
    <div className="flex flex-col gap-3 mt-2">
      {Array.from({ length: count }).map((_, i) => (
        <ComplaintItemSkeleton key={i} />
      ))}
    </div>
  );
}
