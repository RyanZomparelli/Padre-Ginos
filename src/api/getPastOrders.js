import { apiUrl } from "../utils/apiConfig";

export default async function getPastOrders(page) {
  const res = await fetch(`${apiUrl}/api/past-orders?page=${page}`);
  const data = res.json();
  return data;
}
