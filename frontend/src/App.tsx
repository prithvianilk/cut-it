import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { Routes1 } from "./Routes";
import theme from "./themes";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Routes1 />
        </ChakraProvider>
    );
}

export default App;
