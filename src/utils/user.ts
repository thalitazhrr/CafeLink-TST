export const isLoggedin = () => {
    const token = localStorage.getItem('token');
    return !!token && token !== '""';
};
export const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
}