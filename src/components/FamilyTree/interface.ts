export default interface TreeDataProps {

    id: number,
    name: string,
    gender: string
    children: number[],
    parents: number[],
}

export interface FinishFind {
    [key: number]: boolean
}