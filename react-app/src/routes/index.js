import {RouterProvider, createBrowserRouter} from "react-router-dom"
import {ProtectedRoute} from "./ProtectedRoute"
import Login from "./Login"
import Todo from "./Todo"
import Dashboard from "./Dashboard"

const Routes = () => {
  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "",
          element: <Todo />
        },
        {
          path: "/dashboard",
          element: <Dashboard />
        },
      ]
    }
  ]

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />
    }
  ]

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    // ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly
  ])

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />
}

export default Routes
