import Contacts from "./components/Contacts";
import Header from "./components/Header";
import ContactProvider from "./context/ContactProvider";

function App() {
  return (
    <ContactProvider>
      <Header />
      <Contacts />
    </ContactProvider>
  );
}

export default App;
