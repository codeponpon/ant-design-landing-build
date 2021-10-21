const generateUsername = () => {
  const uid = new Date().getTime().toString(36);
  return `olo${uid}`;
};

export default generateUsername;
