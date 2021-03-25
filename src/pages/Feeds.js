import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../component/Header'
import Container from '../component/Container'
import { PlusCircleFill } from 'react-bootstrap-icons'
import { Backspace } from 'react-bootstrap-icons'
import AddPage from '../component/AddPage'

function Feeds({
  list,
  setList,
  actLog,
  setActLog,
  logId,
  setLogId,
  id,
  setId
}) {
  const history = useHistory()
  const [toAdd, setToAdd] = useState(false)
  function changeToLog() {
    history.push('/history', JSON.parse(localStorage.getItem('log')))
  }

  return (
    <div>
      <Header {...{ list, id, setId, toAdd, setList }} />
      {toAdd ? (
        <div className="container-fluid">
          <div className="mt-3 ml-4">
            <button
              onClick={() => setToAdd(!toAdd)}
              className="btn btn-outline-dark"
            >
              <Backspace size={30}></Backspace> Back
            </button>
          </div>
          <div className="row justify-content-center">
            <AddPage
              {...{
                id,
                setId,
                list,
                setList,
                toAdd,
                setToAdd,
                setLogId,
                logId,
                setActLog,
                actLog
              }}
            />
          </div>
        </div>
      ) : (
        <div className="container-fluid mt-4">
          <div>
            <button
              className="btn btn-outline btn-dark m-2 my-sm-0"
              type="button"
              onClick={changeToLog}
            >
              Activity Log
            </button>
          </div>
          <div className="d-flex justify-content-center my-4">
            <button
              onClick={() => setToAdd(!toAdd)}
              className="btn btn-outline btn-success m-2 my-sm-0"
              type="submit"
            >
              <PlusCircleFill size={20}></PlusCircleFill> Add New List
            </button>
          </div>
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="card">
                <div className="card-header">To Do</div>
                <Container
                  {...{
                    actLog,
                    setActLog,
                    logId,
                    setLogId,
                    list,
                    setList,
                    status: 'todo'
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <div className="card-header">Doing</div>
                <Container
                  {...{
                    actLog,
                    setActLog,
                    logId,
                    setLogId,
                    list,
                    setList,
                    status: 'doing'
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <div className="card-header">Done</div>
                <Container
                  {...{
                    actLog,
                    setActLog,
                    logId,
                    setLogId,
                    list,
                    setList,
                    status: 'done'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Feeds
