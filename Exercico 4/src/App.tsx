import reactLogo from './assets/react.svg'
import Contador from './components/Contador'
import './styles/App.css'

function App() {
  return (
    <>      
      <a href="/" target="_blank">
        <img src={reactLogo} className="logo" alt="React logo" />
      </a>
      <Contador />
    </>
  )
}

export default App
