const useArrayMove = (arr, fromIndex, toIndex) => {
    arr = arr.slice();
    const startIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
    const item = arr.splice(fromIndex, 1)[0];
    arr.splice(startIndex, 0, item);
    return arr;
};

export default useArrayMove;