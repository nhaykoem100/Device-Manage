import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouterURL from "./routes/RouterURL";
import DevicesListUser from "./containers/DevicesListUser";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <div>
      {/* <DevicesListUser /> */}
      <RouterURL />
      {/* <LoginPage /> */}
      {/* <MainLayout /> */}
    </div>
  );
}

export default App;
