import { Header, BooksTable } from "./components";
import { ThemeProvider } from "./context/themeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { modals } from "./config";
import { LoginModal } from "./components/modals/LoginModal";
import { AddBookModal } from "./components/modals/AddBookModal";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes, useSearchParams } from "react-router";
import { UpdateBookModal } from "./components/modals/UpdateBookModal";

const queryClient = new QueryClient();

function App() {
  const [searchParams] = useSearchParams();
  const modal = searchParams.get("modal");
  const bookId = searchParams.get("id");

  const openLoginModal = modal === modals.login;
  const openAddBookModal = modal === modals.addBook;
  const openUpdateBookModal = modal === modals.editBook;

  return (
    <div className="App h-screen">
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="container mx-auto pt-28 max-w-7xl px-8">
            <Routes>
              <Route path="/" element={<BooksTable />} />
            </Routes>
          </main>
          <LoginModal open={openLoginModal} />
          <AddBookModal open={openAddBookModal} />
          <UpdateBookModal open={openUpdateBookModal} bookId={bookId} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
