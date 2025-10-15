export const exportData = () => {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    data[key] = localStorage.getItem(key);
  }
  return JSON.stringify(data);
};

export const importData = (jsonData) => {
  const data = JSON.parse(jsonData);
  Object.keys(data).forEach(key => {
    localStorage.setItem(key, data[key]);
  });
};