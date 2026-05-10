import { useState } from 'react'
import "./App.css"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './components/Home/Home'
import { About } from './components/About/About'
import { Signup } from './components/Sign_up/Signup'
import SignIn from './components/Sign_in/SignIn'
import { VerificationWindow } from './components/Verification_Window/Verification_Window'
import { ResendVerificationWindow } from './components/ResendVerification/ResendVerification'
import { SignupStyled } from './components/Sign_up/SignUpStyled'
import { SigninStyled } from './components/Sign_in/SignInStyled'
import { Profile } from './components/Profile/Profile'
import { store } from './store/appStore';
import { Provider } from 'react-redux';

import { ProjectsDashboard } from './components/Projects/ProjectsDashboard'
import { ProjectDetails } from './components/Projects/ProjectDetails'
import { TasksComponent } from './components/Tasks/TasksComponent'
import { NotesComponent } from './components/Notes/NotesComponent'
import { MembersComponent } from './components/Members/MembersComponent'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="signup" element={<SignupStyled/>}/>
      <Route path="signin" element={<SigninStyled/>}/>
      <Route path="verification-window" element={<VerificationWindow/>}/>
      <Route path="resend-verification-window" element={<ResendVerificationWindow/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="projects" element={<ProjectsDashboard />} />
      <Route path="projects/:projectId" element={<ProjectDetails />}>
        <Route index element={<TasksComponent />} />
        <Route path="tasks" element={<TasksComponent />} />
        <Route path="notes" element={<NotesComponent />} />
        <Route path="members" element={<MembersComponent />} />
      </Route>
    </Route>
  )
)
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
    
  )
}

export default App
