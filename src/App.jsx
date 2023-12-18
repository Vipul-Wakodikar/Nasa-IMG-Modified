import HomePage from "./Components/Homepage";
import { useSelector } from "react-redux";
import SearchedPage from "./Components/SearchedPage";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Components/NotFound";
import Header from "./Components/Header";
import Test from "./Components/Test";

function App() {
  const searchValue = useSelector((state) => state.data.value);
  return (
    <>
    <Header />
      <Routes>
        {searchValue === "" && <Route path="/" element={<HomePage />} />}
        <Route path="/" exact element={<SearchedPage />} />
        {/* <Route
          path="/"
          exact
          element={searchValue === "" ? <HomePage /> : <SearchedPage />}
        /> */}
        <Route path="test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
