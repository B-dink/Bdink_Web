import { useQuery } from "@tanstack/react-query";
import { lectureApi } from "../api/lecture-api";

export function useLectureFeed() {
  return useQuery({
    queryKey: ["lectures", "all"],
    queryFn: lectureApi.getAll,
  });
}

export function useLectureDetail(id: number) {
  return useQuery({
    queryKey: ["lectures", "detail", id],
    queryFn: () => lectureApi.getDetail(id),
    enabled: !!id,
  });
}

export function useLectureChapters(id: number) {
  return useQuery({
    queryKey: ["lectures", "chapters", id],
    queryFn: () => lectureApi.getChapters(id),
    enabled: !!id,
  });
}
