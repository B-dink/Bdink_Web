import Image from "next/image";
import Link from "next/link";
import type { ClassroomItem } from "../types/lecture";

interface Props {
  classroom: ClassroomItem;
  size?: "sm" | "lg";
}

export function LectureCard({ classroom, size = "sm" }: Props) {
  const { priceDetail } = classroom;
  const isFree = priceDetail.originPrice === 0;

  return (
    <Link
      href={`/lectures/${classroom.id}`}
      className={`flex-shrink-0 ${size === "lg" ? "w-full" : "w-[260px]"}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-card bg-base-card">
        <Image
          src={classroom.classRoomThumbnail}
          alt={classroom.title}
          fill
          className="object-cover"
          sizes="260px"
        />
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm"
          aria-label="북마크"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={classroom.isBookmarked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      <div className="mt-2 space-y-1">
        <p className="line-clamp-2 text-sm font-medium text-text-primary">{classroom.title}</p>
        <p className="text-xs text-text-secondary">{classroom.instructor} 강사</p>

        {isFree ? (
          <p className="text-sm font-bold text-brand">무료강의</p>
        ) : (
          <p className="text-sm font-bold text-text-primary">
            {priceDetail.discountPrice.toLocaleString()}원{" "}
            {priceDetail.discountRate > 0 && (
              <span className="text-red-400">{priceDetail.discountRate}%</span>
            )}
          </p>
        )}

        <p className="flex items-center gap-1 text-xs text-text-muted">
          <span className="text-brand">★</span> ({classroom.totalReviewCount}건 후기)
        </p>
      </div>
    </Link>
  );
}
