import Image from "next/image";
import Link from "next/link";
import type { PromotionItem } from "../types/lecture";

interface Props {
  promotions: PromotionItem[];
}

export function PromotionCarousel({ promotions }: Props) {
  if (promotions.length === 0) return null;

  return (
    <div className="scroll-hidden flex gap-3 overflow-x-auto px-4 py-2">
      {promotions.map((p) => (
        <Link
          key={p.classRoomId}
          href={p.promotionLink || `/lectures/${p.classRoomId}`}
          className="relative aspect-[9/12] w-[150px] flex-shrink-0 overflow-hidden rounded-card bg-base-card"
        >
          <Image src={p.promotionThumbnail} alt="promotion" fill className="object-cover" sizes="150px" />
        </Link>
      ))}
    </div>
  );
}
