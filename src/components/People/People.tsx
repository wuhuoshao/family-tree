import React from "react";
import PersonInfo from "./interface";
import './People.css'
export default class People extends React.Component<{ personInfo: PersonInfo }> {
    constructor(props: { personInfo: PersonInfo }) {
        super(props);
    }
    render() {
        const personInfo = this.props.personInfo
        return (
            <div className={personInfo?.gender === "female" ? 'lightpink people' : 'lightblue people'}>{personInfo?.name} </div>
        )
    }
}
