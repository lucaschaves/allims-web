export const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return {
            device: "tablet",
            orientation:
                window.innerHeight > window.innerWidth
                    ? "portrait"
                    : "landscape",
        };
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return {
            device: "mobile",
            orientation:
                window.innerHeight > window.innerWidth
                    ? "portrait"
                    : "landscape",
        };
    }
    return {
        device: "desktop",
        orientation:
            window.innerHeight > window.innerWidth ? "portrait" : "landscape",
    };
};
