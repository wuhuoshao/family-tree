import { useState, useEffect } from "react";
import TreeNode from "../TreeNode";
import { ParsedTreeNode } from "../TreeNode/interface";
import TreeDataProps from "./interface"
import buildTree from "./buildTree"

export default function FamilyTree(props: { flatList: TreeDataProps[] }) {

    const [treeData, setTreeData] = useState([] as ParsedTreeNode[])

    useEffect(() => {
        const tree = buildTree(props.flatList)
        setTreeData(tree)
    }, [props.flatList])

    return (
        <div>
            {treeData.map(item => {
                return (
                    <TreeNode key={item.id} data={item}></TreeNode>
                )
            })}
        </div>
    )

}