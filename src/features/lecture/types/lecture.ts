export interface PriceDetail {
  originPrice: number;
  discountPrice: number;
  discountRate: number;
}

export interface ClassroomItem {
  id: number;
  career: string;
  title: string;
  classRoomThumbnail: string;
  instructor: string;
  priceDetail: PriceDetail;
  isBookmarked: boolean;
  bookmarkId: number | null;
  totalLectureCount: number;
  totalReviewCount: number;
}

export interface PromotionItem {
  classRoomId: number;
  promotionThumbnail: string;
  promotionLink: string;
}

export interface CareerGroup {
  classrooms: ClassroomItem[];
}

export interface ClassroomFeedData {
  promotionDtos: PromotionItem[];
  classroomDtoByCareer: CareerGroup[];
}

// 챕터/강의 목록 (실제 ChapterDTO/LectureDTO 기준으로 수정)
export interface LectureItem {
  lectureId: number;
  title: string;
  lectureTime: string;
  progress: string; // 수강 진행률 (예: "0%", "100%" 형태로 추정 - 실제 포맷 확인 필요)
}

export interface Chapter {
  title: string;
  lectures: LectureItem[];
}

export interface ChapterData {
  totalProgress: number;
  totalLectures: number;
  completedLectures: number;
  expiredDate: string;
  chapters: Chapter[];
}

export interface DetailClassRoom {
  title: string;
  introduction: string;
  bookmarkCount: number;
  instructor: string;
  instructorProfile: string | null;
  totalChapterCount: number;
  totalLectureCount: number;
  expiredDate: string | null;
  totalLectureTime: string;
  subtitles: string;
  thumbnail: string;
  payment: boolean;
  priceDetail: PriceDetail;
  level: string | null;
  isBookmarked: boolean;
  bookmarkId: number | null;
  detailPageImageUrls: string[];
  chapters: Chapter[];
  otLink: string | null;
}

export interface SignedVideoUrl {
  url: string;
  expiresAt: string;
}
