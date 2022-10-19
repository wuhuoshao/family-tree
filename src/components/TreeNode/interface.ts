
import TreeDataProps from "../FamilyTree/interface"

export interface ParsedTreeNode {
    id: number,
    name: string,
    gender: string
    parents: number[],
    children: ParsedTreeNode[],
    partner: TreeDataProps
}