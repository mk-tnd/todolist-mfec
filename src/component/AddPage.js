import { useState } from 'react'
import { formatDateTime } from '../utils/formatDate'

function AddPage({ setActLog, actLog, logId, setLogId, ...props }) {
  const [textList, setTextList] = useState('')
  const [textDeadline, setTextDeadline] = useState('')
  const [textActivity, setTextActivity] = useState('')

  const handleListChange = (e) => {
    setTextList(e.target.value)
  }

  const handleActivityChange = (e) => {
    setTextActivity(e.target.value)
  }

  const handleDeadlineChange = (e) => {
    setTextDeadline(e.target.value)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    setLogId(+logId + 1)
    props.setId(props.list[props.list.length - 1].id + 1)
    const addList = [
      ...props.list,
      {
        id: props.id,
        task: textList,
        date: textDeadline,
        detail: textActivity,
        status: 'todo'
      }
    ]
    props.setList(addList)
    const addLog = [
      {
        logId,
        date: formatDateTime(new Date()),
        action: 'Add',
        detail: `Add: ${textList}`
      },
      ...actLog
    ]
    setActLog(addLog)
    props.setToAdd(!props.toAdd)
    localStorage.setItem('list', JSON.stringify(addList))
    localStorage.setItem('log', JSON.stringify(addLog))
    setTextList('')
    setTextDeadline('')
    setTextActivity('')
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center" style={{ height: '40vh' }}>
        <form
          style={{
            padding: '25px',
            backgroundColor: 'lightgrey',
            borderRadius: '7px'
          }}
          onSubmit={handleSubmitForm}
        >
          <div>
            <label style={{ width: 100 }} htmlFor="list">
              New List
            </label>
            <input
              value={textList}
              onChange={handleListChange}
              id="list"
              type="text"
            />
          </div>
          <div>
            <label style={{ width: 100 }} htmlFor="deadline">
              Dead Line
            </label>
            <input
              value={textDeadline}
              onChange={handleDeadlineChange}
              id="deadline"
              type="date"
            />
          </div>
          <div>
            <label style={{ width: 100 }} htmlFor="list">
              New Activity
            </label>
            <input
              value={textActivity}
              onChange={handleActivityChange}
              id="list"
              type="text"
            />
          </div>
          <button
            className="d-flex mx-auto btn btn-outline-dark mt-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddPage
