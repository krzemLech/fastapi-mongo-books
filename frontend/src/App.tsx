import { Header, BooksTable } from "./components";
import { ThemeProvider } from "./context/themeContext";
import { NotificationProvider } from "./context/notificationContext";
import { NotificationContainer } from "./components/NotificationContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { modals } from "./config";
import { LoginModal } from "./components/modals/LoginModal";
import { AddBookModal } from "./components/modals/AddBookModal";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes, useSearchParams } from "react-router";
import { UpdateBookModal } from "./components/modals/UpdateBookModal";
import { RatingModal } from "./components/modals/RatingModal";
import { UsersTable } from "./components/tables/UsersTable";
import { AddUserModal } from "./components/modals/AddUserModal";
import { NotFound } from "./components/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RegisterModal } from "./components/modals/RegisterModal";

const queryClient = new QueryClient();

function AppContent() {
  const [searchParams] = useSearchParams();
  const modal = searchParams.get("modal");
  const bookId = searchParams.get("id");

  const openLoginModal = modal === modals.login;
  const openAddBookModal = modal === modals.addBook;
  const openUpdateBookModal = modal === modals.editBook;
  const openRatingModal = modal === modals.rating;

  console.log(openAddBookModal);

  return (
    <div className="App h-screen">
      <Header />
      <NotificationContainer />
      <main className="container mx-auto pt-28 max-w-7xl px-8 pb-8">
        <Routes>
          <Route path="/" element={<BooksTable />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute requireAdmin={true}>
                <UsersTable />
              </ProtectedRoute>
            }
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <LoginModal open={openLoginModal} />
      <AddBookModal open={openAddBookModal} />
      <UpdateBookModal open={openUpdateBookModal} bookId={bookId} />
      <RatingModal isOpen={openRatingModal} />
      <AddUserModal open={modal === modals.addUser} />
      <RegisterModal open={modal === modals.register} />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
