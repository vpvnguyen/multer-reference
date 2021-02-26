import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const handleGetDisclaimer = async (event) => {
    event.preventDefault();
    try {
      const disclaimer = ["text1", "text2"];
      const response = await axios.get("http://localhost:1234/pdf");
      console.log(response);
      const disclaimerFile = new File([response.data], "disclaimerFile.pdf", {
        type: "application/pdf",
        lastModified: Date.now(),
      });
      console.log(disclaimerFile);
      const responseStored = await axios.post("http://localhost:1234/store", {
        disclaimerFile: disclaimerFile,
      });
      console.log(responseStored.data);
    } catch (error) {
      console.error("handleGetDisclaimer Error: ", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleGetDisclaimer}>Get Disclaimer</button>
      </header>
    </div>
  );
}

export default App;
