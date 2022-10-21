import { useCallback, useState } from "react";
import "./GridComponent.css";
const GridComponent = (props) => {
    const { headerArray, rowArray, tableHeight, internalHorizontalScrollWidth } = props;
    // const [headerArray, setHeaderArray] = useState(props.headerArray);
    let sumOfAllColumnWidth = 0;
    headerArray.map(h => {
        sumOfAllColumnWidth = sumOfAllColumnWidth + h.width;
    })


    // const onMouseEnter = useCallback((e) => {
    //     const id = e.target.id;

    //     const el = e.target;
    //     let prevX;
    //     const mousemove = (e) => {
    //         const add = e.clientX - prevX;
    //         const arr = [...headerArray];
    //         arr.forEach(h => {
    //             if ((h.headerName).replace(/ /g, '') === id) {
    //                 console.log("pre", h.width)
    //                 h.width = h.width + add;
    //                 console.log("post", h.width)
    //             }
    //         })
    //         setHeaderArray(arr);

    //     }
    //     const mousedown = (e) => {
    //         window.addEventListener("mousemove", mousemove)
    //         prevX = e.clientX;
    //     }

    //     el.addEventListener("mousedown", mousedown);

    //     el.addEventListener("mouseleave", function () {
    //         window.removeEventListener("mousemove", mousemove);
    //         prevX = 0;
    //     })
    // })

    return (
        <div className="grid_component_container" >
            <div className="grid_component" style={{ height: tableHeight }} >
                <div className="table_header_container" style={{ width: sumOfAllColumnWidth }} >
                    {
                        headerArray.length > 0 && headerArray.map(header => {
                            return (<div key={header.headerName} style={{ width: header.width, maxWidth: "100%" }} className="table_header_element" >
                                {header.headerName}
                                {/* {header.headerName === "Asin" && <div onMouseEnter={onMouseEnter} id={header.headerName.replace(/ /g, '')} className="table_header_resizer" ></div>} */}
                            </div>)
                        })
                    }
                </div>
                <div className="table_row_container" style={{ width: sumOfAllColumnWidth }} >
                    {
                        rowArray.length > 0 && rowArray.map(row => {
                            const dataObj = { ...row };
                            delete dataObj.cellComponent;
                            return (
                                < div className="table_row"  >
                                    {
                                        headerArray.length > 0 && headerArray.map(header => {
                                            return (
                                                <div style={{ width: header.width, maxWidth: "100%" }} className="table_row_element" >
                                                    {
                                                        header.cellComponent ? <header.cellComponent value={row[header.field]} data={dataObj} /> : row[header.field]
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div >
        </div>
    )
}

export default GridComponent;