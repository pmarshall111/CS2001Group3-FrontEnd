import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PharmacyPage from "./pharmacy/PharmacyPage";
import EmailPreview from "./email/EmailPreview";
import EmailPage from "./email/EmailPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EmailPage></EmailPage>
      </header>
    </div>
  );
}

export default App;
