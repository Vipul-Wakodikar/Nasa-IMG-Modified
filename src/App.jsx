import HomePage from "./Components/Homepage"
import { useSelector } from "react-redux";
import SearchedPage from "./Components/SearchedPage";

function App() {
  const searchValue = useSelector((state) => state.data.value);
  return (
    <>
      {searchValue === "" ? (<HomePage />) : (<SearchedPage />)} 
      
    </>
  )
}

export default App
