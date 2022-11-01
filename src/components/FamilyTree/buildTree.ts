import { ParsedTreeNode } from "../TreeNode/interface";
import TreeDataProps, { FinishFind } from "./interface"
import isArrEqual from './utils'
let finishFind: FinishFind = {}

function getChildren(id: number, flatList: TreeDataProps[], finishFind: FinishFind) {
    const children: ParsedTreeNode[] = []
    for (const node of flatList) {
        if (node.parents.includes(id)) {
            children.push({ ...node, children: [], partner: findPartner(node, flatList, finishFind) || {} as TreeDataProps })
        }
    }

    for (const node of children) {
        const children = getChildren(node.id, flatList, finishFind)
        if (children.length) {
            node.children = children
        }
    }

    return children
}

function findPartner(person: TreeDataProps, list: TreeDataProps[], finishFind: FinishFind) {
    if (finishFind[person.id]) {
        return false
    }
    if (!person || !person.children || person.children.length === 0) {
        return false
    }
    const partner = list.find(item => {
        return isArrEqual(item.children, person.children) && item.id !== person.id
    })
    if (partner) {
        finishFind[person.id] = true
        finishFind[partner.id] = true
    }
    return partner
}

export default function buildTree(flatList: TreeDataProps[] = []): ParsedTreeNode[] {
    if (!flatList || !flatList.length) {
        return []
    }
    finishFind = {}
    const tree: ParsedTreeNode[] = []
    for (const node of flatList) {
        const partner = findPartner(node, flatList, finishFind)
        if (node.parents.length === 0 && partner && partner.parents.length === 0) {
            let p: ParsedTreeNode = { ...node, children: [], partner }
            p.children = getChildren(p.id, flatList, finishFind)
            tree.push(p)
        }
    }
    return tree
}