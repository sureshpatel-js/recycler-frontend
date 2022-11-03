
import { useState } from "react";
import { useEffect } from "react";
import DatePicker from 'react-date-picker';
import "./DateRangeSlider.css"
const DateRangeSlider = (props) => {
    const { startDate, endDate, getSelectedStartEndDate } = props;
    const [state, setState] = useState({
        min: 0,
        max: null,
        minSelectedValue: 0,
        maxSelectedValue: null
    })
    const [dateArray, setDateArray] = useState([]);
    const [displayStartEndDate, setDisplayStartEndDate] = useState({
        startDate: null,
        endDate: null
    })

    const getMaxMinDatesFn = (minVal, maxVal, datesArray) => {
        const minDate = datesArray[minVal];
        const maxDate = datesArray[maxVal];
        setDisplayStartEndDate({
            startDate: minDate, //`${minDateArr[2]}-${minDateArr[1]}-${minDateArr[0]}`,
            endDate: maxDate //`${maxDateArr[2]}-${maxDateArr[1]}-${maxDateArr[0]}`
        });
        getSelectedStartEndDate(`${minDate}T00:00:00.000+00:00`, `${maxDate}T00:00:00.000+00:00`);
    }

    useEffect(() => {
        const startDateForLoop = new Date(startDate)
        const datesArray = [new Date(startDate).toISOString().split("T")[0]];
        while (startDateForLoop < new Date(endDate)) {
            startDateForLoop.setDate(startDateForLoop.getDate() + 1)
            datesArray.push(startDateForLoop.toISOString().split("T")[0]);
        }
        setDateArray(datesArray);
        const rangeInput = document.querySelectorAll(".range-input input");
        const progress = document.querySelector(".slider .progress");
        let minVal = 0;//parseInt(rangeInput[0].value);
        let maxVal = datesArray.length - 1;//parseInt(rangeInput[1].value);
        let min = 0;
        let max = datesArray.length - 1;
        progress.style.left = ((minVal) / max) * 100 + "%";
        progress.style.right = (100 - ((maxVal) / max) * 100) + "%";
        getMaxMinDatesFn(minVal, maxVal, datesArray);
        setState(state => ({ ...state, max: datesArray.length - 1, maxSelectedValue: datesArray.length - 1 }))
    }, [])
    const onChange = (e) => {
        const rangeInput = document.querySelectorAll(".range-input input");
        const progress = document.querySelector(".slider .progress");
        let gap = 1;
        let minVal = parseInt(rangeInput[0].value);
        let maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < gap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - gap;
            } else {
                rangeInput[1].value = minVal + gap;
            }
        } else {
            progress.style.left = ((minVal) / rangeInput[0].max) * 100 + "%";
            progress.style.right = (100 - ((maxVal) / rangeInput[1].max) * 100) + "%";
            setState(state => ({ ...state, minSelectedValue: minVal, maxSelectedValue: maxVal }));
            getMaxMinDatesFn(minVal, maxVal, dateArray);
        }
    }
    const onDateChange = (value, type) => {
        const date = value.toISOString().split("T")[0]
        const index = dateArray.indexOf(date) + 1;
        if (type === "startDate") {
            const rangeInput = document.querySelectorAll(".range-input input");
            const progress = document.querySelector(".slider .progress");
            let gap = 1;
            let minVal = index; //parseInt(rangeInput[0].value);
            let maxVal = parseInt(rangeInput[1].value);

            if (maxVal - minVal < gap) {
                //if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - gap;
                // } else {
                //     rangeInput[1].value = minVal + gap;
                // }
            } else {
                progress.style.left = ((minVal) / rangeInput[0].max) * 100 + "%";
                progress.style.right = (100 - ((maxVal) / rangeInput[1].max) * 100) + "%";
                setState(state => ({ ...state, minSelectedValue: minVal, maxSelectedValue: maxVal }));
                getMaxMinDatesFn(minVal, maxVal, dateArray);
            }
        } else if (type === "endDate") {
            const rangeInput = document.querySelectorAll(".range-input input");
            const progress = document.querySelector(".slider .progress");
            let gap = 1;
            let minVal = parseInt(rangeInput[0].value);
            let maxVal = index;

            if (maxVal - minVal < gap) {
                // if (e.target.className === "range-min") {
                //     rangeInput[0].value = maxVal - gap;
                // } else {
                rangeInput[1].value = minVal + gap;
                // }
            } else {
                progress.style.left = ((minVal) / rangeInput[0].max) * 100 + "%";
                progress.style.right = (100 - ((maxVal) / rangeInput[1].max) * 100) + "%";
                setState(state => ({ ...state, minSelectedValue: minVal, maxSelectedValue: maxVal }));
                getMaxMinDatesFn(minVal, maxVal, dateArray);
            }
        }

    }
    return (
        <div className="dateRangeSliderContainer" >
            <div className="displayDateContainer" >
                <DatePicker
                    value={new Date(displayStartEndDate.startDate)}
                    onChange={(value) => onDateChange(value, "startDate")}
                    clearIcon
                    minDate={new Date(startDate)}
                    maxDate={new Date(endDate)}
                />
                <DatePicker
                    value={new Date(displayStartEndDate.endDate)}
                    onChange={(value) => onDateChange(value, "endDate")}
                    clearIcon
                    minDate={new Date(startDate)}
                    maxDate={new Date(endDate)}
                />
                {/* <p>{displayStartEndDate.startDate}</p>
                <p>{displayStartEndDate.endDate}</p> */}
            </div>
            <div className="slider">
                <div className="progress"></div>
            </div>
            <div className="range-input">
                <input onChange={onChange} type="range" className="range-min" min={state.min} max={state.max} value={state.minSelectedValue} step="1"></input>
                <input onChange={onChange} type="range" className="range-max" min={state.min} max={state.max} value={state.maxSelectedValue} step="1"></input>
            </div>

        </div>
    )
}

export default DateRangeSlider;