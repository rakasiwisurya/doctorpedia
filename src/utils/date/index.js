export const getChatTime = newDate => {
  const hours = newDate.getHours();
  const minutes = String(newDate.getMinutes()).padStart(2, '0');
  const twelveHour = String(hours % 12).padStart(2, '0');

  return `${twelveHour}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
};

export const setDateChat = newDate => {
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const date = String(newDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${date}`;
};
