import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  total: number;
  page: number;
  size: number;
  onPageChange: (page: number) => void;
};

export function BasicPagination({
  total,
  page,
  size,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / size);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={page === 1} />
        </PaginationItem>
        {pages.map((pageNumber) => {
          const isActive = pageNumber === page;
          const minShow = Math.max(1, page - 2);
          const maxShow = Math.min(totalPages, page + 2);

          if (pageNumber !== 1 && pageNumber !== totalPages) {
            if (pageNumber < minShow || pageNumber > maxShow) {
              if (
                (pageNumber === minShow - 1 && minShow > 2) ||
                (pageNumber === maxShow + 1 && maxShow < totalPages - 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            }
          }
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={isActive}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext disabled={page === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
