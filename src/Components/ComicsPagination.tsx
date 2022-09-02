import { Pagination } from "@mui/material";

interface IPaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const ComicsPagination = ({
  count,
  page,
  onChange,
}: IPaginationProps) => {
  return (
    <Pagination
      className="comic__pagination"
      count={count}
      page={page}
      onChange={onChange}
    />
  );
};
