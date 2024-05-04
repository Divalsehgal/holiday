import { lazy, Suspense } from "react";
import Layout from "./layouts/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
const Register = lazy(() => import("./pages/register"));
const Signin = lazy(() => import("./pages/signin"));
const AddHotel = lazy(() => import("./pages/hotel"));

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<Layout>HomePage</Layout>} />
      <Route path="/search" element={<Layout>SearchPage</Layout>} />
      <Route
        path="/register"
        element={
          <Suspense fallback={<>Loading...</>}>
            <Layout>
              <Register />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Suspense fallback={<>Loading...</>}>
            <Layout>
              <Signin />
            </Layout>
          </Suspense>
        }
      />
      {isLoggedIn && (
        <Route
          path="/add-hotel"
          element={
            <Suspense fallback={<>Loading...</>}>
              <Layout>
                <AddHotel />
              </Layout>
            </Suspense>
          }
        />
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
