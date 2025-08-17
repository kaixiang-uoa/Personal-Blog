import { Skeleton } from './skeleton';

export default function ArticleSkeleton() {
  return (
    <div className="flex flex-col gap-3 pb-4 h-full">
      <Skeleton className="w-full aspect-[16/10] rounded-lg" />
      <div className="flex-1 flex flex-col">
        <Skeleton className="w-full h-6 mb-1" />
        <Skeleton className="w-2/3 h-6 mb-1" />
        <Skeleton className="w-1/3 h-4 mt-auto" />
      </div>
    </div>
  );
}
