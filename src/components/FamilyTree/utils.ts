export default function isArrEqual(arr1: number[], arr2: number[]) {
    return arr1.length === arr2.length && arr1.every((ele) => arr2.includes(ele));
};