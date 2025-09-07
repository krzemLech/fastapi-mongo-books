import { Header, UsersTable } from "./components/ui";
import { ThemeProvider } from "./context/themeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App h-screen">
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="container mx-auto pt-28">
            <UsersTable />
          </main>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
