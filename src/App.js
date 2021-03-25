import { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Feeds from './pages/Feeds'
import History from './pages/History'
const TODO_LIST = [
  {
    id: 888,
    task: 'to do 1',
    date: '2021-12-12',
    detail: 'eating',
    status: 'todo'
  },
  {
    id: 8662,
    task: 'to do 2',
    date: '2021-11-11',
    detail: 'reading',
    status: 'doing'
  },
  {
    id: 5821562,
    task: 'to do 3',
    date: '2021-11-12',
    detail: 'learning',
    status: 'done'
  }
]

function App() {
  const [id, setId] = useState(0)
  const [actLog, setActLog] = useState([])
  const [list, setList] = useState(TODO_LIST)
  const [logId, setLogId] = useState(1)
  useEffect(() => {
    const listLS = JSON.parse(localStorage.getItem('list')) || []
    setList(listLS.length ? listLS : TODO_LIST)
    return () => {
      localStorage.setItem('list', JSON.stringify(list))
    }
  }, [])

  const handleClearLog = () => {
    setActLog([])
    localStorage.setItem('log', '[]')
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Feeds
                {...{
                  list,
                  setList,
                  actLog,
                  setActLog,
                  logId,
                  setLogId,
                  id,
                  setId
                }}
              />
            )}
          />
          <Route path="/history">
            <History onClearLog={handleClearLog} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
