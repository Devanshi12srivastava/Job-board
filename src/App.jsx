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
import Protectedroute from './components/Protectedroute';
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
        element:(
          <Protectedroute>
              <Onboarding/>
          </Protectedroute>
      
        )
      },
      {
        path:'/job',
        element:(
          <Protectedroute> <Joblistening/></Protectedroute>
        )
      },
      {
        path:'/job/:id',
        element:(
          <Protectedroute> <JobPage/></Protectedroute>
      
        )
      },
     
      {
        path:'/postjob',
        element:( <Protectedroute> 
        <Postjob/>
         </Protectedroute> )
      },
       {
        path:'/savedjob',
        element:(
           <Protectedroute> 
        <Savedjob/>
         </Protectedroute>
        ) 
      } ,
  {
        path:'/myjob',
        element:( <Protectedroute> 
        <Myjob/>
         </Protectedroute> 
        )
      } ,
    ]
  }
]); 



function App() {
 return (
  <>


    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

        <RouterProvider router={router}/>
        {/* <profile/> */}
    </ThemeProvider>
 
 </>
 )
}





export default App
