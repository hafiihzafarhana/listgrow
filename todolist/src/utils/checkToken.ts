export const checkToken = async (newToken: string) => {
  const token = localStorage.getItem("token");
  if (token !== newToken) {
    localStorage.setItem("token", newToken ?? "");
  }
};
