import { Trash } from 'react-bootstrap-icons'
import { PencilSquare } from 'react-bootstrap-icons'
import { useEffect, useRef, useState } from 'react'
import { formatDateTime } from '../utils/formatDate'

function ListItem({ setActLog, actLog, logId, setLogId, ...props }) {
  const [text, setText] = useState('')
  const [edit, setToEdit] = useState(true)
  const { id, task, date, detail, status } = props.item

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  function handleDelete(idToDelete, task) {
    const deletedTodoList = props.list.filter((val) => val.id !== idToDelete)
    localStorage.setItem('list', JSON.stringify(deletedTodoList))
    props.setList(deletedTodoList)
    setLogId(+logId + 1)
    const deletedLog = [
      {
        logId,
        date: formatDateTime(new Date()),
        action: 'Delete',
        detail: `Delete: ${task}`
      },
      ...actLog
    ]
    localStorage.setItem('log', JSON.stringify(deletedLog))
    setActLog(deletedLog)
  }

  function handleTextChange(e) {
    setText(e.target.value)
  }

  function handleEdit(idToEdit, textLog) {
    setLogId(+logId + 1)
    let textToEdit = text
    const editTodoList = props.list.map((val) =>
      idToEdit === val.id ? { ...val, task: textToEdit } : val
    )
    if (textToEdit && textToEdit !== '') props.setList(editTodoList)
    localStorage.setItem('list', JSON.stringify(editTodoList))
    setToEdit(!edit)
    const editLog = [
      {
        logId,
        date: formatDateTime(new Date()),
        action: 'Edit',
        detail: `Edit "${task}" to "${textLog}"`
      },
      ...actLog
    ]
    localStorage.setItem('log', JSON.stringify(editLog))
    setActLog(editLog)
  }

  function handleToDoing(idToDoing, task) {
    setLogId(+logId + 1)
    const doingLog = [
      {
        logId,
        date: formatDateTime(new Date()),
        action: 'change to doing',
        detail: `change ${task} to doing`,
        status: 'Doing'
      },
      ...actLog
    ]
    setActLog(doingLog)
    const doingTodoList = props.list.map((val) =>
      idToDoing === val.id ? { ...val, status: 'doing' } : val
    )
    props.setList(doingTodoList)
    localStorage.setItem('list', JSON.stringify(doingTodoList))
    localStorage.setItem('log', JSON.stringify(doingLog))
  }

  function handleToDone(idToDone, task) {
    setLogId(+logId + 1)
    const doneLog = [
      {
        logId,
        date: formatDateTime(new Date()),
        action: 'change to done',
        detail: `change ${task} to done`,
        status: 'done'
      },
      ...actLog
    ]
    setActLog(doneLog)
    const doneTodoList = props.list.map((val) =>
      idToDone === val.id ? { ...val, status: 'done' } : val
    )
    props.setList(doneTodoList)
    localStorage.setItem('list', JSON.stringify(doneTodoList))
    localStorage.setItem('log', JSON.stringify(doneLog))
  }

  return (
    <div
      style={{
        color: 'white',
        border: '2px solid white'
      }}
      style={{
        background:
          status === 'doing'
            ? '#ffc107'
            : status === 'done'
            ? '#28a745'
            : 'lightgrey'
      }}
      className="card-body d-flex flex-column"
    >
      <div style={{ marginBottom: '20px' }}>
        {edit ? (
          <span
            style={{
              height: '60px'
            }}
          >
            <span
              className="card-text"
              style={{
                marginRight: '0',
                marginBottom: '0'
              }}
            >
              {task}
            </span>
            <span style={{ margin: '5px' }}>|</span>
          </span>
        ) : (
          <div
            style={{
              height: '60px'
            }}
          >
            <input
              ref={inputRef}
              onKeyUp={(e) => {
                e.key === 'Enter' && handleEdit(id, text)
              }}
              style={{
                width: '60%',
                borderRadius: '4px',
                border: 'none',
                margin: 0,
                padding: '0.75rem'
              }}
              className="m-1"
              value={text}
              type="text"
              onChange={handleTextChange}
            />
            <button
              onClick={() => handleEdit(id, text)}
              className="btn btn-light"
            >
              Submit
            </button>
          </div>
        )}
        <span>{date}</span>
        <p>{detail}</p>
      </div>
      <div className="d-flex justify-content-end">
        <div
          className="d-inline bg-light"
          style={{
            borderRadius: '5px'
          }}
        >
          <button
            className="btn btn-sm m-1"
            style={{
              border: '1px solid blue'
            }}
            onClick={() => {
              setToEdit(!edit)
              setText(task)
            }}
          >
            <PencilSquare color="blue" />
          </button>
          <button
            style={{
              border: '1px solid red'
            }}
            className="btn btn-sm m-1"
            onClick={() => handleDelete(id, task)}
          >
            <Trash color="red" />
          </button>
          <button
            className="btn btn-sm btn-outline-warning m-1"
            onClick={() => handleToDoing(id, task)}
          >
            Doing
          </button>
          <button
            className="btn btn-sm btn-outline-success m-1"
            onClick={() => handleToDone(id, task)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListItem
