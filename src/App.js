import React from "react";

// import "@gooddata/react-components/styles/css/main.css";
import "@gooddata/sdk-ui-charts/styles/css/main.css";
import "@gooddata/sdk-ui-ext/styles/css/insightView.css";
import { AuthProvider } from "./contexts/Auth";
import AppRouter from "./routes/AppRouter";
import { ProjectListProvider } from "./contexts/ProjectList";

function App() {
    return (
        <AuthProvider>
            <ProjectListProvider>
                <AppRouter />
            </ProjectListProvider>
        </AuthProvider>
    );
}

export default App;
