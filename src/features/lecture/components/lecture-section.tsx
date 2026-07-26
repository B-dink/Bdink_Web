import Link from "next/link";
import type { ClassroomItem } from "../types/lecture";
import { LectureCard } from "./lecture-card";

interface Props {
  title: string;
  classrooms: ClassroomItem[];
}

export function LectureSection({ title, classrooms }: Props) {
  if (classrooms.length === 0) return null;

  return (
    <section className="py-4">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-lg font-bold text-text-primary">{title}</h2>
        <Link href="#" className="text-sm text-text-secondary">
          더 보기
        </Link>
      </div>
      <div className="scroll-hidden mt-3 flex gap-3 overflow-x-auto px-4">
        {classrooms.map((c) => (
          <LectureCard key={c.id} classroom={c} />
        ))}
      </div>
    </section>
  );
}
