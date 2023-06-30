export const getAmbientURL = () => {
    if (["localhost", "192.168.178.158"].includes(window.location.hostname)) {
        return "https://allims.net";
    }
    return window.origin;
};
