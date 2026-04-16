export default async function getPastOrders(page) {
  const res = await fetch(`/api/past-orders?page=${page}`);
  const data = res.json();
  return data;
}
