import React from "react";
import { ParsedTreeNode } from "./interface"
import './TreeNode.css';
import People from "../People"
export default class TreeNode extends React.Component<{ data: ParsedTreeNode }> {

    constructor(props: { data: ParsedTreeNode }) {
        super(props);
    }

    render() {
        const personInfo = this.props.data || null
        return (
            <div className="tree-node">
                {personInfo ? (<People personInfo={{ name: personInfo.name, gender: personInfo.gender }}></People>) : null}
                {personInfo?.partner?.name ? (<div className="partner"><People personInfo={{ name: personInfo.partner.name, gender: personInfo.partner.gender }}></People></div>) : null}
                {personInfo?.children && personInfo.children.length > 0 ? (
                    <ul>
                        {personInfo.children.map((item: ParsedTreeNode) => {
                            return (
                                <li key={item.id}>
                                    <TreeNode data={item}></TreeNode>
                                </li>
                            )
                        })}</ul>

                ) : null}

            </div>
        )
    }
}
