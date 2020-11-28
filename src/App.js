import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PharmacyPage from "./pharmacy/PharmacyPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PharmacyPage />
      </header>
    </div>
  );
}

export default App;
