import PersonInfo from "./interface";
import './People.css'

export default function People({ personInfo }: { personInfo: PersonInfo }) {
    return (
        <div className={personInfo?.gender === "female" ? 'lightpink people' : 'lightblue people'}>{personInfo?.name} </div>
    )
}
