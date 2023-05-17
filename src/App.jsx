import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./Components/Login"
import {  AuthContextProvider} from "./Context/AuthContext"


import "./global.css"
import { Application } from "./Components/Application"
import { RoutePrivate } from "./Routes/RoutePrivate"
import { UserApplication } from "./Components/UserSide/UserApplication/UserApplication"

function App() {

  
  return (
    
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>

          <Route exact path="/" element={<Login />} />
          {/* <Route path="/tabela" element={<Application/>} /> */}


          <Route   

            path="/tabela-adm"
            element={
                
              <RoutePrivate>
                <Application/>
              </RoutePrivate>
              
            }
          />
          <Route   

            path="/tabela-usuario"
            element={
                
              <RoutePrivate>
                <UserApplication/>
              </RoutePrivate>
              
            }
          />
          
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
    
    )
  }
  
  export default App
  
  {/* <RoutePrivate path="/tabela" element={<Application/>}/> */}
  {/* <Route path={`/tabela${user.name}`} element={<Table/>}/> */}
    // interface TypeProcess {
    //   idprocessos: number;
    //   numero: string;
    //   instancia: string;
    //   sistema: string;
    //   status: string;
    //   [key: string]: any;
    // }
  
  
    // useEffect(() => {
    //   Axios.get("http://localhost:3001/request")
    //   .then((res) => {
    //       setProcess(res.data)
    //       console.log(res.data)
    //   })
    // }, [])
  
    // interface ComponentChilld {
    //   ProcessContext: React.ReactNode;
    // }