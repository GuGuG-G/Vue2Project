//接口
import request from "../utils/request";

export function register(user) {
  return request.post("/register", user);
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
