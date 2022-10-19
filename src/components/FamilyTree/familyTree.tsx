import React from "react";
import TreeNode from "../TreeNode";
import { ParsedTreeNode } from "../TreeNode/interface";
import TreeDataProps, { FinishFind } from "./interface"
import isArrEqual from './utils'

let finishFind: FinishFind = {}

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

function getChildren(id: number, flatList: TreeDataProps[]) {
    const children: ParsedTreeNode[] = []
    for (const node of flatList) {
        if (node.parents.includes(id)) {
            children.push({ ...node, children: [], partner: findPartner(node, flatList, finishFind) || {} as TreeDataProps })
        }
    }

    for (const node of children) {
        const children = getChildren(node.id, flatList)
        if (children.length) {
            node.children = children
        }
    }

    return children
}

export default class FamilyTree extends React.Component<{ flatList: TreeDataProps[] }, { result: ParsedTreeNode[] }> {
    constructor(props: { flatList: TreeDataProps[] }) {
        super(props);
        this.state = {
            result: []
        }
    }
    setTree = (flatList: TreeDataProps[]) => {
        const tree: ParsedTreeNode[] = []
        for (const node of flatList) {
            const partner = findPartner(node, flatList, finishFind)
            if (node.parents.length === 0 && partner && partner.parents.length === 0) {
                let p: ParsedTreeNode = { ...node, children: [], partner }
                p.children = getChildren(p.id, flatList)
                tree.push(p)
            }
        }
        this.setState({
            result: tree
        })
    }

    componentDidMount() {
        finishFind = {}
        this.setTree(this.props.flatList)
    }
    render() {
        return (
            <div>
                {this.state.result.map(item => {
                    return (
                        <TreeNode key={item.id} data={item}></TreeNode>
                    )
                })}
            </div>
        )
    }
}