import { apiUrl } from "../utils/apiConfig";

export default async function getPastOrder(order) {
  const response = await fetch(`${apiUrl}/api/past-order/${order}`);
  const data = await response.json();
  return data;
}
