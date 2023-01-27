import './Table.css'

const Table = ({ list, colNames, width = "auto", height = "auto" }) => {
  return (
    <div>
      {list.length > 0 && (
        <div className='table-box'>
          <table cellSpacing="10" className='table' style={{ width: width, height: height }}>
            <thead>
              <tr>
                {colNames.map((item, index) => (
                  <th key={index}>{item.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(list).map((obj, index) => (
                <tr key={index}>
                  {Object.values(obj).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Table;