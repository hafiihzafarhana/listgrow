export const checkToken = async (newToken) => {
    const token = localStorage.getItem("token");
    if (token !== newToken) {
        localStorage.setItem("token", newToken ?? "");
    }
};
