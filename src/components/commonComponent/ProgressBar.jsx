import { useState } from "react";
import { useEffect } from "react";

const ProgressBar = (props) => {
    const { page, maxPage } = props;
    const [arr, setArr] = useState([])
    useEffect(() => {
        let localArray = [];
        for (let i = 1; i <= maxPage; i++) {
            if (page === i) {
                localArray.push(1)
            } else {
                localArray.push(0)
            }
        }
        setArr(localArray);
    }, [page, maxPage])
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
            {
                arr.map((e, i) => {
                    if (e === 0) {
                        return <div key={i} style={{ marginLeft: "10px", marginRight: "10px", height: "15px", width: "15px", borderRadius: "7.5px", backgroundColor: "white" }} ></div>
                    } else if (e === 1) {
                        return <div key={i} style={{ marginLeft: "10px", marginRight: "10px", height: "15px", width: "15px", borderRadius: "7.5px", backgroundColor: "#1565C0" }} ></div>
                    }
                })
            }
        </div>
    )
}
export default ProgressBar;