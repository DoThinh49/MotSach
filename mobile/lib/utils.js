// this function will convert the createdAt to this format: "ngày 15 tháng 5 năm 2023"
export function formatMemberSince(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() trả về 0-11
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// this function will convert the createdAt to this format: "May 15, 2023"
export function formatPublishDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}
