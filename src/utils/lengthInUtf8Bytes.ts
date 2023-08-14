const maxByteSize = 100000; //10485760 MAX Storage;

const lengthInUtf8Bytes = (str: string) => {
    const m = encodeURIComponent(str).match(/%[89ABab]/g);
    const size = str.length + (m ? m.length : 0);
    const max = size > maxByteSize;
    return {
        size,
        max,
    };
};

export { lengthInUtf8Bytes };
