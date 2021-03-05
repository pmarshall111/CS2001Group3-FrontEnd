// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Residentprofile from './profile/Residentprofile';
import ResidentsList from './profile/ResidentsList';
import TodoList from './DailyTask/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList />
      </header>
    </div>
  );
}

export default App;
