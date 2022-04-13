import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { Routes } from "./Routes";
import theme from "./themes";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Routes />
        </ChakraProvider>
    );
}

export default App;
