import { useUser } from './UserContext';
import HomeComponent from './components/HomeComponent/HomeComponent';
import LoginForm from './components/LoginForm/LoginForm';
  
// Shows LoginForm when user is not signed in. Shows HomeComponent when user is signed in.
const Home = () => {
  const { user }= useUser()

  return (
    <div className="home-container">
      {user === null ? <LoginForm /> : <HomeComponent />}
    </div>
  )
}

export default Home;