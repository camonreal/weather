import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import Search from "./components/Search/Search";

function App() {
  return (
    <>
      <header></header>
      <main>
        <PrimeReactProvider>
          <Search />
        </PrimeReactProvider>
      </main>
    </>
  );
}

export default App;
