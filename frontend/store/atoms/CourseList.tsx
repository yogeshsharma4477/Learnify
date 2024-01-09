import { atom, selector } from "recoil";
import { CourseProps } from '@/types/CourseType'


export const CourseListAtom = atom<CourseProps | {}>({
    key: "courseList",
    default: undefined,
});
