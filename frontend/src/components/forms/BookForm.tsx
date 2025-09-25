import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { Book } from "@/types";

type BookFormProps = {
  btnText: string;
  localId: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  data?: Book;
};

export const BookForm = ({
  btnText,
  localId,
  onSubmit,
  data,
}: BookFormProps) => {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="space-y-4">
        <div className="*:not-first:mt-2">
          <Input
            id={`${localId}-title`}
            label="Title"
            placeholder="Enter book title"
            type="text"
            name="title"
            required
            defaultValue={data?.title}
          />
        </div>
        <div className="*:not-first:mt-2">
          <Input
            id={`${localId}-author`}
            label="Author"
            placeholder="Enter book author"
            type="text"
            name="author"
            required
            defaultValue={data?.author}
          />
        </div>
      </div>
      <div className="*:not-first:mt-2">
        <Input
          id={`${localId}-description`}
          label="Description"
          placeholder="Enter book description"
          type="text"
          name="description"
          required
          defaultValue={data?.description}
        />
      </div>
      <div className="*:not-first:mt-2">
        <Input
          id={`${localId}-pages`}
          label="Pages"
          placeholder="Enter book pages"
          type="number"
          name="pages"
          required
          min={1}
          defaultValue={data?.pages}
        />
      </div>
      <Button
        type="submit"
        className="w-full cursor-pointer hover:bg-rose-500/90 bg-rose-500"
      >
        {btnText}
      </Button>
    </form>
  );
};
