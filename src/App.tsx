import { useEffect } from "react";
import { RouterComponent } from "./components/router/Router"

function App() {
  const checkDB = async () => {
    const db = await (window).api.dbGet();
    console.log(db.items);

    await (window).api.dbAdd({ title: "test", value: 123 });
  }


  useEffect(() => {
    checkDB();
  }, [])

  return (
    <>
      <RouterComponent />
    </>
  )
}

export default App
