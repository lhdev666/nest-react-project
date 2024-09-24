import makeRequest from "../utils/request";

export interface ICourse {
  id: number;
  title: string;
  course_img: string;
  price: string;
  point: string;
  category: string;
}

export type CourseWithoutId = Omit<ICourse, "id">;

// 课程获取接口
export async function getCourse() {
  return makeRequest<ICourse[]>("/course");
}

// 课程删除接口
export async function delCourse(id: number) {
  return makeRequest("/course", {
    method: "DELETE",
    data: { id },
  });
}

// 课程创建接口
export async function createCourse(data: CourseWithoutId) {
  return makeRequest("/course", {
    data,
    method: "POST",
  });
}

// 课程修改接口
export async function updateCourse(data: Partial<CourseWithoutId>) {
  return makeRequest("/course", {
    data,
    method: "PUT",
  });
}
