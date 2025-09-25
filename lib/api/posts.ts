import { posts } from "@/app/seed";
import { Post } from "@/app/types";
import { delay, jitter, maybeFail } from "./simulation";

let _posts = [...posts];

/**
 * 게시물/보고서 관련 API 함수들
 *
 * 가정:
 * - 게시물 데이터는 메모리에서 관리됨
 * - 게시물은 회사와 연결됨 (resourceId)
 * - 생성/수정/삭제 기능 제공
 */

export async function fetchPosts(): Promise<Post[]> {
  await delay(jitter());
  return _posts;
}

export async function createOrUpdatePost(
  p: Omit<Post, "id"> & {
    id?: string;
  }
): Promise<Post> {
  await delay(jitter());
  if (maybeFail()) throw new Error("게시물 저장 중 오류가 발생했습니다.");

  if (p.id) {
    _posts = _posts.map((x) => (x.id === p.id ? (p as Post) : x));
    return p as Post;
  }

  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}

// 특정 회사의 게시물 조회
export async function fetchPostsByCompany(companyId: string): Promise<Post[]> {
  await delay(jitter());
  if (maybeFail())
    throw new Error("회사별 게시물 조회 중 오류가 발생했습니다.");

  return _posts.filter((post) => post.resourceId === companyId);
}

// 게시물 삭제
export async function deletePost(id: string): Promise<boolean> {
  await delay(jitter());
  if (maybeFail()) throw new Error("게시물 삭제 중 오류가 발생했습니다.");

  _posts = _posts.filter((post) => post.id !== id);
  return true;
}

// 게시물 검색
export async function searchPosts(query: string): Promise<Post[]> {
  await delay(jitter());
  if (maybeFail()) throw new Error("게시물 검색 중 오류가 발생했습니다.");

  const lowerQuery = query.toLowerCase();
  return _posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
  );
}

// 최근 게시물 조회
export async function fetchRecentPosts(limit: number = 5): Promise<Post[]> {
  await delay(jitter());
  if (maybeFail()) throw new Error("최근 게시물 조회 중 오류가 발생했습니다.");

  return [..._posts]
    .sort(
      (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
    )
    .slice(0, limit);
}
