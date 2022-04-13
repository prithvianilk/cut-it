import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import AppRoutes from "./Routes";
import theme from "./themes";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <AppRoutes />
        </ChakraProvider>
    );
}

export default App;
