import React, { useEffect, useState } from 'react';
import TextItem from './TextItem'
import './App.css';

import { Skeleton, Layout, Pagination, Input } from "antd";
import "antd/dist/antd.css";
const { Header, Content, Footer } = Layout;
// const DATA_SIZE_HALF = "half"
const DATA_SIZE_FULL = "full"
const INTERVAL_TIME = 2000
/** The total rows that will show on every pages*/
const DATA_DEFAULT_PAGES = 2
const { Search } = Input;
/** Application entry point */
function App() {
  const [data, setData] = useState([])
  const [value, setValue] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  /** currentPage is the current page of the paginations component */
  const [currentPage, setCurrentPage] = useState(1)
  /** toltalPages represent the complete rows from backend*/
  const [toltalPages, setToltalPages] = useState()

  /** DO NOT CHANGE THE FUNCTION BELOW */
  useEffect(() => {
    setInterval(() => {
      // Find random bucket of words to highlight
      setValue(Math.floor(Math.random() * 10))
    }, INTERVAL_TIME)
  }, [])
  /** DO NOT CHANGE THE FUNCTION ABOVE */

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("/api/dataIdList?datasize=" + DATA_SIZE_FULL)
      let list = await response.json()

      setToltalPages(list.length)
      let dataItems = await Promise.all(list.map(async id => {
        return (await fetch("/api/dataItem/" + id)).json()
      }))
      setData(dataItems)
    }
    fetchData()
  }, [])
  /** copyRow provide functionality to when the user type Enter after edit a word and it make a copy to push at the final of the array*/
  const copyRow = row => {
    // console.log(data[row.split("-")[1]])
    const to = currentPage * DATA_DEFAULT_PAGES;
    const from = to - DATA_DEFAULT_PAGES;
    const currentData = data.slice(from, to);

    let newData = [...data];
    newData.push(currentData[row.split("-")[1]]);
    setToltalPages(newData.length)
    setData(newData)



  }

  /** showParagraphs create paragraphs page by page depends of the DATA_DEFAULT_PAGES  */
  const showParagraphs = () => {
    const to = currentPage * DATA_DEFAULT_PAGES;
    const from = to - DATA_DEFAULT_PAGES;
    const currentData = data.slice(from, to);

    return currentData.map((row, i) => {
      return (<p key={`p${i}`}>
        {row.map((textitem, j) => {
          if (searchInput.length > 0 && textitem.text.search(searchInput) === -1) {
            return null;
          }
          let numRow = `row-${i}-${j}`;
          return (
            <>
              <TextItem key={`${i}${j}`} value={value} data={textitem} numRow={numRow} copyRow={copyRow} />
            </>)
        })}
      </p>)
    })
  }
  /** I added validations when the value on the input search is empty   */  
  const handleChange = e => {
    if (e.target) {
      setSearchInput(e.target.value)
    } else {
      setSearchInput(searchInput)
    }
  }

  const onChangePage = e => {
    // console.log(e)
    setCurrentPage(e)
  }

  return (
    <div className="App">
      <Layout>
        <Header>
          <div className="logo">
            <img src="assets/jt-logo-purple.png" alt="logo-jt" />
          </div>
          <h2 className="titleJt">JT Online Book</h2>
        </Header>
        <Content style={{ padding: '50px 50px' }}>
          <div className="site-layout-content">
            {data.length === 0 ?
              <div>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </div>
              :
              <div>
                <Search placeholder="Search text" onSearch={handleChange} onChange={handleChange} value={searchInput}
                  className="searchInput" />
                {
                  showParagraphs()
                }

              </div>
            }
          </div>
          <div className="pagination">
            <Pagination total={toltalPages} current={currentPage} onChange={onChangePage} defaultPageSize={DATA_DEFAULT_PAGES} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}> Justice Text Assesment by Carlomagno Lopez Campos</Footer>
      </Layout>
    </div>
  );
}

export default App;
