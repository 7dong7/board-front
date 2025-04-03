// css
import "./Notfound.css";

const Notfound = () => {

    return (
        <div className={"Notfound"}>
            <div className={"Notfound-left"}>
                <span className={"Notfound-bold"}>잘못된 접근</span>
                <span>이거나 요청하신</span>
            </div>
            <div className={"Notfound-left"}>
                <span>페이지를 </span>
                <span className={"Notfound-bold"}>찾을 수 없습니다</span>
            </div>
        </div>
    )
}

export default Notfound;