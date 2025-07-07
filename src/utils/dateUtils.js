export const formatDate = (isoString) => {
  const d = new Date(isoString);
  return d.toLocaleDateString();
};

export const formatTime = (isoString) => {
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};