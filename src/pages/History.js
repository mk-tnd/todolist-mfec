import { useState, useEffect } from 'react'
import { Backspace } from 'react-bootstrap-icons'
import { useHistory, useLocation } from 'react-router-dom'

function History(props) {
  const [log, setLog] = useState([])
  const history = useHistory()
  const location = useLocation()
  const locationLog = location.state

  useEffect(() => {
    setLog(locationLog)
  }, [locationLog])
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary justify-content-between p-3">
        <div className="navbar-brand">
          <h5>Activity Log</h5>
        </div>
      </nav>
      <div className="container mt-3 d-flex justify-content-between align-items-center">
        <div>
          <button
            onClick={() => history.goBack()}
            className="btn btn-outline-dark"
          >
            <Backspace size={30}></Backspace> Back
          </button>
        </div>
        <div>
          <button
            className="btn btn-outline btn-dark m-2 my-sm-0"
            type="button"
            onClick={() => {
              props.onClearLog()
              setLog([])
            }}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {log.length
                ? log.map((val, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{val.logId}</th>
                        <td>{val.date}</td>
                        <td>{val.action}</td>
                        <td>{val.detail}</td>
                      </tr>
                    )
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default History
