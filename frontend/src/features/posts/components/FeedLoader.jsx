import { SkeletonCardLoader } from "../../../components/SkeletonCardLoader";

export const FeedLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCardLoader key={i} />)}
    </div>
);