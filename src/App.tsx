import { Navigate, Route, Routes } from "react-router-dom";
import { AppAudioProvider } from "./audio/AppAudioProvider";
import { ContinueScreen } from "./screens/ContinueScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { NewGameScreen } from "./screens/NewGameScreen";
import { OptionsScreen } from "./screens/OptionsScreen";

function App() {
  return (
    <AppAudioProvider>
      <Routes>
        <Route element={<HomeScreen />} path="/" />
        <Route element={<NewGameScreen />} path="/run/new" />
        <Route element={<ContinueScreen />} path="/run/continue" />
        <Route element={<OptionsScreen />} path="/options" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </AppAudioProvider>
  );
}

export default App;
