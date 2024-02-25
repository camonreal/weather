import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import SearchCity from "./components/SearchCity/SearchCity";

function App() {
  return (
    <>
    <header></header>
    <main>
      <PrimeReactProvider>
        <SearchCity />
      </PrimeReactProvider>
    </main>
    </>
  );
}

export default App;
