import ListItem from './ListItem'

function Container({
  list,
  setList,
  actLog,
  setActLog,
  logId,
  setLogId,
  ...props
}) {
  return (
    <div>
      {list
        .filter((item) => props.status === item.status)
        .map((item, index) => (
          <ListItem
            {...{
              list,
              index,
              item,
              setList,
              actLog,
              setActLog,
              logId,
              setLogId,
              key: index
            }}
          />
        ))}
    </div>
  )
}

export default Container
