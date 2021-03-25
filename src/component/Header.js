import { useState } from 'react'

let saveList = []

function Header(props) {
  const [id, setId] = useState(0)
  const [text, setText] = useState('')

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    setId(id + 1)
    props.setList([...props.list, { id: id, task: text, status: 'todo' }])
    setText('')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (text !== '' && text !== undefined) {
      saveList = [...props.list]
      props.setList(
        props.list.filter((val) => {
          const filteredTodos = val.task
            .toLowerCase()
            .includes(text.toLowerCase())
          return filteredTodos
        })
      )
    } else {
      return props.setList(saveList)
    }
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary justify-content-between p-3">
        <div className="navbar-brand">
          <h5>To Do-List App</h5>
        </div>
        <div>
          <form onSubmit={handleSubmitForm} className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Search"
            />
            <button
              className="btn btn-outline btn-dark m-2 my-sm-0"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  )
}

export default Header
