import './App.css';
import react from "react"
import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';


function App() {
  
  return (
    <div className="App">
      <NavigationBar />
      <Welcome/>
      <Footer/>
     
    </div>
  );
}

export default App;
