import React from "react"
import useMockData from "../utils/mockData"

const Main = () => {
    const { error, initialize, progress, status } = useMockData()
    const handleClick = () => {
        initialize()
    }
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3">
            <div className="container mt-5">
                <h1>Main Page</h1>
                <h3>Инициализация данных в FireBase</h3>
                <ul>
                    <li>Status: { status }</li>
                    <li>Progress: { progress }%</li>
                    { error && <li>error: { error }</li> }
                </ul>
                <button className="btn btn-primary" onClick={ handleClick }>Инициализировать</button>
            </div>
        </div>
    )
}

export default Main
