import HomePage from "./Components/HomePage";
import { useSelector } from "react-redux";
import SearchedPage from "./Components/SearchedPage";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Components/NotFound";
import Header from "./Components/Header";
import Test from "./Components/MasonryLayout";
import Test2 from "./Components/Test2";

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
        <Route path="test2" element={<Test2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
