export const extractBookFormData = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const description = formData.get("description") as string;
  const pages = formData.get("pages") as string;
  return { title, author, description, pages: parseInt(pages) };
};
