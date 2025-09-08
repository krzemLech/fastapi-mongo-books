import { Header, UsersTable } from "./components/ui";
import { ThemeProvider } from "./context/themeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { modals, type modalType } from "./config";
import { LoginModal } from "./components/modals/LoginModal";
import { AddBookModal } from "./components/modals/AddBookModal";

const queryClient = new QueryClient();

function App() {
  const [modalOpen, setModalOpen] = useState<modalType | null>(null);

  const handleModalOpen = (modal: modalType | null) => {
    setModalOpen(modal);
  };

  return (
    <div className="App h-screen">
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {modalOpen === modals.login && (
            <LoginModal
              open={modalOpen === modals.login}
              toggleModal={handleModalOpen}
            />
          )}
          {modalOpen === modals.addBook && (
            <AddBookModal
              open={modalOpen === modals.addBook}
              toggleModal={handleModalOpen}
            />
          )}
          <Header setModalOpen={handleModalOpen} />
          <main className="container mx-auto pt-28 max-w-7xl px-8">
            <UsersTable />
          </main>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
