import Layout from "./layouts/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <>HomePage</>
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <>SearchPage</>
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
