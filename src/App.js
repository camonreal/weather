import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import SearchCity from "./components/SearchCity";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <SearchCity />
      </PrimeReactProvider>
    </>
  );
}

export default App;
