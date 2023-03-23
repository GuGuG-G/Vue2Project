//接口
import request from "../utils/request";

export function login(user) {
  return request.post("/login", user);
}
// export async function login(user) {
//   try {
//     const respone = await request.post("/login", user);
//     return respone.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
