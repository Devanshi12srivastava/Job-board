import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import './App.css'
import Applayout from './components/layout/applayout';
import Landing from './pages/Landing';
import Onboarding from './pages/onboarding';
import Joblistening from './pages/joblistening';
import JobPage from './pages/job';
import Savedjob from './pages/savedjob';
import Postjob from './pages/postjob';
import Myjob from './pages/myjob';
import { ThemeProvider } from './components/ui/theme';

const router=createBrowserRouter([
  {
    element:<Applayout/>,
    children:[
      {
        path:'/',
        element:<Landing/>
      },
      {
        path:'/onboarding',
        element:<Onboarding/>
      },
      {
        path:'/jobs',
        element:<Joblistening/>
      },
      {
        path:'/job/:id',
        element:<JobPage/>
      },
     
      {
        path:'/postjob',
        element:<Postjob/>
      },
       {
        path:'/savedjob',
        element:<Savedjob/>
      } ,
  {
        path:'/myjob',
        element:<Myjob/>
      } ,
    ]
  }
]); 



function App() {
 return (
  <>


    {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}

        <RouterProvider router={router}/>
        {/* <profile/> */}
    {/* </ThemeProvider> */}
 
 </>
 )
}





export default App
