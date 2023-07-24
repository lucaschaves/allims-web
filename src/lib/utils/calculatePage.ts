export default (pageSize: number, itemIndex: number) => {
    return Math.ceil(++itemIndex / pageSize);
};
